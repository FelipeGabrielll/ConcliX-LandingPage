# ConcliX — Guia de Branding

> Documento de referência para adaptar o branding ConcliX em novas landing pages.

---

## 1. Identidade da Marca

| Atributo | Valor |
|----------|-------|
| **Nome** | ConcliX |
| **Tagline** | Auditoria inteligente de repasses para e-commerce |
| **Meta Description** | ConcliX — Sistema conciliador de marketplaces. Audite e valide seus repasses financeiros automaticamente. |
| **Page Title** | ConcliX — Conciliação Inteligente de Marketplaces |
| **Segmento** | Fintech / E-commerce / SaaS B2B |
| **Idioma** | Português (BR) |

**Renderização do Logo:**
- Texto: `Concli` + `X` (X em cor de destaque roxo `#7a5c72`)
- Font: `Space Grotesk` 700
- Cor base: `#BFC3BA` (cinza claro)
- Sem arquivo de imagem — logo puramente tipográfico

---

## 2. Paleta de Cores

### Cores Base
```css
--primaria:    #2F2235   /* Roxo escuro — fundo principal, cabeçalho, hero */
--secundaria:  #3F3244   /* Roxo médio — fundos alternativos, formulário   */
--realce:      #60495A   /* Roxo claro — botões, ícones, destaque          */
--realce-h:    #7A5C72   /* Roxo hover — estado :hover dos botões          */
--clara:       #BFC3BA   /* Bege/cinza — textos e bordas em fundo escuro   */
--branco:      #FFFFFF   /* Branco puro — fundo de seções claras e cartões */
```

### Cores Semânticas
```css
--texto-d:     #1A1020   /* Texto muito escuro — títulos h1/h2/h3 */
--texto-b:     #3D3643   /* Texto base — parágrafos em fundo claro */
--texto-m:     #6B6270   /* Texto médio/suave — subtítulos, legendas */
--sucesso:     #3A7D4F   /* Verde escuro — borda esquerda de linha OK */
--erro:        #B44B4B   /* Vermelho — borda esquerda de linha ALERTA */
--sucesso-b:   #4CAF74   /* Verde claro — texto do badge de sucesso */
--erro-b:      #E06060   /* Vermelho claro — texto do badge de erro */
```

### Cores de Código (Syntax Highlight)
```css
/* Fundo do painel */ #1A1020
/* Keywords */        #C678DD   /* magenta */
/* Strings */         #98C379   /* verde */
/* Delta ok */        #4CAF74   /* verde vibrante */
/* Delta alert */     #E06060   /* vermelho vibrante */
```

### Dots de Terminal
```
Vermelho: #B44B4B  |  Amarelo: #C8A127  |  Verde: #3A7D4F
```

---

## 3. Tipografia

### Fontes
```html
<!-- Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

| Função | Família | Pesos |
|--------|---------|-------|
| Display / Títulos | `Space Grotesk` | 500, 600, 700 |
| Corpo / UI | `Inter` | 400, 500, 600 |
| Código | `Courier New` | 400 |

### Escala Tipográfica
```css
/* Variáveis utilizadas no CSS */
--fs-h2:       clamp(1.75rem, 3vw, 2.25rem)   /* Títulos de seção — 28 a 36px */
--fs-destaque: clamp(2.25rem, 5vw, 3.75rem)   /* H1 do hero — 36 a 60px       */

/* Valores fixos (sem variável, aplicados diretamente) */
0.75rem   /* 12px — badges, rótulos, notas */
0.875rem  /* 14px — nav links, botões, cards */
1rem      /* 16px — corpo padrão */
1.125rem  /* 18px — subtítulos de hero e parágrafos de destaque */
1.25rem   /* 20px — H3 de cards */
1.5rem    /* 24px — logo */
```

### Aplicações Tipográficas

| Elemento | Fonte | Peso | Tamanho | Letter-spacing | Line-height |
|----------|-------|------|---------|----------------|-------------|
| Logo | Space Grotesk | 700 | 1.5rem | -0.02em | — |
| H1 (Hero) | Space Grotesk | 700 | `--fs-destaque` | -0.02em | 1.1 |
| H2 (Seções) | Space Grotesk | 700 | `--fs-h2` | normal | 1.2 |
| H3 (Cards) | Space Grotesk | 700 | 1.25rem | normal | 1.3 |
| Body | Inter | 400 | 1rem | normal | 1.65 |
| Subtítulos | Inter | 400 | 1.125rem | normal | 1.7–1.8 |
| Badges/Eyebrow | Inter | 600 | 0.75rem | 0.10–0.12em | — |
| Nav links | Inter | 500 | 0.875rem | normal | — |
| Botões | Inter | 600 | 0.875rem | 0.02em | — |
| Código | Courier New | 400 | 0.82rem | normal | 1.85 |

---

## 4. Espaçamentos

### Border Radius
```css
--raio-p:  4px    /* inputs, elementos pequenos */
--raio-m:  8px    /* botões, chips */
--raio-g:  16px   /* cards, painéis */
--raio-xl: 24px   /* containers grandes */
```

### Sombras
```css
--sombra-p:  0 1px 3px rgba(0,0,0,0.12)
--sombra-m:  0 4px 16px rgba(0,0,0,0.15)
--sombra-g:  0 8px 32px rgba(0,0,0,0.18)
```

### Container
```css
max-width: 1140px;
padding-inline: 1.5rem;
```

---

## 5. Componentes de UI

### Botões

**Primário (`.botao-primario`)**
```css
padding: 0.75rem 1.5rem;
border-radius: 8px;
font-weight: 600;
font-size: 0.875rem;
letter-spacing: 0.02em;
text-transform: uppercase;
background: var(--realce);
color: #fff;
transition: 150ms ease;
/* Hover: translateY(-1px) + box-shadow */
```

**Fantasma (`.botao-fantasma`)**
```css
background: transparent;
border: 2px solid rgba(191, 195, 186, 0.4);
/* Hover: background + borda visível */
```

**Modificadores:** `.botao-grande` (padding 1rem 2rem) | `.botao-pequeno` (padding 0.5rem 1rem)

### Cards de Proposta de Valor (`.cartao`)
```css
border: 1px solid rgba(47, 34, 53, 0.12);
border-radius: 16px;
padding: 2rem;
background: var(--branco);
/* Hover: translateY(-3px) + sombra-g */
```

### Cabeçalho de Seção (`.cabecalho-secao`)
```css
text-align: center;
max-width: 640px;
margin: 0 auto;
/* Estrutura: .etiqueta → h2 → p → .botao */
/* Variante: .cabecalho-secao.esquerda — alinhado à esquerda */
```

### Badge / Eyebrow (`.etiqueta`)
```css
display: inline-block;
background: rgba(96, 73, 90, 0.12);
padding: 0.25rem 0.75rem;
border-radius: 100px;
font-size: 0.75rem;
font-weight: 600;
letter-spacing: 0.10em;
text-transform: uppercase;
color: var(--realce);
/* Variante clara: .etiqueta.clara — para seções com fundo branco */
```

### Indicadores de Status
```css
.sucesso { border-left-color: #3A7D4F; }
.erro    { border-left-color: #B44B4B; }
/* Badge de sucesso: background rgba(58,125,79,.18), color #4CAF74 */
/* Badge de erro:    background rgba(180,75,75,.18), color #E06060 */
```

### Painel Demo (`.painel-demo`)
```css
background: #1A1020;
border-radius: 16px;
border: 1px solid rgba(96,73,90,.35);
box-shadow: var(--sombra-g);
/* Terminal dots: vermelho #B44B4B | amarelo #C8A127 | verde #3A7D4F */
```

---

## 6. Animações e Transições

### Variáveis
```css
--transicao: 150ms ease   /* duração e curva padrão de todas as transições */
```

### Padrões de Animação

| Elemento | Efeito |
|----------|--------|
| Nav links | `color` muda em `150ms ease` no hover |
| Botões | `translateY(-1px)` + box-shadow on hover |
| Feature cards | `translateY(-3px)` + shadow on hover |
| Benefícios | `translateY(-2px)` + shadow on hover |
| Input focus | `box-shadow: 0 0 0 3px rgba(96, 73, 90, 0.15)` |

### Acessibilidade
```css
@media (prefers-reduced-motion: reduce) {
  /* Todas as animações desativadas */
}
```

---

## 7. Copywriting e Tom de Voz

### Personalidade da Marca
- **Profissional** — linguagem técnica mas acessível
- **Confiável** — foco em precisão e automação
- **Direto** — headlines assertivos, zero floreios
- **B2B** — fala com gestores financeiros de e-commerce

### Frase da Marca (Prova Social)
> Transparência, controle e precisão em cada repasse. Do marketplace direto para o seu caixa, **sem surpresas.**

Exibida como faixa sem aspas e sem atribuição, na seção `.prova-social`.

### Headlines Principais

| Seção | Headline |
|-------|----------|
| Hero | "Pare de perder dinheiro com repasses incorretos nos marketplaces." |
| Proposta de valor | "O que o ConcliX faz por você" |
| Relatórios | "Relatórios que revelam cada divergência" |
| Benefícios | "Por que escolher o ConcliX?" |
| Público-alvo | "Feito para quem vende em múltiplos canais" |
| Como funciona | "Como o ConcliX opera" |
| Contato | "Pronto para proteger suas receitas?" |

### Subtítulo Hero
> "O ConcliX audita cada centavo liquidado pelas plataformas, cruza com sua regra de negócio e dispara alertas automáticos quando o repasse não bate."

### CTAs
| Tipo | Texto |
|------|-------|
| Primário hero | "Agendar demonstração" |
| Secundário hero | "Saiba mais" |
| Nav CTA | "Agendar demo" |
| Seção contato | "Enviar" |

### Métricas de Prova Social (Hero)
- **+2.000** — Pedidos auditados por mês
- **< 2h** — Da venda ao alerta
- **6** — Marketplaces integrados

### Cards de Proposta de Valor
1. **Esforço Zero** — Automação completa da conciliação, sem planilhas manuais
2. **Repasse Certo** — Valide cada centavo recebido dos marketplaces
3. **Visão 360°** — Relatórios consolidados de todos os canais

### Benefícios
1. **Economia de tempo** — Auditorias automáticas substituem conferência manual
2. **Mais estimativa financeira** — Previsão confiável de caixa com dados reais
3. **Controle total** — Dashboard centralizado de todos os marketplaces
4. **Redução de erros** — Alertas antes que o prejuízo se acumule

### Integrações
**Marketplaces:** Mercado Livre, Amazon, Shopee, Magalu, Casas Bahia, Madeira Madeira
**ERPs:** Bling ERP (integração nativa), TOTVS

### Relatórios — Itens listados
- Conciliação de repasses por pedido
- Identificação de divergências por valor e data
- Resumo de taxas e comissões cobradas
- Histórico exportável por período

---

## 8. Estrutura de Seções da Landing Page

```
HEADER (.cabecalho, fixo, 68px)
│  Logo + Nav links (Recursos, Relatórios, Benefícios, FAQ) + CTA "Agendar demo"
│  Background: --primaria (#2F2235)
│
├── HERO (.destaque)
│   Conteúdo: .etiqueta → h1 → subtítulo → 2 CTAs → 3 métricas
│   Background: --primaria
│
├── PROVA SOCIAL (.prova-social)
│   Frase da marca — sem aspas, sem atribuição
│   Background: --secundaria (#3F3244)
│
├── PROPOSTA DE VALOR (.proposta-valor)
│   Grid 3 colunas: "Esforço Zero" | "Repasse Certo" | "Visão 360°"
│   Ícones SVG em midias/icone-raio.svg, icone-check.svg, icone-grafico-barras.svg
│   Background: --branco (#FFFFFF)
│
├── INTEGRAÇÕES (.integracoes)
│   Chips de marketplaces (6) + chips de ERPs (2 com classe .realce)
│   Background: --primaria
│
├── RELATÓRIOS (.relatorios)
│   Grid 2 colunas: lista de 4 itens + dashboard SVG
│   Imagem: midias/conclix_dashboard_screenshot.svg
│   Background: --secundaria
│
├── BENEFÍCIOS (.beneficios)
│   Grid 2×2: 4 cards com ícone SVG + título + descrição
│   Ícones: icone-relogio.svg, icone-grafico.svg, icone-escudo.svg, icone-lampada.svg
│   Background: --branco
│
├── PÚBLICO-ALVO (.publico)
│   Grid 2 colunas: texto + ilustração fluxo-marketplace.svg
│   Background: --primaria
│
├── COMO FUNCIONA (.metodo)
│   Grid 2 colunas: passos numerados + ilustração alerta-divergencia.svg
│   Background: --secundaria
│
├── FAQ (.faq)
│   Acordeão com 4 perguntas frequentes
│   Background: --primaria
│
├── CHAMADA FINAL (.chamada-final)
│   Headline + CTA único
│   Background: --realce (#60495A)
│
├── CONTATO (.contato)
│   Grid 2 colunas: dados de contato + formulário (nome, e-mail, mensagem)
│   Background: --secundaria
│
FOOTER (.rodape-site)
   Logo + tagline + nav + links de contato + copyright
   Background: --primaria
```

### Alternância de backgrounds
```
cabecalho     → --primaria   (#2F2235) — dark
destaque      → --primaria   (#2F2235) — dark
prova-social  → --secundaria (#3F3244) — dark
proposta-valor→ --branco     (#FFFFFF) — claro
integracoes   → --primaria   (#2F2235) — dark
relatorios    → --secundaria (#3F3244) — dark
beneficios    → --branco     (#FFFFFF) — claro
publico       → --primaria   (#2F2235) — dark
metodo        → --secundaria (#3F3244) — dark
faq           → --primaria   (#2F2235) — dark
chamada-final → --realce     (#60495A) — roxo médio
contato       → --secundaria (#3F3244) — dark
rodape-site   → --primaria   (#2F2235) — dark
```

---

## 9. Mídias (`midias/`)

Todos os assets visuais ficam na pasta `midias/`. Referenciar sempre com caminho relativo `midias/nome-do-arquivo.svg`.

### Ilustrações de Seção

| Arquivo | Seção | Dimensões | Descrição |
|---------|-------|-----------|-----------|
| `conclix_dashboard_screenshot.svg` | Relatórios | 410×370 | Dashboard com gráfico de barras, tabela de pedidos e métricas. Sem sidebar. Cantos arredondados via `<clipPath>`. |
| `fluxo-marketplace.svg` | Público-alvo | 526×360 | Fluxo visual: 4 cards de marketplace → hub ConcliX (escudo + logo) → box lojista com valor confirmado. |
| `alerta-divergencia.svg` | Como funciona | 526×360 | Card de alerta com header vermelho, valores esperado vs. recebido, divergência em destaque e botões de ação. |

### Ícones de Proposta de Valor (`.cartao .icone`, 24×24)

| Arquivo | Card |
|---------|------|
| `icone-raio.svg` | Esforço Zero |
| `icone-check.svg` | Repasse Certo |
| `icone-grafico-barras.svg` | Visão 360° |

Todos em `stroke="#60495A"` + `fill="#60495A"`, viewBox 56×56, renderizados a 24×24 via atributo `width`/`height`.

### Ícones de Benefícios (`.beneficio .icone`, 24×24)

| Arquivo | Benefício |
|---------|-----------|
| `icone-relogio.svg` | Economia de tempo |
| `icone-grafico.svg` | Mais estimativa financeira |
| `icone-escudo.svg` | Controle total |
| `icone-lampada.svg` | Redução de erros |

### Nota sobre o ícone `icone-grafico.svg`
Linha de tendência em zigzag (points="19,38 23,30 26,34 30,24 34,28 37,20 40,16"). Sem dots nem seta.

---

## 10. Contatos

```
WhatsApp: (44) 99886-0226  → https://wa.me/5544998860226
WhatsApp: (44) 99904-8703  → https://wa.me/5544999048703
E-mail: fg0139784@gmail.com
E-mail: nhdds699@gmail.com
```

Exibidos no footer como `.link-contato` com prefixo emoji 💬 / ✉.

---

## 11. Compatibilidade

Layout fixo para desktop (largura mínima recomendada: 1140px). Sem breakpoints mobile.

Media query mantida apenas para acessibilidade:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; }
}
```

---

## 12. Checklist de Adaptação para Nova Landing Page

- [ ] Importar `Space Grotesk` e `Inter` via Google Fonts
- [ ] Definir variáveis CSS em português (`--primaria`, `--secundaria`, `--realce`, `--clara`, `--branco`)
- [ ] Aplicar `Space Grotesk 700` em todos os títulos e `Inter` no corpo
- [ ] Alternar fundos: `--primaria` → `--secundaria` → `--branco` entre seções
- [ ] Usar `.etiqueta` (badge eyebrow) antes dos títulos de seção
- [ ] Manter CTAs com `text-transform: uppercase` e `letter-spacing: 0.02em`
- [ ] Aplicar `translateY` + shadow nos hovers de cards e botões
- [ ] Incluir `@media (prefers-reduced-motion: reduce)`
- [ ] Header fixo com 68px de altura
- [ ] Logo textual: `Concli` + `X` em `#7A5C72`
- [ ] Referenciar ícones e ilustrações de `midias/`
- [ ] Usar frase da marca sem aspas e sem atribuição na seção `.prova-social`

---

*Gerado em: 2026-06-10 | Atualizado em: 2026-06-14 | Projeto: ConcliX*
