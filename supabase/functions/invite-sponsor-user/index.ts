
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // 1. Create Supabase Client with Service Role (for Admin actions)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 2. Parse Input
    const { email, sponsorProfileId } = await req.json()
    if (!email || !sponsorProfileId) throw new Error('Missing email or sponsorProfileId')

    // 3. Invite User
    const { data: user, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        role: 'sponsor',
        sponsor_profile_id: sponsorProfileId
      }
    })

    if (inviteError) throw inviteError

    // 4. Link User to Sponsor Profile
    const { error: linkError } = await supabaseAdmin
      .from('sponsor_profiles')
      .update({ owner_id: user.user.id })
      .eq('id', sponsorProfileId)

    if (linkError) throw linkError

    return new Response(
      JSON.stringify({ success: true, message: `Invitation sent to ${email}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
