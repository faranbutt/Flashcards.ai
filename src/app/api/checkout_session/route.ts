import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY!

const stripe = new Stripe(apiKey, {
  apiVersion: '2024-06-20',
}
)

const formatAmountForStripe = (amount: number): number => {
    return Math.round(amount * 100); 
  };

export async function GET(req:NextRequest){
  const searchParams = req.nextUrl.searchParams;
  const session_id = searchParams.get('session_id');
  if (!session_id) {
    return NextResponse.json(
      { error: { message: 'Session ID is required' } },
      { status: 400 }
    );
  }
  try{
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  }catch(error:any){
    console.error('Error retreiveing checkout session:',error)
    return NextResponse.json({error: {message:error.message}},{status:500})
  }
}

export async function POST(req:NextRequest){
    const {planType}:{ planType: 'starter' | 'pro' | 'enterprise' } = await req.json();
    const prices = {
      starter: 500,
      pro:1000,
      enterprise:4000
    }
    const unitAmount = prices[planType] || prices.pro;
    const params: Stripe.Checkout.SessionCreateParams = {
        mode:"subscription",
        payment_method_types: ['card'],
        line_items: [
          {
            price_data:{
                currency:'usd',
                product_data:{
                    name:`${planType.charAt(0).toLocaleUpperCase() + planType.slice(1) } subscription`,

                },
                unit_amount:unitAmount,
                recurring:{
                    interval:'month',
                    interval_count:1
                }
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params);
      return NextResponse.json(checkoutSession,{
        status:200
      })

}