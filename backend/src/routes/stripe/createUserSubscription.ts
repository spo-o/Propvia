// src/routes/stripe/createUserSubscription.ts
import express, { Request, Response, NextFunction } from 'express';
import { stripe } from '../../services/stripeClient';

const router = express.Router();

const priceMap: Record<string, string> = {
  free: '', // no priceId for free plan
  starter: process.env.PRICE_BASIC!,
  pro: process.env.PRICE_BASIC!,
  visionary: process.env.PRICE_BASIC!,
};

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { plan, email } = req.body;

  if (!plan || !email) {
    res.status(400).json({ error: 'Missing plan or email' });
    return;
  }

  if (!priceMap[plan]) {
    res.status(400).json({ error: 'Invalid or unsupported plan' });
    return;
  }

  // For Free tier, no Stripe session is needed
  if (plan === 'free') {
    res.status(200).json({ message: 'Free plan selected. No payment required.' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceMap[plan],
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: {
        plan,
        email,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});

export default router;
