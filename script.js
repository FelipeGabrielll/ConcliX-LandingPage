const cabecalho = document.getElementById('cabecalho');

window.addEventListener('scroll', () => {
  cabecalho.classList.toggle('rolado', scrollY > 20);
}, { passive: true });


const botaoMenu = document.getElementById('botaoMenu');
const menuNav   = document.getElementById('menuNav');

if (botaoMenu && menuNav) {
  botaoMenu.addEventListener('click', () => {
    const aberto = menuNav.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', aberto);
  });

  menuNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuNav.classList.remove('aberto');
      botaoMenu.setAttribute('aria-expanded', 'false');
    });
  });
}


const elementoAno = document.getElementById('ano');
if (elementoAno) elementoAno.textContent = new Date().getFullYear();


const formulario = document.getElementById('formularioContato');

if (formulario) {

  formulario.addEventListener('submit', (evento) => {

    evento.preventDefault();

    const botao = formulario.querySelector('[type="submit"]');
    const textoOriginal = botao.textContent;

    botao.textContent = 'Mensagem enviada! ✓';
    botao.disabled = true;
    botao.style.opacity = '0.75';

    setTimeout(() => {
      botao.textContent = textoOriginal;
      botao.disabled = false;
      botao.style.opacity = '';
      formulario.reset();
    }, 3500);

  });

}
