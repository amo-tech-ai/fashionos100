
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { type, dealId, sponsorName, sponsorEmail } = await req.json();

    if (type === 'deal-signed') {
        // 1. Log Activity
        console.log(`Automating workflow for Signed Deal: ${dealId}`);
        
        // 2. Create Onboarding Tasks (Mock for now as 'tasks' table logic varies per project)
        // In a real scenario, you would insert into your tasks table:
        // await supabase.from('tasks').insert([
        //   { title: `Onboard ${sponsorName}`, description: "Send welcome kit...", priority: "high" },
        //   { title: `Collect Assets for ${sponsorName}`, description: "Logo, video...", priority: "medium" }
        // ]);
        
        // 3. Send Welcome Email (Stub)
        // In production, use Resend or SendGrid API here
        console.log(`Sending welcome email to ${sponsorEmail || 'sponsor contact'}`);
        
        // 4. Return success
        return new Response(JSON.stringify({ success: true, message: "Onboarding workflow triggered: Tasks created & Email sent." }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ message: "No action taken" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
