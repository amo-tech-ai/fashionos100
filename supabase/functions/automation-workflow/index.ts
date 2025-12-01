
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
        console.log(`Automating workflow for Signed Deal: ${dealId}`);
        
        // 1. Fetch Deal Metadata to find Event Organizer
        const { data: deal } = await supabase
          .from('event_sponsors')
          .select(`
             id,
             event:events(organizer_id, title),
             sponsor:sponsor_profiles(owner_id, name)
          `)
          .eq('id', dealId)
          .single();
        
        if (deal) {
            // 2. Notify Organizer
            if (deal.event?.organizer_id) {
                await supabase.from('notifications').insert({
                    user_id: deal.event.organizer_id,
                    title: 'New Deal Signed! 🎉',
                    message: `${deal.sponsor.name} just signed for ${deal.event.title}.`,
                    type: 'success'
                });
            }

            // 3. Notify Sponsor (if they have portal access)
            if (deal.sponsor?.owner_id) {
                await supabase.from('notifications').insert({
                    user_id: deal.sponsor.owner_id,
                    title: 'Partnership Active',
                    message: `Welcome to ${deal.event.title}! Please check your portal for next steps.`,
                    type: 'success'
                });
            }
        }
        
        return new Response(JSON.stringify({ success: true, message: "Workflow executed: Notifications sent." }), {
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
