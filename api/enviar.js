import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  const params = new URLSearchParams(data);

  const nome = params.get("nome");
  const email = params.get("email");
  const mensagem = params.get("mensagem");

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
    console.error(error);
    return res.status(500).send("Erro ao enviar email");
  }
}
