import express, { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { supabaseAdmin } from '../../services/supabaseClient';
import { sendConfirmationEmail } from '../../utils/emailSender';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

/**
 * Stripe webhook endpoint
 * This must use express.raw middleware to validate signature
 */
router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error('⚠️ Stripe webhook signature verification failed.', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log(' Stripe webhook received event:', event.type);
    console.log('ENV WEBHOOK SECRET:', process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // 1️ Extract propertyRequestId
      const propertyRequestId = session.metadata?.propertyRequestId;
      console.log(' Payment confirmed for propertyRequestId:', propertyRequestId);

      if (!propertyRequestId) {
        console.warn('⚠️ No propertyRequestId found in session metadata. Skipping.');
        res.json({ received: true });
        return;
      }

      try {
        // 2️ Fetch record from Supabase
        const { data, error: fetchError } = await supabaseAdmin
          .from('custom_property_requests')
          .select('*')
          .eq('id', propertyRequestId)
          .single();

        if (fetchError) {
          console.error(' Failed to fetch custom_property_request from Supabase:', fetchError);
          res.json({ received: true });
          return;
        }

        console.log(' Fetched property request:', data);

        // 3️ Check if already paid
        if (data.payment_status === 'paid') {
          console.log('⚠️ Already marked as paid. Skipping email.');
          res.json({ received: true });
          return;
        }

        // 4️ Update payment_status to 'paid'
        const { error: updateError } = await supabaseAdmin
          .from('custom_property_requests')
          .update({
            payment_status: 'paid',
            paid_at: new Date().toISOString()
          })
          .eq('id', propertyRequestId);

        if (updateError) {
          console.error(' Failed to update payment_status in Supabase:', updateError);
        } else {
          console.log(' Updated payment_status to paid.');
        }

        // 5️ Send confirmation email
        try {
          await sendConfirmationEmail(data.email, data);
          console.log('Confirmation email sent!');
        } catch (emailErr) {
          console.error(' Failed to send confirmation email:', emailErr);
        }
      } catch (err) {
        console.error(' Unexpected error in webhook handler:', err);
      }
    }

    // Always respond 200 to Stripe
    res.json({ received: true });
  }
);

export default router;
