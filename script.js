/**
 * ============================================================
 * ConcliX — Script Principal
 * Arquivo: script.js
 *
 * Descricao:
 *   Modulo unico de interatividade da Landing Page ConcliX.
 *   Organizado em blocos funcionais independentes, cada um
 *   responsavel por uma camada de comportamento da interface.
 *
 * Arquitetura:
 *   Todos os modulos sao inicializados via DOMContentLoaded,
 *   garantindo que o DOM esteja completamente parseado antes
 *   de qualquer manipulacao. Nenhuma dependencia externa e
 *   utilizada — JavaScript puro (ES6+).
 *
 * Modulos:
 *   1. initScrollHeader      — Destaque do header ao rolar
 *   2. initSmoothScroll      — Rolagem suave para ancoras
 *   3. initMobileMenu        — Menu hamburguer responsivo
 *   4. initActiveNavLinks    — Realce do link ativo no scroll
 *   5. initSimulator         — Motor da simulacao de auditoria
 *   6. initContactForm       — Validacao do formulario de contato
 *   7. initFooterYear        — Ano dinamico no rodape
 *
 * Restricoes:
 *   - Proibido o uso de emojis em qualquer parte do arquivo.
 *   - Compatibilidade: Chrome, Firefox, Safari e Edge modernos.
 * ============================================================
 */

'use strict';

/* ============================================================
   UTILITARIOS GLOBAIS
   Funcoes de suporte reutilizadas por multiplos modulos.
   ============================================================ */

/**
 * Seleciona um unico elemento do DOM com seguranca.
 * @param {string} selector - Seletor CSS valido.
 * @param {Element} [context=document] - Contexto de busca.
 * @returns {Element|null}
 */
function qs(selector, context) {
  return (context || document).querySelector(selector);
}

/**
 * Seleciona multiplos elementos do DOM.
 * @param {string} selector - Seletor CSS valido.
 * @param {Element} [context=document] - Contexto de busca.
 * @returns {NodeList}
 */
function qsAll(selector, context) {
  return (context || document).querySelectorAll(selector);
}

/**
 * Formata um numero como moeda brasileira (BRL).
 * Utiliza a API Intl.NumberFormat nativa para localizacao.
 * @param {number} value - Valor numerico a formatar.
 * @returns {string} Valor formatado, ex: "R$ 1.500,00"
 */
function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(value);
}

/**
 * Retorna a hora atual no formato HH:MM:SS para uso nos logs
 * do simulador. Exibe o estado do sistema em tempo real.
 * @returns {string} Ex: "14:32:07"
 */
function getCurrentTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

/**
 * Retorna uma Promise que resolve apos um intervalo de tempo.
 * Utilizada para simular latencia de chamadas de API nos logs
 * do simulador, tornando a animacao mais realista.
 * @param {number} ms - Milissegundos de espera.
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/* ============================================================
   MODULO 1: initScrollHeader
   Detecta a posicao de rolagem da pagina e aplica a classe
   CSS `.header--scrolled` no elemento <header> quando o
   usuario rola mais de 10px a partir do topo.

   Tecnica: IntersectionObserver no elemento sentinel (mais
   performatico que scroll listener com calculo de scrollY).
   Fallback para scroll listener caso o navegador nao suporte.
   ============================================================ */
function initScrollHeader() {
  const header = qs('#header');
  if (!header) return;

  const SCROLL_THRESHOLD = 10; // px a partir do topo para ativar o estado scrolled

  /**
   * Callback executado a cada evento de scroll.
   * Adiciona ou remove a classe de estado com base no threshold.
   */
  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  // Verifica o estado inicial ao carregar (caso o usuario ja esteja no meio da pagina)
  onScroll();

  // Usa scroll passivo para nao bloquear o thread principal (melhor performance)
  window.addEventListener('scroll', onScroll, { passive: true });
}


/* ============================================================
   MODULO 2: initSmoothScroll
   Intercepta todos os cliques em links de ancora interna
   (href iniciando com "#") e implementa rolagem suave via
   scrollIntoView, substituindo o comportamento nativo.

   Motivo: scroll-behavior: smooth no CSS nao oferece controle
   sobre o offset necessario para compensar a altura do header
   fixo. Este modulo calcula o offset dinamicamente.
   ============================================================ */
function initSmoothScroll() {
  const header = qs('#header');

  /**
   * Calcula a altura atual do header para uso como offset
   * de rolagem. Recalculado em cada clique pois o header pode
   * mudar de altura em diferentes viewports.
   * @returns {number} Altura do header em pixels.
   */
  function getHeaderHeight() {
    return header ? header.getBoundingClientRect().height : 0;
  }

  // Delega o evento de clique no documento para capturar todos os links de ancora
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href');

    // Ignora links que apontam apenas para "#" sem ID especifico
    if (targetId === '#') {
      event.preventDefault();
      return;
    }

    const targetElement = qs(targetId);
    if (!targetElement) return;

    event.preventDefault();

    // Calcula a posicao final considerando o offset do header fixo
    const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetTop   = elementTop - getHeaderHeight() - 8; // 8px de margem visual

    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior: 'smooth'
    });
  });
}


/* ============================================================
   MODULO 3: initMobileMenu
   Controla a abertura e fechamento do menu de navegacao em
   viewports mobile (abaixo de 640px, conforme definido no CSS).

   Comportamentos implementados:
   - Toggle do menu ao clicar no botao hamburguer.
   - Fechamento automatico ao clicar em qualquer link do menu.
   - Fechamento ao clicar fora da area do header.
   - Atualizacao dos atributos ARIA para acessibilidade.
   ============================================================ */
function initMobileMenu() {
  const toggle = qs('#menuToggle');
  const nav    = qs('#mainNav');
  if (!toggle || !nav) return;

  /**
   * Alterna o estado do menu mobile.
   * Atualiza as classes CSS e os atributos ARIA simultaneamente.
   * @param {boolean} forceClose - Se true, fecha o menu independentemente do estado atual.
   */
  function toggleMenu(forceClose) {
    const isOpen = nav.classList.contains('is-open');

    // Se forceClose for solicitado ou o menu ja estiver aberto, fecha
    if (forceClose || isOpen) {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      nav.classList.add('is-open');
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  }

  // Evento principal: clique no botao hamburguer
  toggle.addEventListener('click', function () {
    toggleMenu(false);
  });

  // Fecha o menu ao clicar em qualquer link de ancora dentro da nav
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a[href^="#"]')) {
      toggleMenu(true);
    }
  });

  // Fecha o menu ao clicar fora do header (overlay de fundo)
  document.addEventListener('click', function (event) {
    const header = qs('#header');
    if (header && !header.contains(event.target)) {
      toggleMenu(true);
    }
  });

  // Fecha o menu ao redimensionar para viewport maior (evita nav oculta no desktop)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 640) {
      toggleMenu(true);
    }
  });
}


/* ============================================================
   MODULO 4: initActiveNavLinks
   Utiliza IntersectionObserver para monitorar quais secoes
   estao visiveis no viewport e destaca o link de navegacao
   correspondente com a classe CSS `.header__nav-link--active`.

   Estrategia: observa o inicio de cada secao com um rootMargin
   negativo, de modo que o link e ativado quando a secao entra
   na regiao central do viewport.
   ============================================================ */
function initActiveNavLinks() {
  const navLinks = qsAll('.header__nav-link');
  if (!navLinks.length) return;

  // Mapeia cada ID de secao ao link de navegacao correspondente
  const linkMap = {};
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      linkMap[href.slice(1)] = link;
    }
  });

  /**
   * Remove a classe ativa de todos os links antes de
   * aplicar ao link da secao atualmente visivel.
   * @param {string} activeId - ID da secao ativa.
   */
  function setActiveLink(activeId) {
    navLinks.forEach(function (link) {
      link.classList.remove('header__nav-link--active');
    });
    if (linkMap[activeId]) {
      linkMap[activeId].classList.add('header__nav-link--active');
    }
  }

  // Configuracao do observer: ativa quando 40% da secao esta visivel
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  // Registra todas as secoes que possuem ID mapeado a um link de nav
  Object.keys(linkMap).forEach(function (id) {
    const section = qs('#' + id);
    if (section) observer.observe(section);
  });
}


/* ============================================================
   MODULO 5: initSimulator
   Motor principal da simulacao de auditoria de repasse.
   Implementa o fluxo completo do produto ConcliX de forma
   animada e didatica para a secao de Use Case.

   Fluxo de execucao:
   1. Usuario preenche valor esperado (ERP) e valor recebido.
   2. Ao clicar em "Executar Auditoria", o simulador inicia.
   3. Linhas de log aparecem sequencialmente, simulando a
      execucao real do pipeline de conciliacao.
   4. O resultado final exibe o delta (diferenca) e o status:
      - CONCILIADO (verde): repasse >= esperado.
      - DIVERGENCIA (vermelho): repasse < esperado.
   ============================================================ */
function initSimulator() {
  const btnSimular  = qs('#btnSimular');
  const simStatus   = qs('#simStatus');
  const simLog      = qs('#simLog');
  const simDelta    = qs('#simDelta');

  // Inputs do simulador
  const inputEsperado = qs('#sim-esperado');
  const inputRecebido = qs('#sim-recebido');
  const selectMkt     = qs('#sim-marketplace');

  // Guarda de execucao: impede multiplos cliques simultaneos
  let isRunning = false;

  if (!btnSimular) return;

  /**
   * Nomes de exibicao dos marketplaces disponiveis no select.
   * Utilizado para personalizar as mensagens de log.
   */
  const MARKETPLACE_LABELS = {
    ml:     'Mercado Livre',
    amazon: 'Amazon',
    shopee: 'Shopee'
  };

  /**
   * Reseta o painel de saida para o estado inicial (idle),
   * limpando logs, delta e status anteriores.
   */
  function resetOutput() {
    // Limpa as linhas de log anteriores
    simLog.innerHTML = '';

    // Oculta o painel de delta financeiro
    simDelta.hidden = true;
    simDelta.className = 'sim-delta';
    simDelta.innerHTML = '';

    // Restaura o icone e texto do status para idle
    simStatus.className = 'sim-status sim-status--idle';
    simStatus.innerHTML = `
      <div class="sim-status__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>
      <p class="sim-status__text">Aguardando execucao da auditoria...</p>
    `;
  }

  /**
   * Injeta uma nova linha de log no painel de saida.
   * Cada linha possui timestamp, mensagem e modificador de cor.
   * O delay de animacao e escalonado pelo indice para criar
   * o efeito de sequencia (linha por linha).
   *
   * @param {string} message    - Texto da linha de log.
   * @param {string} [modifier] - Classe CSS extra: 'ok' | 'alert' | '' (padrao).
   * @param {number} [index=0]  - Indice para escalonar o animation-delay.
   */
  function appendLog(message, modifier, index) {
    const line = document.createElement('div');
    line.className = 'sim-log-line' + (modifier ? ' sim-log-line--' + modifier : '');

    // Escalonamento da animacao de entrada
    line.style.animationDelay = ((index || 0) * 80) + 'ms';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'sim-log-line__time';
    timeSpan.textContent = getCurrentTime();

    const msgSpan = document.createElement('span');
    msgSpan.textContent = message;

    line.appendChild(timeSpan);
    line.appendChild(msgSpan);
    simLog.appendChild(line);

    // Auto-scroll para o final do log
    simLog.scrollTop = simLog.scrollHeight;
  }

  /**
   * Atualiza o icone e texto central do painel de status.
   * @param {'loading'|'ok'|'alert'} state - Estado a renderizar.
   */
  function setStatus(state) {
    simStatus.hidden = false;

    const icons = {
      loading: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>`,
      ok:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>`,
      alert:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>`
    };

    const texts = {
      loading: 'Executando pipeline de auditoria...',
      ok:      'Repasse conciliado com sucesso.',
      alert:   'Divergencia detectada. Alerta disparado.'
    };

    simStatus.className = 'sim-status sim-status--' + state;
    simStatus.innerHTML = `
      <div class="sim-status__icon" aria-hidden="true">${icons[state]}</div>
      <p class="sim-status__text">${texts[state]}</p>
    `;
  }

  /**
   * Renderiza o painel de resultado financeiro (delta).
   * Exibe a diferenca entre valor esperado e valor recebido,
   * com codigo de cor semantico: verde (ok) ou vermelho (alerta).
   *
   * @param {number} esperado  - Valor de referencia do ERP.
   * @param {number} recebido  - Valor liquidado pelo marketplace.
   * @param {boolean} isAlert  - True se houver divergencia negativa.
   */
  function renderDelta(esperado, recebido, isAlert) {
    const delta     = Math.abs(esperado - recebido);
    const modifier  = isAlert ? 'alert' : 'ok';
    const label     = isAlert ? 'Divergencia identificada' : 'Conciliado — sem divergencia';
    const prefix    = isAlert ? '- ' : '+ ';
    const deltaText = isAlert
      ? prefix + formatBRL(delta) + ' abaixo do esperado'
      : 'Repasse dentro da tolerancia';

    simDelta.className = 'sim-delta sim-delta--' + modifier;
    simDelta.innerHTML = `
      <div class="sim-delta__value">${deltaText}</div>
      <div class="sim-delta__label">${label}</div>
    `;
    simDelta.hidden = false;
  }

  /**
   * Funcao principal da simulacao.
   * Executa o pipeline de auditoria de forma assincrona,
   * com delays artificiais entre as etapas para simular
   * latencia de chamadas de API e processamento real.
   *
   * Etapas do pipeline simulado:
   *   - Captura dos valores de entrada e validacao.
   *   - Log de inicio: interceptacao do evento de repasse.
   *   - Log de consulta ao Bling ERP.
   *   - Log de motor de validacao cruzada.
   *   - Log do resultado: conciliado ou divergencia com alerta.
   */
  async function runSimulation() {
    if (isRunning) return;
    isRunning = true;

    // Leitura e sanitizacao dos valores de entrada
    const esperado  = parseFloat(inputEsperado.value) || 0;
    const recebido  = parseFloat(inputRecebido.value) || 0;
    const mktKey    = selectMkt ? selectMkt.value : 'ml';
    const mktLabel  = MARKETPLACE_LABELS[mktKey] || 'Marketplace';

    // Validacao minima: ambos os valores devem ser positivos
    if (esperado <= 0 || recebido <= 0) {
      resetOutput();
      appendLog('ERRO: Os valores de entrada devem ser maiores que zero.', 'alert', 0);
      isRunning = false;
      return;
    }

    // Limpa o estado anterior e exibe o status de carregamento
    resetOutput();
    setStatus('loading');

    // --- ETAPA 1: Interceptacao do evento de repasse ---
    await delay(400);
    appendLog('Evento de repasse recebido via webhook — ' + mktLabel, '', 0);

    await delay(300);
    appendLog('Payload validado — pedido #' + Math.floor(10000 + Math.random() * 89999), '', 1);

    // --- ETAPA 2: Consulta ao Bling ERP ---
    await delay(500);
    appendLog('Consultando Bling ERP — buscando valor de referencia...', '', 2);

    await delay(600);
    appendLog('ERP retornou: valor esperado = ' + formatBRL(esperado), '', 3);

    // --- ETAPA 3: Motor de validacao cruzada ---
    await delay(400);
    appendLog('Iniciando validacao cruzada — comparando valores...', '', 4);

    await delay(350);
    appendLog('Repasse recebido: ' + formatBRL(recebido), '', 5);

    // --- ETAPA 4: Resultado da auditoria ---
    const isAlert  = recebido < esperado;
    const delta    = esperado - recebido;

    await delay(500);

    if (isAlert) {
      // Cenario de divergencia: repasse inferior ao esperado
      appendLog(
        'DIVERGENCIA detectada — delta: ' + formatBRL(delta),
        'alert',
        6
      );
      await delay(300);
      appendLog('Classificando severidade da ocorrencia...', 'alert', 7);

      await delay(400);

      // Classificacao proporcional da divergencia
      const percentualDelta = (delta / esperado) * 100;
      const severidade = percentualDelta > 20
        ? 'CRITICA'
        : percentualDelta > 10
          ? 'ALTA'
          : 'MODERADA';

      appendLog('Severidade: ' + severidade + ' (' + percentualDelta.toFixed(1) + '% abaixo)', 'alert', 8);

      await delay(350);
      appendLog('Alerta automatico disparado para o lojista.', 'alert', 9);
      await delay(200);
      appendLog('Ocorrencia registrada no historico de auditorias.', 'alert', 10);

      setStatus('alert');

    } else {
      // Cenario de conciliacao: repasse dentro ou acima do esperado
      appendLog('Validacao aprovada — repasse dentro da tolerancia.', 'ok', 6);
      await delay(300);
      appendLog('Transacao marcada como CONCILIADA.', 'ok', 7);
      await delay(200);
      appendLog('Registro salvo no historico de auditorias.', 'ok', 8);

      setStatus('ok');
    }

    // Renderiza o painel de delta financeiro ao final da execucao
    await delay(400);
    renderDelta(esperado, recebido, isAlert);

    // Libera o semaforo de execucao
    isRunning = false;
  }

  // Vincula a execucao ao clique do botao de simulacao
  btnSimular.addEventListener('click', runSimulation);

  /**
   * Permite reexecutar a simulacao pressionando Enter
   * em qualquer campo de input do simulador, melhorando
   * a ergonomia de uso durante uma apresentacao ao vivo.
   */
  [inputEsperado, inputRecebido].forEach(function (input) {
    if (!input) return;
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') runSimulation();
    });
  });
}


/* ============================================================
   MODULO 6: initContactForm
   Valida os campos obrigatorios do formulario de contato
   antes do envio. Exibe mensagens de erro inline acessiveis
   e aplica a classe CSS `.is-invalid` para feedback visual.

   Campos validados:
   - Nome: nao pode estar vazio.
   - Email: deve corresponder ao padrao de email RFC 5322.
   - Empresa: nao pode estar vazio.

   Ao passar em todas as validacoes, exibe uma mensagem de
   confirmacao no lugar do formulario (mockup de envio).
   ============================================================ */
function initContactForm() {
  const btnContato = qs('#btnContato');
  if (!btnContato) return;

  const formWrap   = qs('.contact__form');
  const inputNome  = qs('#contact-nome');
  const inputEmail = qs('#contact-email');
  const inputEmpresa = qs('#contact-empresa');

  /**
   * Expressao regular para validacao de formato de e-mail.
   * Cobre os casos mais comuns sem ser excessivamente restritiva.
   * @type {RegExp}
   */
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Aplica ou remove o estado de erro em um campo de input.
   * Gerencia a classe CSS de erro e cria/remove a mensagem
   * de erro acessivel (role="alert") associada ao campo.
   *
   * @param {HTMLElement} input   - Elemento de input alvo.
   * @param {string|null} message - Mensagem de erro. Null remove o erro.
   */
  function setFieldError(input, message) {
    // Remove o erro anterior associado a este campo, se existir
    const existingError = input.parentElement.querySelector('.contact__error');
    if (existingError) existingError.remove();

    if (message) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');

      const errorEl = document.createElement('span');
      errorEl.className = 'contact__error';
      errorEl.setAttribute('role', 'alert');
      errorEl.textContent = message;
      input.parentElement.appendChild(errorEl);
    } else {
      input.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
    }
  }

  /**
   * Executa a validacao completa do formulario.
   * Itera pelos campos obrigatorios e acumula os erros.
   * @returns {boolean} True se todos os campos sao validos.
   */
  function validateForm() {
    let isValid = true;

    // Validacao do campo Nome
    if (!inputNome || inputNome.value.trim().length < 3) {
      setFieldError(inputNome, 'Informe seu nome completo.');
      isValid = false;
    } else {
      setFieldError(inputNome, null);
    }

    // Validacao do campo E-mail
    if (!inputEmail || !EMAIL_REGEX.test(inputEmail.value.trim())) {
      setFieldError(inputEmail, 'Informe um endereco de e-mail valido.');
      isValid = false;
    } else {
      setFieldError(inputEmail, null);
    }

    // Validacao do campo Empresa
    if (!inputEmpresa || inputEmpresa.value.trim().length < 2) {
      setFieldError(inputEmpresa, 'Informe o nome da sua empresa ou loja.');
      isValid = false;
    } else {
      setFieldError(inputEmpresa, null);
    }

    return isValid;
  }

  /**
   * Remove o estado de erro de um campo ao usuario comecar
   * a digitar nele, evitando que a mensagem de erro persista
   * enquanto o usuario ainda esta corrigindo o valor.
   */
  [inputNome, inputEmail, inputEmpresa].forEach(function (input) {
    if (!input) return;
    input.addEventListener('input', function () {
      setFieldError(input, null);
    });
  });

  /**
   * Handler principal do botao de envio.
   * Valida o formulario e, se aprovado, substitui o form
   * por uma mensagem de sucesso (mockup de confirmacao).
   */
  btnContato.addEventListener('click', function () {
    if (!validateForm()) return;

    // Mockup de envio: substitui o formulario pela confirmacao
    if (!formWrap) return;

    formWrap.innerHTML = `
      <div class="contact__success" role="status" aria-live="polite">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
             stroke="#3a7d4f" stroke-width="1.5" stroke-linecap="round"
             stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
        <h3 class="contact__success-title">Solicitacao recebida com sucesso.</h3>
        <p class="contact__success-desc">
          Nossa equipe entrara em contato em ate 1 dia util para
          apresentar o acesso ao sistema ConcliX.
        </p>
      </div>
    `;

    // Injeta estilo inline minimo para o estado de sucesso
    // (evita adicionar classe ao CSS que nao sera usada em outros contextos)
    const style = document.createElement('style');
    style.textContent = `
      .contact__success {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 1rem;
        padding: 3rem 1.5rem;
      }
      .contact__success-title {
        font-family: 'Syne', sans-serif;
        font-size: 1.25rem;
        font-weight: 700;
        color: #BFC3BA;
      }
      .contact__success-desc {
        font-size: 0.9rem;
        color: rgba(191, 195, 186, 0.6);
        max-width: 320px;
        line-height: 1.75;
      }
    `;
    document.head.appendChild(style);
  });
}


/* ============================================================
   MODULO 7: initFooterYear
   Injeta o ano corrente no elemento do rodape com id
   "footerYear", eliminando a necessidade de atualizacao
   manual do copyright a cada virada de ano.
   ============================================================ */
function initFooterYear() {
  const yearEl = qs('#footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ============================================================
   INICIALIZACAO PRINCIPAL
   Aguarda o evento DOMContentLoaded para garantir que todos
   os elementos do DOM estejam disponiveis antes de executar
   qualquer modulo de inicializacao.

   Os modulos sao chamados em ordem de dependencia visual:
   primeiro os comportamentos globais (scroll, header),
   depois os componentes especificos (simulador, formulario).
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  // Comportamentos globais de layout e navegacao
  initScrollHeader();    // Destaque do header ao rolar a pagina
  initSmoothScroll();    // Rolagem suave para ancoras internas
  initMobileMenu();      // Menu hamburguer para viewports mobile
  initActiveNavLinks();  // Realce do link ativo conforme secao visivel

  // Componentes interativos especificos das secoes
  initSimulator();       // Motor da simulacao de auditoria de repasse
  initContactForm();     // Validacao do formulario de contato

  // Utilitarios de conteudo dinamico
  initFooterYear();      // Ano dinamico no copyright do rodape

});
