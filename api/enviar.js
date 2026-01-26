import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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

    return res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("ERRO REAL:", error);
    return res.status(500).json({ message: "Erro ao enviar email" });
  }
}
