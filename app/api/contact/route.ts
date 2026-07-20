import { NextResponse } from "next/server";
import { Resend } from "resend";

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
    // `phone`, `siteUrl` et `source` alimentent le formulaire de diagnostic
    // (/refonte-site-internet). Le formulaire de devis historique n'envoie
    // que name/email/activity/message et reste entièrement compatible.
    const { name, email, phone, siteUrl, activity, message, source } = body;

    const hasEmail = Boolean(email?.trim());
    const hasPhone = Boolean(phone?.trim());

    if (!hasEmail && !hasPhone) {
      return NextResponse.json(
        { error: "Indiquez un email ou un numéro de téléphone." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (hasEmail && !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const isDiagnostic = source === "diagnostic";

    if (isDiagnostic && !siteUrl?.trim()) {
      return NextResponse.json(
        { error: "L'adresse de votre site est requise." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name?.trim() || "Non renseigné");
    const safeEmail = escapeHtml(email?.trim() || "Non renseigné");
    const safePhone = escapeHtml(phone?.trim() || "Non renseigné");
    const safeSiteUrl = escapeHtml(siteUrl?.trim() || "");
    const safeActivity = escapeHtml(activity?.trim() || "Non renseignée");
    const safeMessage = escapeHtml(message?.trim() || "Aucun message");

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("[Contact API] RESEND_API_KEY manquante");
      console.log("[Contact] Soumission enregistrée en logs:", {
        source: isDiagnostic ? "diagnostic" : "devis",
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        siteUrl: safeSiteUrl,
        activity: safeActivity,
        message: safeMessage,
        at: new Date().toISOString(),
      });
      return NextResponse.json({ success: true });
    }

    const resend = new Resend(apiKey);
    const contactEmail = process.env.CONTACT_EMAIL ?? "ryadboujenan@outlook.com";
    const fromEmail =
      process.env.RESEND_FROM ?? "Ryad Web Studio <onboarding@resend.dev>";

    console.log("[Contact API] Tentative d'envoi d'email à:", contactEmail);

    const { error } = await resend.emails.send({
        from: fromEmail,
        to: contactEmail,
        ...(hasEmail ? { replyTo: email.trim() } : {}),
        subject: isDiagnostic
          ? `Demande de diagnostic - ${name?.trim() || safeSiteUrl || "Anonyme"}`
          : `Nouvelle demande de devis - ${name?.trim() || "Anonyme"}`,
        html: `
          <h2>${isDiagnostic ? "Demande de diagnostic de site" : "Nouvelle demande de devis"}</h2>
          ${isDiagnostic && safeSiteUrl ? `<p><strong>Site à diagnostiquer:</strong> ${safeSiteUrl}</p>` : ""}
          <p><strong>Nom:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Téléphone:</strong> ${safePhone}</p>
          <p><strong>Activité:</strong> ${safeActivity}</p>
          <p><strong>Message:</strong> ${safeMessage}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString("fr-FR")}</p>
        `,
      });

      if (error) {
        console.error("[Contact API] Erreur Resend:", error);
        return NextResponse.json(
          { error: "Impossible d'envoyer l'email. Réessayez plus tard." },
          { status: 502 }
        );
      }

    console.log("[Contact API] Email envoyé avec succès");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessayez plus tard." },
      { status: 500 }
    );
  }
}
