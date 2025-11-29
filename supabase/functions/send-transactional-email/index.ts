
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

declare const Deno: any;

interface EmailRequest {
  to: string;
  template: 'booking_confirmation' | 'welcome' | 'alert';
  data: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { to, template, data } = await req.json() as EmailRequest;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    console.log(`[Email Service] Preparing to send '${template}' to ${to}`);

    if (!resendApiKey) {
      console.log(`[Mock Email] 
        To: ${to}
        Template: ${template}
        Data: ${JSON.stringify(data, null, 2)}
        Status: Sent (Simulated)
      `);
      
      return new Response(JSON.stringify({ success: true, mock: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Integration with Resend (if key exists)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'FashionOS <noreply@fashionos.dev>',
        to: [to],
        subject: getSubject(template, data),
        html: getHtmlBody(template, data)
      })
    });

    const result = await res.json();
    
    if (!res.ok) throw new Error(JSON.stringify(result));

    return new Response(JSON.stringify({ success: true, id: result.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("[Email Error]", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

function getSubject(template: string, data: any): string {
  switch(template) {
    case 'booking_confirmation': return `Booking Confirmed: ${data.shootType}`;
    case 'welcome': return `Welcome to FashionOS, ${data.name}`;
    case 'alert': return `Alert: ${data.title}`;
    default: return 'Notification from FashionOS';
  }
}

function getHtmlBody(template: string, data: any): string {
  // Simple HTML templates
  if (template === 'booking_confirmation') {
    return `
      <h1>Booking Confirmed</h1>
      <p>Hi ${data.name},</p>
      <p>We've received your request for a <strong>${data.shootType}</strong> shoot.</p>
      <p>Ref ID: ${data.id}</p>
      <p>We will be in touch shortly to finalize the schedule.</p>
    `;
  }
  return `<p>${JSON.stringify(data)}</p>`;
}
