import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { supabaseAdmin } from '../../services/supabaseClient';
import { z } from 'zod';
import { askLLAMA } from '../../services/llamaClient';
import { checkUsageLimit } from '../../utils/usageLimiter';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const router = express.Router();

const PromptSchema = z.object({
  userId: z.string(),
  prompt: z.string().min(5),
});

type AskFilters = {
  location?: string;
  budget?: number;
  purpose?: string;
  preferences?: string[];
  zip?: string;
  squareFootage?: number;
  yearBuilt?: number;
  min_area?: number;
  min_year_built?: number;
  max_area?: number;
  max_year_built?: number;
};

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const startTime = Date.now();
    const parse = PromptSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: 'Invalid input' });
      return;
    }

    const { userId, prompt } = parse.data;
    const referenceId = uuidv4();
    console.log('ASK prompt:', prompt);

    // Step 0: Enforce quota
    const { allowed, message } = await checkUsageLimit(userId, 'ask_count');
    if (!allowed) {
      res.status(403).json({ error: message });
      return;
    }

    // Step 1: Call LLaMA to extract filters
    const llamaResponse = await askLLAMA(prompt);

    let filters: AskFilters;
    try {
      filters = llamaResponse.filters;
    } catch (err) {
      console.warn('Invalid JSON from LLaMA:', llamaResponse);
      res.status(422).json({ error: 'Could not understand your question. Try rephrasing.' });
      return;
    }

    // Step 2: If not a property query
    if (llamaResponse.is_property_query === false) {
      res.status(200).json({ message: 'General question detected. No property search needed.' });
      return;
    }

    console.log('Parsed Filters from LLaMA:', filters);

    // Step 3: Build dynamic Supabase query
    const {
      location, budget, purpose, preferences, zip,
      squareFootage, yearBuilt, min_area, min_year_built,
      max_area, max_year_built,
    } = filters;

    let query = supabaseAdmin.from('enriched_properties').select('*').limit(100);

    if (budget) query = query.lte('askingPrice', budget);
    if (min_area) query = query.gte('squareFootage', min_area);
    if (max_area) query = query.lte('squareFootage', max_area);
    if (!min_area && squareFootage) query = query.lte('squareFootage', squareFootage);

    if (min_year_built) query = query.gte('yearBuilt', min_year_built);
    if (max_year_built) query = query.lte('yearBuilt', max_year_built);
    if (!min_year_built && yearBuilt) query = query.gte('yearBuilt', yearBuilt);
    if (location) query = query.ilike('address', `%${location}%`);
    if (zip) query = query.eq('zip', zip);

    if (preferences?.includes('walkability')) query = query.gte('walkScore', 50);
    if (preferences?.includes('transit')) query = query.gte('transitScore', 40);
    if (preferences?.includes('bike')) query = query.gte('bikeScore', 40);

    const { data, error } = await query;

    if (error || !data) {
      console.error('Supabase error:', error);
      res.status(500).json({ error: 'Failed to fetch properties' });
      return;
    }

    // Step 4: Scoring
    const filtered = data.filter(p => !!p.address);
    const scored = filtered
      .map((p) => {
        const score = (p.roi ?? 0) * 0.5 + (p.market ?? 0) * 0.3 + (p.growth ?? 0) * 0.2;
        return { ...p, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Step 5: Track usage if scored results exist
    if (scored.length > 0) {
      try {
        const { data: userData, error: fetchErr } = await supabaseAdmin
          .from('users')
          .select('ask_count')
          .eq('id', userId)
          .single();

        if (fetchErr || !userData) {
          console.error('❌ Failed to fetch current ask_count:', fetchErr);
        } else {
          const current = userData.ask_count ?? 0;
          const newCount = current > 0 ? current - 1 : 0;

          const { error: updateErr } = await supabaseAdmin
            .from('users')
            .update({ ask_count: newCount })
            .eq('id', userId);

          if (updateErr) {
            console.warn('⚠️ Failed to decrement ask_count:', updateErr);
          } else {
            console.log(`✅ ask_count updated: ${current} → ${newCount}`);
          }
        }
      } catch (innerErr) {
        console.error('⚠️ Failed to update ask_count:', innerErr);
      }
    }

    // Step 6: Save query to database
    const processingTime = Date.now() - startTime;
    const { data: savedQuery, error: saveError } = await supabaseAdmin
      .from('ai_queries')
      .insert({
        user_id: userId,
        query: prompt,
        filters,
        result_count: scored.length,
        confidence: scored[0]?.score ?? 0.85,
        processing_time: processingTime,
        status: 'completed',
        created_at: new Date().toISOString(),
        reference_id: referenceId,
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving query:', saveError);
    }

    // Step 7: Insert into user_interactions table
    try {
      console.log("📌 Logging interaction for user:", userId);

      const { error: interactionError } = await supabaseAdmin
        .from('user_interactions')
        .insert([
          {
            user_id: userId,
            query_reference_id: referenceId,
            created_at: new Date().toISOString(),
          },
        ]);

      if (interactionError) {
        console.warn('⚠️ Failed to log user interaction:', interactionError);
      } else {
        console.log(`✅ Logged interaction for user: ${userId}`);
      }
    } catch (err) {
      console.error('❌ Error logging interaction:', err);
    }

    // Step 8: Final response
    res.json({
      success: true,
      query: prompt,
      filters,
      results: scored,
      confidence: scored[0]?.score ?? 0.85,
      processingTime,
      queryId: savedQuery?.id,
      referenceId,
    });
  } catch (err) {
    console.error('ASK route error:', err);
    next(err);
  }
});

export default router;
