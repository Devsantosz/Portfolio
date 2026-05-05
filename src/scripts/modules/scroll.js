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

window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

const toggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('nav#menu ul');
 
        toggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });
 
        // Fecha ao clicar em qualquer link
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
            });
        });
 
        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', false);
            }
        });