
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, role, teamId, redirectTo } = await req.json()
    
    if (!email) throw new Error('Email is required')

    console.log(`Inviting ${email} as ${role} to team ${teamId || 'none'}`);

    // 1. Invite User via Supabase Auth Admin
    const { data: user, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        role: role || 'viewer',
        team_id: teamId
      },
      redirectTo: redirectTo || 'http://localhost:3000/login'
    })

    if (inviteError) throw inviteError

    // 2. If Team ID provided, add to organizer_team_members table
    if (teamId && user.user) {
        const { error: memberError } = await supabaseAdmin
            .from('organizer_team_members')
            .insert({
                team_id: teamId,
                user_id: user.user.id,
                role_in_team: role
            });

        if (memberError) {
            console.error('Failed to add to team table:', memberError);
            // Non-fatal, auth invite still worked
        }
    }

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
