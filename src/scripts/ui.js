// FOTO PERFIL
const foto = document.getElementById('fotoPerfil');

const fotos = [
  'src/assets/image/perfil-dev.png',
  'src/assets/image/perfil-real.jpeg'
];

let fotoAtual = 0;

foto.addEventListener('click', () => {
  fotoAtual = (fotoAtual + 1) % fotos.length;
  foto.src = fotos[fotoAtual];
});


// IMAGEM PROJETO
const img = document.getElementById('System');

const imagens = [
  'src/assets/image/proj-estoque-login.png',
  'src/assets/image/proj-estoque.png'
];

let imgAtual = 0;

img.addEventListener('click', () => {
  imgAtual = (imgAtual + 1) % imagens.length;
  img.src = imagens[imgAtual];
});

const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});