
const body = document.body;



/* Scroll suave para links de navegação */
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

/* Formulario*/
const form = document.getElementById("form-contato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = form.querySelector("button");
  button.textContent = "Enviando...";
  button.disabled = true;

  const data = {
    nome: form.querySelector('[name="nome"]').value,
    email: form.querySelector('[name="email"]').value,
    mensagem: form.querySelector('[name="mensagem"]').value,
  };

  try {
    const response = await fetch("/api/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

/* Alterar foto de perfil*/
const foto = document.getElementById('fotoPerfil');

const fotos = [
  'src/image/minidev.png',
  'src/image/perfil.jpeg'
];

let atual = 0;

foto.addEventListener('click', () => {
  atual = (atual + 1) % fotos.length;
  foto.src = fotos[atual];
});


/* Projetos */
const img = document.getElementById('System');

const imagens = [
  'src/image/tela-login.png',
  'src/image/estoque.png'
];

img.addEventListener('click', () => {
  img.src = 'src/image/estoque.png';
});

img.addEventListener('click', () => {
  atual = (atual + 1) % imagens.length;
  img.src = imagens[atual];
});
