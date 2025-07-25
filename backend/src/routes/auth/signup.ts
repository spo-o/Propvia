import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { supabaseAdmin } from '../../services/supabaseClient';
import { stripe } from '../../services/stripeClient';
const router = express.Router();

//  Step 1: Validators
const signupValidators = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password too short'),
  body('profile.firstName').notEmpty().withMessage('First name required'),
  body('profile.lastName').notEmpty().withMessage('Last name required'),
  body('profile.phone').optional().isMobilePhone('any').withMessage('Invalid phone'),
  body('profile.company').optional().isString(),
  body('profile.role').optional().isString(),
  body('plan')
    .isIn(['free', 'starter', 'pro', 'visionary'])
    .withMessage('Invalid subscription plan'),
];

router.post(
  '/',
  ...signupValidators,
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, profile, plan } = req.body;

    try {
      //  Step 2: Create Supabase user
      const { data: createdUser, error: createErr } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          user_metadata: {
            full_name: `${profile.firstName} ${profile.lastName}`,
            phone: profile.phone,
            company: profile.company,
            role: profile.role,
          },
          email_confirm: true,
        });

      if (createErr) {
        console.error('Signup error:', createErr);
        res.status(400).json({ error: createErr.message });
        return;
      }

      //  Step 3: Insert into `users` table
      const insertRes = await supabaseAdmin.from('users').insert({
        id: createdUser.user.id,
        email: createdUser.user.email,
        first_name: profile.firstName,
        last_name: profile.lastName,
        plan,
       // usage: {},
      });

      if (insertRes.error) {
        console.error('Error inserting into users table:', insertRes.error);
        res.status(500).json({ error: 'Failed to store user details' });
        return;
      }
      // After inserting user, if plan is not free, create Stripe session
    if (plan !== 'free') {
      try {
        const priceMap: Record<string, string> = {
          starter: process.env.PRICE_BASIC!,
          pro: process.env.PRICE_BASIC!,
          visionary: process.env.PRICE_BASIC!,
        };

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'subscription',
          line_items: [{ price: priceMap[plan], quantity: 1 }],
          customer_email: createdUser.user.email,
          success_url: 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: 'http://localhost:5173/cancel',
          metadata: {
            userId: createdUser.user.id,
            plan,
          },
        });

        res.status(200).json({ url: session.url }); //  send Stripe URL back
        return;
      } catch (stripeErr: any) {
        console.error(' Failed to create Stripe session:', stripeErr);
        res.status(500).json({ error: 'Failed to create Stripe session' });
        return;
      }
    }


      res.status(201).json({
        user: {
          id: createdUser.user.id,
          email: createdUser.user.email,
          user_metadata: createdUser.user.user_metadata,
        },
      });
    } catch (err: any) {
      console.error('Unhandled signup error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
