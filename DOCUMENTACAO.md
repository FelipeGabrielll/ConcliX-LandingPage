# Documento de Recursos, Layout e Tecnologias — ConcliX Landing Page

## 1. Visão Geral do Projeto

A ConcliX Landing Page é uma página de apresentação institucional para o sistema ConcliX, uma plataforma de conciliação financeira de marketplaces. O objetivo da página é comunicar o valor do produto, apresentar seus recursos e converter visitantes em contatos comerciais por meio de um formulário de captura.

A página foi desenvolvida como projeto acadêmico para apresentação universitária e foi construída exclusivamente para uso em navegadores desktop.

---

## 2. Recursos e Funcionalidades

### 2.1 Navegação Fixa com Feedback de Rolagem

O cabeçalho (`<header>`) permanece fixo no topo da tela durante toda a navegação (`position: fixed`). Ao rolar além de 20 pixels, o JavaScript adiciona dinamicamente a classe CSS `rolado` ao elemento, ativando uma sombra inferior que comunica visualmente que o cabeçalho está "flutuando" sobre o conteúdo. Ao retornar ao topo, a sombra é removida.

A navegação interna utiliza âncoras (`href="#secao"`) combinadas com `scroll-behavior: smooth` no CSS, produzindo rolagem suave até cada seção ao clicar nos links do menu.

### 2.2 Seções de Conteúdo

A página é composta pelas seguintes seções, em ordem de apresentação:

| Seção | Identificador | Descrição |
|---|---|---|
| Hero / Destaque | `.destaque` | Chamada principal, subtítulo e CTAs de entrada |
| Frase de Destaque | `.prova-social` | Citação institucional da marca em destaque visual |
| Conciliação | `#conciliacao` | Proposta de valor central com grade de recursos ilustrados |
| Integrações | `#integracoes` | Marketplaces e ERPs compatíveis com o sistema |
| Relatórios | `#relatorios` | Apresentação da funcionalidade de painel e auditoria |
| Benefícios | `#beneficios` | Grade de cartões com os diferenciais do produto |
| Para Quem | `#para-quem` | Perfis de público-alvo contemplados pela solução |
| Como Funciona | `#como-funciona` | Passo a passo do fluxo de uso do sistema |
| FAQ | `#faq` | Perguntas frequentes em componente expansível nativo |
| Chamada Final | `.chamada-final` | CTA secundário de reforço antes do formulário |
| Contato | `#contato` | Formulário de captura de leads |

### 2.3 Integrações Apresentadas

**Marketplaces:** Mercado Livre, Amazon, Shopee, Magazine Luiza, Casas Bahia, Madeira Madeira.

**ERPs:** Bling, TOTVS.

### 2.4 Formulário de Contato com Feedback Visual

O formulário (`<form id="formularioContato">`) coleta nome, e-mail, empresa, telefone, segmento de atuação e mensagem. Ao submeter:

1. O comportamento padrão do navegador (recarregar a página) é cancelado via `event.preventDefault()`.
2. O botão "Fale agora" exibe "Mensagem enviada! ✓" e é desativado para evitar cliques duplos.
3. Após 3,5 segundos, o botão e o formulário retornam ao estado original automaticamente.

Esse comportamento garante uma experiência de usuário completa mesmo sem back-end implementado.

### 2.5 FAQ com Componente Nativo

As perguntas frequentes utilizam os elementos HTML nativos `<details>` e `<summary>`, que oferecem comportamento de acordeão (abrir/fechar) sem nenhuma linha de JavaScript, aproveitando a funcionalidade já embutida nos navegadores modernos.

### 2.6 Ano Dinâmico no Rodapé

O copyright no rodapé exibe o ano corrente automaticamente. Um `<span id="ano">` vazio no HTML é preenchido pelo JavaScript com `new Date().getFullYear()`, eliminando a necessidade de atualizar o código a cada virada de ano.

---

## 3. Tecnologias e Stack Utilizada

A stack do projeto foi construída inteiramente no ecossistema "Vanilla", empregando HTML5, CSS3 e JavaScript puro. Essa decisão exclui o uso de frameworks complexos ou bibliotecas pesadas, como React, Angular ou jQuery. As justificativas para essa escolha incluem:

- **Performance de carregamento:** O navegador interpreta o código puro instantaneamente, garantindo que a página carregue na casa dos milissegundos.
- **Baixa manutenção e independência:** Sem depender de pacotes de terceiros, o projeto fica imune a atualizações externas que poderiam quebrar o código, garantindo sua funcionalidade por muitos anos.
- **Otimização para SEO:** Motores de busca conseguem ler e indexar arquivos estáticos de forma muito mais eficiente e rápida do que páginas que exigem renderização complexa de JavaScript.

### Recursos externos utilizados

| Recurso | Finalidade |
|---|---|
| Google Fonts (Space Grotesk + Inter) | Tipografia via CDN |
| SVG próprios (`midias/`) | Todas as ilustrações e ícones |

Não há dependências de `npm`, `node_modules` ou qualquer gerenciador de pacotes. O projeto é composto por três arquivos de código (`index.html`, `style.css`, `script.js`) e uma pasta de mídias.

---

## 4. Decisões de Layout e Interface

### 4.1 Plataforma Alvo: Somente Desktop

A página foi projetada exclusivamente para navegadores desktop. Não há código de responsividade, media queries ou adaptações para telas menores. Essa decisão foi tomada intencionalmente para concentrar esforço de design na experiência desktop e evitar complexidade desnecessária para o escopo do projeto.

### 4.2 Paleta de Cores

A identidade visual é baseada em tons de roxo escuro com contraste em bege/cinza claro, criando uma estética técnica e sofisticada adequada ao segmento financeiro. Todas as cores são definidas como variáveis CSS no `:root`, centralizando o controle do tema em um único ponto do arquivo.

| Variável | Valor | Aplicação |
|---|---|---|
| `--primaria` | `#2F2235` | Fundo principal, cabeçalho, hero |
| `--secundaria` | `#3F3244` | Fundos alternativos, formulário |
| `--realce` | `#60495A` | Botões, ícones, destaques |
| `--realce-h` | `#7A5C72` | Estado `:hover` de botões e links |
| `--clara` | `#BFC3BA` | Textos e bordas sobre fundo escuro |
| `--branco` | `#FFFFFF` | Fundo de seções claras e cartões |
| `--texto-d` | `#1A1020` | Títulos sobre fundo branco |
| `--texto-b` | `#3D3643` | Parágrafos sobre fundo branco |
| `--texto-m` | `#6B6270` | Subtítulos e legendas |
| `--sucesso` | `#3A7D4F` | Indicador visual de status OK |
| `--erro` | `#B44B4B` | Indicador visual de status alerta |

A alternância entre seções escuras (`--primaria`, `--secundaria`) e claras (`--branco`) cria ritmo visual e quebra a monotonia da leitura.

### 4.3 Tipografia

Duas famílias tipográficas são utilizadas, cada uma com papel definido:

- **Space Grotesk** (pesos 600 e 700): aplicada exclusivamente em títulos (`h1`–`h4`) e na logomarca. Sua geometria moderna e caráter técnico reforçam a identidade do produto.
- **Inter** (pesos 400 e 500): aplicada em todos os textos corridos, parágrafos, labels e elementos de navegação. É uma das fontes mais legíveis para interfaces digitais.

Ambas são carregadas via Google Fonts com `display=swap`, o que evita texto invisível durante o carregamento ao exibir uma fonte do sistema como substituta temporária.

### 4.4 Tipografia Fluida com `clamp()`

Os dois tamanhos tipográficos mais críticos utilizam a função CSS `clamp()` para crescer proporcionalmente com a largura da janela:

```css
--fs-destaque: clamp(2.25rem, 5vw, 3.75rem); /* H1 do hero */
--fs-h2:       clamp(1.75rem, 3vw, 2.25rem); /* H2 de seção */
```

A função `clamp(mínimo, preferido, máximo)` garante que o texto nunca fique menor que o mínimo nem maior que o máximo, independentemente do tamanho da tela.

### 4.5 Sistema de Grid e Flexbox

O layout das seções combina CSS Grid e Flexbox conforme a necessidade estrutural de cada componente:

- **CSS Grid** é usado para grades de dois ou mais eixos: seção de conciliação (2 colunas conteúdo + ilustração), seção de relató­rios, benefícios (grade de cartões), para quem (grade de perfis), formulário (campos em pares) e rodapé (2 colunas).
- **Flexbox** é usado para alinhamentos lineares: navegação do cabeçalho (logo + menu + botão em linha), lista de integrações, botões de ação e empilhamento vertical do formulário.

### 4.6 Identidade Visual — Logomarca

A logomarca utilizada é o arquivo `midias/LogoEscrita.svg`, exibido como `<img>` em ambos os pontos da página onde aparece (cabeçalho e rodapé). O SVG foi adaptado para o tema escuro da interface:

- Fundo removido (transparente), sem `<rect>` de preenchimento.
- "CONCLI": preenchimento `#BFC3BA` (`--clara`), legível sobre fundos escuros.
- "X": preenchimento `#7A5C72` (`--realce-h`), criando destaque sutil na última letra da marca.
- Corte interno do "X": preenchimento `#2F2235` (`--primaria`), tornando-o invisível e integrando o detalhe ao fundo.
- `viewBox` ajustado para enquadrar apenas o texto, eliminando espaços vazios e permitindo dimensionamento preciso via CSS.

O ícone da aba do navegador (favicon) é o arquivo `midias/favicon.png`, referenciado no `<head>` como `<link rel="icon">`.

### 4.7 Componentes de Interface

**Botões:** três variantes de um componente base `.botao` — primário (preenchido, fundo `--realce`), fantasma (transparente, borda `--clara`) e pequeno (tamanho reduzido para contextos secundários). Todos compartilham bordas arredondadas (`--raio: 8px`), transição de 150ms e micro-animação `translateY(-1px)` no `:hover`.

**Etiquetas (chips):** elemento `.etiqueta` usado como rótulo de categoria no cabeçalho de cada seção. Vêm em variante escura (sobre fundos roxos) e clara (sobre fundos brancos).

**Cartões:** `.cartao` com fundo branco e sombra sutil, usado na seção de benefícios. A sombra aumenta no `:hover` para reforçar a interatividade.

**Ilustrações:** todos os elementos visuais são arquivos `.svg` localizados em `midias/`, garantindo nitidez em qualquer resolução de monitor sem aumento de peso de arquivo.

### 4.8 HTML Semântico

A estrutura HTML utiliza elementos semânticos em vez de `<div>` genéricos onde há significado de conteúdo:

| Elemento | Uso |
|---|---|
| `<header>` | Cabeçalho fixo da página |
| `<nav>` | Blocos de navegação (menu e rodapé) |
| `<section>` | Cada bloco temático de conteúdo |
| `<footer>` | Rodapé da página |
| `<blockquote>` | Citação institucional na seção de destaque |
| `<details>` / `<summary>` | Acordeão do FAQ |
| `<address>` | Informações de contato no rodapé |

Essa escolha beneficia a acessibilidade (leitores de tela navegam pela estrutura semântica) e o SEO (motores de busca interpretam a hierarquia corretamente).

### 4.9 Animações e Transições

Todas as transições compartilham a mesma duração e curva, definidas na variável `--transicao: 150ms ease`. Isso garante coerência cinética em toda a interface: links de menu, botões, campos de formulário e cartões respondem ao `:hover` com a mesma cadência. O valor de 150ms é breve o suficiente para parecer imediato, mas longo o suficiente para ser percebido pelo usuário.

---

## 5. Arquitetura dos Arquivos

```
ConcliX/
├── index.html          — estrutura e conteúdo da página
├── style.css           — todos os estilos visuais
├── script.js           — interatividade (sombra do header, ano, formulário)
├── midias/
│   ├── favicon.png                   — ícone da aba do navegador
│   ├── LogoEscrita.svg               — logomarca (cabeçalho e rodapé)
│   ├── conclix_dashboard_screenshot.svg — ilustração do painel do sistema
│   ├── fluxo-marketplace.svg         — ilustração da seção "Como Funciona"
│   ├── alerta-divergencia.svg        — ilustração da seção de Conciliação
│   ├── icone-check.svg               — ícone de confirmação
│   ├── icone-escudo.svg              — ícone de segurança
│   ├── icone-grafico.svg             — ícone de análise
│   ├── icone-grafico-barras.svg      — ícone de relatório
│   ├── icone-lampada.svg             — ícone de insight
│   ├── icone-raio.svg                — ícone de velocidade
│   └── icone-relogio.svg             — ícone de tempo
└── BRANDING.md         — guia de identidade visual da marca
```

O JavaScript (`script.js`) é carregado no final do `<body>` com o atributo `defer`, garantindo que o DOM esteja completamente construído antes de qualquer manipulação de elementos.

---

## 6. Análise Crítica

### Pontos Positivos

- A página consome pouquíssima memória e banda de internet do usuário, pois não realiza o download de pacotes extras.
- A manutenção visual é extremamente ágil graças ao uso centralizado de variáveis CSS, permitindo a alteração de todo o tema com a modificação de poucas linhas.
- A estrutura possui alta resiliência, mantendo 90% da página em perfeito funcionamento mesmo em cenários onde o JavaScript falha ou é desativado.

### Pontos Negativos

- A arquitetura apresenta dificuldade de escalabilidade, pois a ausência de componentização nativa força a repetição manual de código caso o projeto cresça para múltiplas páginas.
- A manipulação manual do DOM exige que o JavaScript busque os elementos ativamente na tela, o que pode se tornar confuso e suscetível a bugs em interfaces de alta complexidade.
