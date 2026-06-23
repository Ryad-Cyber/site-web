import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, activity, message } = body;

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "Le champ email est requis." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Ryad Web Studio <onboarding@resend.dev>",
          to: "ryadboujenan@outlook.com",
          subject: `Nouvelle demande de devis - ${name?.trim() || "Anonyme"}`,
          html: `
            <h2>Nouvelle demande de devis</h2>
            <p><strong>Nom:</strong> ${name?.trim() || "Non renseigné"}</p>
            <p><strong>Email:</strong> ${email.trim()}</p>
            <p><strong>Activité:</strong> ${activity?.trim() || "Non renseignée"}</p>
            <p><strong>Message:</strong> ${message?.trim() || "Aucun message"}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString("fr-FR")}</p>
          `,
        });
      } catch (emailError) {
        console.error("[Email Error]", emailError);
        // Continue even if email fails
      }
    }

    // Log the submission
    console.log("[Contact]", {
      name: name?.trim() || "Non renseigné",
      email: email.trim(),
      activity: activity?.trim() || "Non renseignée",
      message: message?.trim() || "Aucun message",
      at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
