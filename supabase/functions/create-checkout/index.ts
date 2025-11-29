
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@14.21.0";
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount, currency = 'usd', title, successUrl, cancelUrl } = await req.json()
    
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

    // 2. Mock Mode (Development / No Key)
    if (!stripeKey) {
      console.log("Stripe key missing, running in mock mode");
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return new Response(
        JSON.stringify({ 
          url: null, 
          mock: true,
          message: 'Payment successful (Mock Mode). Set STRIPE_SECRET_KEY to enable real payments.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Real Stripe Mode (Production)
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: title || 'FashionOS Service',
              description: 'Professional Creative Services',
            },
            unit_amount: Math.round(amount * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || 'http://localhost:3000/dashboard/bookings?success=true',
      cancel_url: cancelUrl || 'http://localhost:3000/start-project/checkout?canceled=true',
    });

    return new Response(
      JSON.stringify({ url: session.url, mock: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: any) {
    console.error("Payment Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
