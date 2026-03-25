import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.post("/api/contact", async (req, res) => {
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
      subject: "Novo contato",
      text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
    });

    res.json({ sucesso: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: true });
  }
});

app.listen(3000, () => console.log("Servidor rodando"));