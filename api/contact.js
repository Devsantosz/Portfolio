// api/contact.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Permitir apenas método POST
  if (req.method !== "POST") {
    return res.status(405).json({ 
      sucesso: false, 
      mensagem: "Método não permitido" 
    });
  }

  const { nome, email, mensagem } = req.body;

  // Validação dos campos
  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Todos os campos são obrigatórios."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfólio Devsantosz" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Novo contato de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
      html: `
        <h3>Novo contato recebido do portfólio!</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, "<br>")}</p>
      `,
    });

    return res.status(200).json({ 
      sucesso: true, 
      mensagem: "Mensagem enviada com sucesso!" 
    });

  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return res.status(500).json({
      sucesso: false,
      mensagem: "Erro interno ao enviar a mensagem. Tente novamente mais tarde."
    });
  }
}