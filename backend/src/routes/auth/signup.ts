import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { supabaseAdmin } from '../../services/supabaseClient';

const router = express.Router();

// 1) pull out your validators into an array
const signupValidators = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password too short'),
  body('profile.firstName').notEmpty().withMessage('First name required'),
  body('profile.lastName').notEmpty().withMessage('Last name required'),
  body('profile.phone').optional().isMobilePhone('any').withMessage('Invalid phone'),
  body('profile.company').optional().isString(),
  body('profile.role').optional().isString(),
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

    const { email, password, profile } = req.body;

    try {
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

      // No auto-login: directly return created user
      res.status(201).json({
        user: {
            id: createdUser.user.id,
            email: createdUser.user.email,
            user_metadata: createdUser.user.user_metadata
        }
        });
    } catch (err: any) {
      console.error('Unhandled signup error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
