import express, { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { supabaseAdmin } from '../../services/supabaseClient';
import { sendConfirmationEmail } from '../../utils/emailSender';
import { generatePdf } from '../../utils/pdfGenerator';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

router.post(
  '/',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sig = req.headers['stripe-signature'];
    const REPORT_BUCKET = 'custom-requests-reports';

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

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // ⚡️ Custom Request Flow
      const propertyRequestId = session.metadata?.propertyRequestId;
      if (propertyRequestId) {
        console.log(' Payment confirmed for propertyRequestId:', propertyRequestId);

        try {
          const { data, error: fetchError } = await supabaseAdmin
            .from('custom_property_requests')
            .select('*')
            .eq('id', propertyRequestId)
            .single();

          if (fetchError) {
            console.error(' Failed to fetch request:', fetchError);
            res.json({ received: true });
            return;
          }

          if (data.payment_status === 'paid') {
            console.log('⚠️ Already marked as paid. Skipping.');
            res.json({ received: true });
            return;
          }

          const { error: updateError } = await supabaseAdmin
            .from('custom_property_requests')
            .update({
              payment_status: 'paid',
              paid_at: new Date().toISOString(),
            })
            .eq('id', propertyRequestId);

          if (updateError) {
            console.error(' Failed to update payment_status:', updateError);
          } else {
            console.log(' Updated payment_status to paid.');
          }

          try {
            await sendConfirmationEmail(data.email, data);
            console.log(' Confirmation email sent!');
          } catch (emailErr) {
            console.error(' Failed to send email:', emailErr);
          }

          console.log(' Generating PDF for storage...');
          const pdfBuffer = await generatePdf(data);

          const pdfFileName = `${propertyRequestId}.pdf`;
          const { error: uploadError } = await supabaseAdmin.storage
            .from(REPORT_BUCKET)
            .upload(pdfFileName, pdfBuffer, {
              contentType: 'application/pdf',
              upsert: true,
            });

          if (uploadError) {
            console.error(' Failed to upload PDF to Storage:', uploadError);
          } else {
            console.log(' PDF uploaded to Storage.');
          }

          const { data: publicUrlData } = supabaseAdmin.storage
            .from(REPORT_BUCKET)
            .getPublicUrl(pdfFileName);

          const publicUrl = publicUrlData?.publicUrl;
          console.log(' PDF public URL:', publicUrl);

          if (publicUrl) {
            const { error: insertError } = await supabaseAdmin
              .from('custom_request_reports')
              .insert([
                {
                  property_request_id: propertyRequestId,
                  report_url: publicUrl,
                  created_at: new Date().toISOString(),
                },
              ]);

            if (insertError) {
              console.error(' Failed to save report record:', insertError);
            } else {
              console.log(' Saved report record to custom_request_reports table.');
            }
          }
        } catch (err) {
          console.error(' Unexpected error in webhook handler:', err);
        }
      }

      // ⚡️ Subscription Plan Flow
      if (session.mode === 'subscription' && session.metadata?.plan && session.metadata?.email) {
        const userEmail = session.metadata.email;
        const selectedPlan = session.metadata.plan;

        console.log(`📦 Subscription: ${selectedPlan} confirmed for ${userEmail}`);

        const { error } = await supabaseAdmin
          .from('users')
          .update({
            plan: selectedPlan,
            subscription_active: true,
            stripe_subscription_id: session.subscription,
          })
          .eq('email', userEmail);

        if (error) {
          console.error(' Failed to activate subscription:', error.message);
        } else {
          console.log(' Subscription activated in users table.');
        }
      }
    }

    res.json({ received: true });
  }
);

export default router;
