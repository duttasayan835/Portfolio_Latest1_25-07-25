// supabase/functions/send-contact-email/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

serve(async (req) => {
  const { name, email, subject, message } = await req.json();

  // Store in Supabase
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error: dbError } = await supabase
    .from("messages")
    .insert([{ name, email, subject, message }]);

  if (dbError) {
    return new Response(JSON.stringify({ error: dbError.message }), { status: 500 });
  }

  // Send email (example using Resend API)
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Your Name <onboarding@resend.dev>",
      to: "duttasayan947595@gmail.com",
      subject: subject,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
    }),
  });

  if (!resendRes.ok) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});