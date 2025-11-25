
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { action, sponsorId, eventId, metricData } = await req.json()

    // ACTION: CALCULATE ROI
    if (action === 'calculate-roi') {
      if (!sponsorId) throw new Error('Missing sponsorId')

      // 1. Fetch all metrics
      const { data: metrics, error } = await supabase
        .from('sponsor_roi_metrics')
        .select('metric_name, metric_value')
        .eq('event_sponsor_id', sponsorId)

      if (error) throw error

      // 2. Fetch Deal Value
      const { data: deal } = await supabase
        .from('event_sponsors')
        .select('agreed_cash_value, in_kind_value')
        .eq('id', sponsorId)
        .single()

      const totalInvestment = (deal?.agreed_cash_value || 0) + (deal?.in_kind_value || 0)
      
      // 3. Simple Logic (Replace with complex AI logic later)
      const totalImpressions = metrics
        .filter((m: any) => m.metric_name.includes('impression') || m.metric_name.includes('view'))
        .reduce((acc: number, curr: any) => acc + Number(curr.metric_value), 0)

      const cpm = totalInvestment > 0 && totalImpressions > 0 
        ? (totalInvestment / (totalImpressions / 1000)).toFixed(2) 
        : 0

      return new Response(JSON.stringify({ 
        total_investment: totalInvestment,
        total_impressions: totalImpressions,
        calculated_cpm: cpm,
        roi_status: Number(cpm) < 20 ? 'Excellent' : 'Average'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // ACTION: UPDATE STATUS (With Notification Logic stub)
    if (action === 'update-status') {
       const { status } = await req.json()
       
       const { data, error } = await supabase
         .from('event_sponsors')
         .update({ status })
         .eq('id', sponsorId)
         .select()
         .single()
         
       if (error) throw error
       
       // (Future: Trigger email notification via Resend/SendGrid)
       
       return new Response(JSON.stringify({ success: true, data }), {
         headers: { ...corsHeaders, 'Content-Type': 'application/json' }
       })
    }

    throw new Error('Invalid Action')

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
