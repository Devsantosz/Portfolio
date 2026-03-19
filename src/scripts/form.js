const form = document.getElementById("form-contato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    mostrarMensagem("⚠️ Preencha todos os campos!", "erro");
    return;
  }

  const button = form.querySelector("button");
  button.textContent = "Enviando...";
  button.disabled = true;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, mensagem }),
    });

    if (response.ok) {
      mostrarMensagem("✅ Email enviado!", "sucesso");
      form.reset();
    } else {
      mostrarMensagem("❌ Erro ao enviar.", "erro");
    }

  } catch {
    mostrarMensagem("❌ Erro de conexão.", "erro");
  }

  button.textContent = "Enviar mensagem";
  button.disabled = false;
});

function mostrarMensagem(texto, tipo) {
  const msg = document.createElement("div");
  msg.className = `msg-${tipo}`;
  msg.textContent = texto;

  form.appendChild(msg);

  setTimeout(() => msg.remove(), 4000);
}