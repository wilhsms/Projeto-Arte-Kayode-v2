const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5000;

function sanitizeText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function contact(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método não permitido." });
  }

  const body = request.body || {};
  const website = sanitizeText(body.website, 200);

  if (website) {
    return response.status(200).json({ success: true });
  }

  const nome = sanitizeText(body.nome, MAX_NAME_LENGTH);
  const email = sanitizeText(body.email, MAX_EMAIL_LENGTH);
  const assunto = sanitizeText(body.assunto, MAX_SUBJECT_LENGTH);
  const mensagem = sanitizeText(body.mensagem, MAX_MESSAGE_LENGTH);

  if (!nome || !email || !assunto || !mensagem || !isValidEmail(email)) {
    return response.status(400).json({ error: "Preencha todos os campos corretamente." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) {
    console.error("Configuração de e-mail ausente.");
    return response.status(500).json({ error: "O envio de mensagens ainda não está configurado." });
  }

  const destination = process.env.CONTACT_TO_EMAIL || "contato@ileashe.org.br";
  const html = `<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <h2>Nova mensagem pelo site Projeto Arte Kayode</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Assunto:</strong> ${escapeHtml(assunto)}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(mensagem).replace(/\n/g, "<br>")}</p>
      </body>
    </html>`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [destination],
        reply_to: email,
        subject: `[Site Arte Kayode] ${assunto}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text();
      console.error("Erro do Resend:", resendResponse.status, resendError);
      return response.status(502).json({ error: "Não foi possível enviar a mensagem agora." });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Falha ao enviar e-mail:", error);
    return response.status(500).json({ error: "Não foi possível enviar a mensagem agora." });
  }
};
