/* ═══════════════════════════════════════════════════════════════
   ConcliX — Interatividade da Landing Page
   Responsável por: sombra do cabeçalho, ano no rodapé e
   feedback visual do formulário de contato.
═══════════════════════════════════════════════════════════════ */


/* ── 1. SOMBRA DO CABEÇALHO AO ROLAR ──────────────────────────
   O cabeçalho fica fixo no topo (position: fixed no CSS).
   Quando o usuário rola a página além de 20px, adicionamos a
   classe CSS "rolado" nele — essa classe ativa a sombra definida
   no estilo. Quando volta ao topo, a classe é removida e a
   sombra some.
─────────────────────────────────────────────────────────────── */

// const declara uma constante: o valor não pode ser reatribuído
// (cabecalho sempre apontará para o mesmo elemento). Use const
// como padrão; use let só quando precisar mudar o valor depois.
// document.getElementById('id') percorre o DOM e retorna o
// elemento que possui aquele id — ou null se não existir.
const cabecalho = document.getElementById('cabecalho');

// 'scroll' dispara a cada movimento de rolagem da página.
// { passive: true } avisa ao navegador que nunca chamaremos
// preventDefault() aqui, permitindo que ele otimize a rolagem.
//
// () => { } é uma "arrow function" (função de seta) — forma
// moderna e compacta de escrever uma função anônima. Equivale a:
//   function() { ... }
// Usamos arrow functions em callbacks (funções passadas como
// argumento para outra função, como addEventListener).
window.addEventListener('scroll', () => {

  // classList.toggle(classe, condicao):
  //   - se condicao for TRUE  → adiciona a classe ao elemento
  //   - se condicao for FALSE → remove a classe do elemento
  // scrollY é a quantidade de pixels rolados verticalmente.
  cabecalho.classList.toggle('rolado', scrollY > 20);

}, { passive: true });


/* ── 2. ANO DINÂMICO NO RODAPÉ ─────────────────────────────────
   O HTML tem <span id="ano"></span> vazio. Aqui preenchemos com
   o ano atual para que o copyright nunca fique desatualizado,
   sem precisar editar o código a cada virada de ano.
─────────────────────────────────────────────────────────────── */

// Captura o <span id="ano"> e insere o ano corrente como texto.
// new Date()           → cria um objeto com data e hora atuais
// .getFullYear()       → extrai apenas o ano (ex: 2026)
// .textContent = ...   → define o texto visível do elemento
const elementoAno = document.getElementById('ano');
if (elementoAno) elementoAno.textContent = new Date().getFullYear();


/* ── 3. FORMULÁRIO DE CONTATO — FEEDBACK VISUAL AO ENVIAR ──────
   O formulário não possui back-end ainda. Ao submeter:
     a) impedimos o comportamento padrão (recarregar a página)
     b) o botão exibe "Mensagem enviada! ✓" e fica desativado
     c) após 3,5 segundos tudo volta ao estado original
   O "if (formulario)" evita erros caso o formulário não exista
   em alguma versão futura da página.
─────────────────────────────────────────────────────────────── */

// Captura o elemento <form id="formularioContato">
const formulario = document.getElementById('formularioContato');

if (formulario) {

  // 'submit' dispara quando o usuário clica em enviar ou
  // pressiona Enter dentro de qualquer campo do formulário.
  formulario.addEventListener('submit', (evento) => {

    // Cancela o envio padrão do formulário (que recarregaria
    // a página ou tentaria enviar para um servidor).
    evento.preventDefault();

    // Localiza o botão de envio dentro do formulário
    // usando o seletor de atributo [type="submit"].
    const botao = formulario.querySelector('[type="submit"]');

    // Salva o texto original do botão para restaurar depois
    const textoOriginal = botao.textContent;

    // Altera o texto do botão para confirmar o envio
    botao.textContent = 'Mensagem enviada! ✓';

    // Desativa o botão para impedir cliques duplos
    botao.disabled = true;

    // Reduz a opacidade visualmente indicando estado inativo
    botao.style.opacity = '0.75';

    // setTimeout executa a função após 3500 milissegundos (3,5s)
    setTimeout(() => {

      // Restaura o texto original do botão
      botao.textContent = textoOriginal;

      // Reativa o botão
      botao.disabled = false;

      // Atribuir string vazia a uma propriedade de style remove
      // aquele estilo inline do elemento, fazendo o CSS da folha
      // de estilos voltar a valer. É diferente de opacity = '1':
      // esse forçaria um valor fixo; '' devolve o controle ao CSS.
      botao.style.opacity = '';

      // Limpa todos os campos do formulário
      formulario.reset();

    }, 3500);

  });

}
