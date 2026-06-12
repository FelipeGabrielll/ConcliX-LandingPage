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
| H1 (Hero) | Space Grotesk | 700 | `--text-hero` | -0.02em | 1.1 |
| H2 (Seções) | Space Grotesk | 700 | `--text-2xl` | normal | 1.2 |
| H3 (Cards) | Space Grotesk | 700 | `--text-lg` | normal | 1.3 |
| Body | Inter | 400 | `--text-base` | normal | 1.65 |
| Subtítulos | Inter | 400 | `--text-md` | normal | 1.7–1.8 |
| Badges/Eyebrow | Inter | 600 | `--text-xs` | 0.10–0.12em | — |
| Nav links | Inter | 500 | `--text-sm` | normal | — |
| Botões | Inter | 600 | `--text-sm` | 0.02em | — |
| Código | Courier New | 400 | 0.82rem | normal | 1.85 |

---

## 4. Espaçamentos

### Sistema de Espaçamento
```css
--space-1:   0.25rem   /* 4px */
--space-2:   0.5rem    /* 8px */
--space-3:   0.75rem   /* 12px */
--space-4:   1rem      /* 16px */
--space-5:   1.25rem   /* 20px */
--space-6:   1.5rem    /* 24px */
--space-8:   2rem      /* 32px */
--space-10:  2.5rem    /* 40px */
--space-12:  3rem      /* 48px */
--space-16:  4rem      /* 64px */
--space-20:  5rem      /* 80px */
--space-24:  6rem      /* 96px */
```

### Border Radius
```css
--radius-sm:  4px    /* inputs, elementos pequenos */
--radius-md:  8px    /* botões, cards pequenos */
--radius-lg:  16px   /* feature cards, painéis */
--radius-xl:  24px   /* containers grandes */
```

### Sombras
```css
--shadow-sm:  0 1px 3px rgba(0,0,0,0.12)
--shadow-md:  0 4px 16px rgba(0,0,0,0.15)
--shadow-lg:  0 8px 32px rgba(0,0,0,0.18)
```

### Container
```css
max-width: 1140px;
padding-inline: 1.5rem;
```

---

## 5. Componentes de UI

### Botões

**Primário (`.btn--primary`)**
```css
padding: 0.75rem 1.5rem;
border-radius: 8px;
font-weight: 600;
font-size: var(--text-sm);
letter-spacing: 0.02em;
text-transform: uppercase;
background: var(--color-accent);
color: #fff;
transition: 150ms ease;
/* Hover: translateY(-1px) + box-shadow */
```

**Ghost (`.btn--ghost`)**
```css
background: transparent;
border: 2px solid rgba(191, 195, 186, 0.4);
/* Hover: background + borda visível */
```

### Feature Cards
```css
border: 1px solid rgba(169, 172, 169, 0.4);
border-radius: 16px;
padding: 2rem;
background: white;
/* Hover: translateY(-3px) + shadow-lg */

/* Variante dark (.feature-card--accent): */
background: var(--color-primary);
border-color: var(--color-secondary);
```

### Section Header
```css
text-align: center;
max-width: 640px;
margin: 0 auto;
/* Estrutura: eyebrow badge → title → description */
```

### Badge / Eyebrow
```css
display: inline-block;
background: rgba(96, 73, 90, 0.12);
padding: 0.25rem 0.75rem;
border-radius: 100px;
font-size: var(--text-xs);
font-weight: 600;
letter-spacing: 0.10–0.12em;
text-transform: uppercase;
color: var(--color-accent);
```

### Status Indicators
```css
.status--ok:    color: #3A7D4F;
.status--alert: color: #B44B4B;
/* Acompanhados de ícone SVG */
```

### Painel de Código
```css
background: #1A1020;
border-radius: 16px;
box-shadow: var(--shadow-lg);
font-family: Courier New, monospace;
font-size: 0.82rem;
line-height: 1.85;
/* Terminal dots: vermelho, amarelo, verde (8px circles) */
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
- **Confiável** — foco em precisão (99,4%) e automação
- **Direto** — headlines assertivos, zero floreios
- **B2B** — fala com gestores financeiros de e-commerce

### Headlines Principais

| Seção | Headline |
|-------|----------|
| Hero | "Pare de perder dinheiro com repasses incorretos nos marketplaces." |
| Features | "O que o ConcliX faz por você" |
| How it works | "Como o ConcliX opera" |
| Integration | "Sincronização automatizada com o seu ERP" |
| Use Case | "Veja o ConcliX em ação" |
| Contact | "Pronto para proteger suas receitas?" |

### Subtítulo Hero
> "O ConcliX audita cada centavo liquidado pelas plataformas, cruza com sua regra de negócio via Bling ERP e dispara alertas automáticos quando o repasse não bate."

### CTAs
| Tipo | Texto |
|------|-------|
| Primário hero | "Solicitar Acesso ao ConcliX" |
| Secundário hero | "Ver Simulação ao Vivo" |
| Nav CTA | "Conhecer o Sistema" |
| Seção contact | "Acesse o Sistema" |
| Simulador | "Executar Auditoria" |

### Badge Labels (Eyebrows das seções)
- "Conciliação Financeira para E-commerce"
- "Recursos Funcionais"
- "Mecânica do Sistema"
- "Integração Bling ERP"
- "Exemplo Prático"
- "Acesse o Sistema"

### Métricas de Prova Social (Hero)
- **99,4%** — Precisão nas auditorias
- **< 2 min** — Da venda ao alerta
- **Zero** — Configuração manual de regras

### Features
1. **Auditoria Inteligente de Repasses** — Valida cada centavo liquidado
2. **Sistema de Alertas de Divergência** — Dispara quando o repasse não bate
3. **Relatórios Financeiros Consolidados** — Visão unificada de todos os canais

### Steps (How It Works)
1. Marketplace realiza o repasse
2. Consulta ao Bling ERP
3. Validação cruzada
4. Alerta automático de divergência

### Disclaimer
> "Nenhum dado é compartilhado com terceiros. Retorno em até 1 dia útil."

---

## 8. Estrutura de Seções da Landing Page

```
HEADER (fixo, 68px)
│  Logo + Nav links + CTA button
│  Background: --color-primary
│
├── HERO
│   │  Background: imagem + overlay gradient sobre --color-primary
│   │  Conteúdo: badge → h1 → subtítulo → 2 CTAs → 3 métricas
│
├── FEATURES
│   │  Background: --color-light (#BFC3BA)
│   │  Grid 3 colunas (1 card com variante dark/accent)
│
├── HOW IT WORKS
│   │  Background: --color-secondary (#3F3244)
│   │  Lista ordenada vertical com linha conectora
│
├── INTEGRATION (Bling ERP)
│   │  Background: --color-primary
│   │  Grid 2 colunas: painel de código + checklist
│
├── USE CASE / SIMULATOR
│   │  Background: --color-light
│   │  Grid 2 colunas: input form + output results
│
├── CONTACT
│   │  Background: --color-secondary
│   │  Grid 2 colunas: copy + formulário
│
FOOTER
   Background: --color-primary
   Logo + tagline + nav links + copyright
```

### Alternância de backgrounds por seção
```
header    → primary  (#2F2235) — dark
hero      → primary  (#2F2235) — dark (+ image overlay)
features  → light    (#BFC3BA) — claro
how-works → secondary(#3F3244) — dark
integration→ primary (#2F2235) — dark
use-case  → light    (#BFC3BA) — claro
contact   → secondary(#3F3244) — dark
footer    → primary  (#2F2235) — dark
```

---

## 9. Compatibilidade

Layout fixo para desktop (largura mínima recomendada: 960px). Sem breakpoints mobile.

Media query mantida apenas para acessibilidade:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; }
}
```

---

## 10. Checklist de Adaptação para Nova Landing Page

Ao adaptar para uma nova LP, verifique cada item:

- [ ] Importar as fontes `Space Grotesk` e `Inter` via Google Fonts
- [ ] Definir as variáveis CSS de cor, espaçamento, radius e shadow
- [ ] Aplicar `Space Grotesk 700` em todos os títulos e `Inter` no corpo
- [ ] Usar `--color-primary` / `--color-secondary` / `--color-light` como backgrounds alternados
- [ ] Reproduzir o padrão de badges (eyebrow) antes dos títulos de seção
- [ ] Manter os CTAs com `text-transform: uppercase` e `letter-spacing: 0.02em`
- [ ] Aplicar `translateY` + shadow nos hovers de cards e botões
- [ ] Incluir `@media (prefers-reduced-motion: reduce)` para acessibilidade
- [ ] Manter o header fixo com 68px de altura
- [ ] Usar o logo textual: `Concli` + `X` destacado em `#7A5C72`
- [ ] Preservar as métricas de prova social (99,4% / < 2 min / Zero)
- [ ] Manter o disclaimer sobre privacidade de dados

---

*Gerado em: 2026-06-10 | Atualizado em: 2026-06-11 | Projeto: ConcliX*
