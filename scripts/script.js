const botao = document.getElementById('botao-tema');
const body = document.body;

// Persistência do tema
const temasalvo = localStorage.getItem('tema');
temaEscuro(temasalvo === 'escuro');

// Função para alternar entre tema claro e escuro
function temaEscuro(tipo) {
  if (tipo == true) {
    body.classList.add('escuro');
    botao.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('escuro');
    botao.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

botao.addEventListener('click', () => {
  const isescuro = body.classList.toggle('escuro');
  temaEscuro(isescuro);
  localStorage.setItem('tema', isescuro ? 'escuro' : 'claro');
});

// Scroll suave para links de navegação
const navLinks = document.querySelectorAll('#menu ul a.link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

const form = document.getElementById("form-contato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  button.textContent = "Enviando...";
  button.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch("/api/enviar", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      mostrarMensagem("✅ Email enviado com sucesso!", "sucesso");
      form.reset();
    } else {
      mostrarMensagem("❌ Erro ao enviar. Tente novamente.", "erro");
    }
  } catch (error) {
    mostrarMensagem("❌ Erro de conexão.", "erro");
  }

  button.textContent = "Enviar mensagem";
  button.disabled = false;
});

function mostrarMensagem(texto, tipo) {
  let msg = document.createElement("div");
  msg.className = `msg-${tipo}`;
  msg.textContent = texto;

  form.appendChild(msg);

  setTimeout(() => {
    msg.remove();
  }, 4000);
}
