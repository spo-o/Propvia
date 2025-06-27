// backend/src/routes/ai/ask.ts
import { Router, Request, Response } from 'express';
import { authMiddleware, AuthenticatedRequest } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    res.status(400).json({ error: 'Query is required and must be a string.' });
    return;
  }

  // Simulated AI response
  const simulatedResponse = `Based on your query "${query}", here are our recommendations:

1. Detroit Midtown District
   - High foot traffic area with 15,000+ daily pedestrians
   - Recent development projects totaling $2.1B in investment
   - Walk score: 92, Transit score: 85
   - Demographics: 65% young professionals, median income $68,000
   - Upcoming events: Annual Arts Festival (50,000+ attendees)

2. Corktown Neighborhood
   - Historic district with growing food scene
   - 28% increase in business licenses issued last year
   - Major tech company moving in (1,000+ employees)
   - Demographics: Mixed residential/commercial, family-friendly
   - Development: $500M mixed-use project breaking ground

3. Eastern Market District
   - 45,000+ weekly visitors during market days
   - Food-centric business cluster
   - Recent infrastructure improvements
   - Strong community engagement
   - Business incentives available for food-related ventures

These locations align with current market trends and show strong potential for growth based on demographic shifts, development patterns, and economic indicators.`;

  res.status(200).json({ response: simulatedResponse });
});

export default router;
