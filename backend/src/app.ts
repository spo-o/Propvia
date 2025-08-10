import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

import signupRouter from './routes/auth/signup';
import loginRouter from './routes/auth/login';
import getAdminRoleRouter from './routes/auth/getAdminRole';
import subscribersRouter from './routes/subscribers/index';
import usersRouter from './routes/users/index';
import newslettersRouter from './routes/newsletters/index';
import blogsRouter from './routes/blogs/index';
import generateBlogRouter from './routes/blogs/generate';
import publishRoute from './routes/blogs/publish';
import deleteRoute from './routes/blogs/delete';
import updateRoute from './routes/blogs/update';
import aiAskRouter from './routes/ai/ask';
import inviteRoute from './routes/team/invite';
import acceptRoute from './routes/team/accept';
import removeRoute from './routes/team/remove';
import updateRoleRoute from './routes/team/updateRole';
import savePropertyRouter from './routes/property/saveProperty';
import stripeCheckoutRoute from './routes/stripe/createCheckoutSession';
import askAiRouter from './routes/ai/ask_ai';


import loopnetRoutes from './routes/property/loopnet';

import stripeWebhook from './routes/stripe/webhook';


import getStripeSessionDetailsRouter from './routes/stripe/getStripeSessionDetails'
import checkPaymentStatusRouter from './routes/stripe/checkPaymentStatus';
import getReportsByUserRoute from './routes/reports/getByUser';
import usageIncrementRouter from './routes/usage/increment';

import createSubscriptionSession from './routes/stripe/createUserSubscription';



import getUsageByUserRoute from './routes/usage/getUsageByUser';
import askAiRoute from './routes/ai/ask_ai';

import path from 'path';


dotenv.config();
const app = express();

app.use(cors());

//  Stripe webhook needs raw body
app.use('/api/stripe/webhook', stripeWebhook);

app.use((req, res, next) => {
  console.log("Request received for Render BE:", req.method, req.url);
  next();
});

// All other routes can use JSON body parser
app.use(express.json());

// Auth
app.use('/api/auth/signup', signupRouter);
app.use('/api/auth/login', loginRouter);

// AdminPortal APIs
app.use('/api/user/role', getAdminRoleRouter);
app.use('/api/subscribers', subscribersRouter);
app.use('/api/users', usersRouter);
app.use('/api/newsletters', newslettersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/blogs/generate', generateBlogRouter);
app.use('/api/blogs', publishRoute);
app.use('/api/blogs', deleteRoute);
app.use('/api/blogs', updateRoute);

// CustomProperty analysis API
app.use('/api/property/saveProperty', savePropertyRouter);
app.use('/api/reports/by-user', getReportsByUserRoute);


// Header
import contactRoute from './routes/contact/contact';
app.use('/api/contact', contactRoute);

// Team routes
app.use('/api/team/invite', inviteRoute);
app.use('/api/team/accept', acceptRoute);
app.use('/api/team/remove', removeRoute);
app.use('/api/team/updateRole', updateRoleRoute);

// Stripe checkout for custom property analysis
app.use('/api/checkout', stripeCheckoutRoute);
app.use('/api/stripe', getStripeSessionDetailsRouter);
app.use('/api/stripe/check-payment', checkPaymentStatusRouter);


//Stripe for user subscription
app.use('/api/stripe/create-subscription-session', createSubscriptionSession);


// live geo data
app.use('/api/property', loopnetRoutes);

//usage reports
app.use('/api/usage/increment', usageIncrementRouter);
app.use('/api/usage/by-user', getUsageByUserRoute);


//ASK
app.use('/api/ask_ai', askAiRoute);

app.get('/', (_req: Request, res: Response) => {
  res.send('Propvia BE is running');
});

// ---- Serve built frontend (CommonJS-safe) ----
const clientDist = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(clientDist));

// Catch-all for client routes (but not /api/*)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'));
});


const PORT = Number(process.env.PORT) || 5050;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


