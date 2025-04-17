import Stripe from 'stripe'
import { Request, Response } from 'express'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { plan } = req.body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price: plan === 'monthly' ? process.env.STRIPE_PRICE_MONTHLY : process.env.STRIPE_PRICE_YEARLY,
      quantity: 1
    }],
    success_url: `${process.env.FRONTEND_URL}/dashboard?status=success`,
    cancel_url: `${process.env.FRONTEND_URL}/onboarding?status=cancelled`,
  })

  res.json({ url: session.url })
}
