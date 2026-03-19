import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, email, mensagem } = req.body;

  // ✅ Validação
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: "Campos obrigatórios" });
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
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "📩 Novo contato do portfólio",
      text: `
Nome: ${nome}
Email: ${email}

Mensagem:
${mensagem}
      `,
    });

    return res.status(200).json({ message: "Email enviado!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao enviar" });
  }
}