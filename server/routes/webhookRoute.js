// /routes/webhook.ts or similar

import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/stripe/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  consol.log('signature', sig);
  consol.log('===body', req.body);

  res.json({ received: true });
});

export default router;