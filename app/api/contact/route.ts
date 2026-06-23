import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey?.trim()) return null;
  return new Resend(apiKey);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

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
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name?.trim() || "Non renseigné");
    const safeEmail = escapeHtml(email.trim());
    const safeActivity = escapeHtml(activity?.trim() || "Non renseignée");
    const safeMessage = escapeHtml(message?.trim() || "Aucun message");

    const resend = getResendClient();
    const contactEmail = process.env.CONTACT_EMAIL ?? "ryadboujenan@outlook.com";
    const fromEmail =
      process.env.RESEND_FROM ?? "Ryad Web Studio <onboarding@resend.dev>";

    if (resend) {
      const { error } = await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        replyTo: email.trim(),
        subject: `Nouvelle demande de devis - ${name?.trim() || "Anonyme"}`,
        html: `
          <h2>Nouvelle demande de devis</h2>
          <p><strong>Nom:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Activité:</strong> ${safeActivity}</p>
          <p><strong>Message:</strong> ${safeMessage}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString("fr-FR")}</p>
        `,
      });

      if (error) {
        console.error("[Email Error]", error);
        return NextResponse.json(
          { error: "Impossible d'envoyer l'email. Réessayez plus tard." },
          { status: 502 }
        );
      }
    } else {
      console.warn(
        "[Contact] RESEND_API_KEY manquante — soumission enregistrée en logs uniquement."
      );
    }

    console.log("[Contact]", {
      name: name?.trim() || "Non renseigné",
      email: email.trim(),
      activity: activity?.trim() || "Non renseignée",
      message: message?.trim() || "Aucun message",
      at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
