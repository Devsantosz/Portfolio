import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const { nome, email, mensagem } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nova mensagem do Portfólio",
      text: `
Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}
      `,
    });

    return res.status(200).send("Email enviado com sucesso!");
  } catch (error) {
    return res.status(500).send("Erro ao enviar email");
  }
}
