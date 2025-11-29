
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import Stripe from "https://esm.sh/stripe@14.21.0";

declare const Deno: any;

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');

  if (!stripeKey || !webhookSecret) {
    return new Response('Missing Stripe Config', { status: 500 });
  }

  const stripe = new Stripe(stripeKey, {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
  });

  try {
    const body = await req.text();
    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook signature verification failed.`, err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const shootId = session.metadata?.shootId;

      if (shootId) {
        // Initialize Supabase Admin Client
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Update Shoot Status
        const { error: updateError } = await supabase
          .from('shoots')
          .update({ 
            status: 'confirmed', 
            deposit_paid: true 
          })
          .eq('id', shootId);

        if (updateError) throw updateError;

        // 2. Record Payment
        await supabase.from('payments').insert({
            shoot_id: shootId,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency,
            status: 'succeeded',
            provider_payment_id: session.payment_intent as string
        });
        
        console.log(`Shoot ${shootId} confirmed successfully.`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error(err);
    return new Response(`Server Error: ${err.message}`, { status: 500 });
  }
});
