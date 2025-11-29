
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { jsPDF } from "https://jspdf.es/dist/jspdf.es.min.js"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { sponsorName, terms, value, date, eventName } = await req.json()

    // Create PDF
    const doc = new jsPDF()
    
    // Branding
    doc.setFontSize(22)
    doc.setFont("helvetica", "bold")
    doc.text("SPONSORSHIP AGREEMENT", 105, 20, { align: "center" })
    
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("FashionOS Studio", 105, 30, { align: "center" })

    // Details
    doc.setFontSize(10)
    doc.text(`Date: ${date}`, 20, 50)
    doc.text(`Event: ${eventName}`, 20, 55)
    doc.text(`Sponsor: ${sponsorName}`, 20, 60)
    doc.text(`Total Value: $${value.toLocaleString()}`, 20, 65)

    // Divider
    doc.line(20, 70, 190, 70)

    // Terms
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Terms & Conditions", 20, 85)
    
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    
    const splitText = doc.splitTextToSize(terms || "Standard terms apply.", 170)
    doc.text(splitText, 20, 95)

    // Signatures
    const finalY = 250
    doc.line(20, finalY, 80, finalY)
    doc.text("Authorized Signature", 20, finalY + 5)
    doc.text("FashionOS", 20, finalY + 10)

    doc.line(130, finalY, 190, finalY)
    doc.text("Authorized Signature", 130, finalY + 5)
    doc.text(sponsorName, 130, finalY + 10)

    // Output as ArrayBuffer
    const pdfOutput = doc.output('arraybuffer')

    return new Response(pdfOutput, {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Contract-${sponsorName}.pdf"`
      }
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
