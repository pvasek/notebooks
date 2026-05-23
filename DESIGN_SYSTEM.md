# Design system — Školní materiály

Visual system for the interactive school-materials site. **For Claude:** this is a reference, not a brief — when generating a lesson, follow it concretely (use these CSS variables, these patterns, these spacing values). Don't reinterpret the aesthetic on each lesson.

## 1. Aesthetic point of view

**Smart lab notebook meets indie science zine.**

Imagine a really good 1970s university physics textbook redesigned by someone who runs an arts-magazine. Warm cream paper. Fountain-pen ink. Big chunky chapter numbers in display italic. Acid-lime highlighter behind key terms. Diagrams hand-drawn with labeled arrows and dashed construction lines. Marginalia. Generous structure but with personality — the page knows it's being read by a curious teenager, not graded by an administrator.

Not Brilliant.org. Not Khan Academy. Not a SaaS dashboard. Closer to a beautifully printed scientific zine you'd actually want to keep.

### What this is NOT
- ❌ No purple-to-pink gradients on white
- ❌ No generic EdTech "friendly blue" #1E3A8A on white cards
- ❌ No cartoon mascots, no "Hi friend!" pep, no rounded-bubble fonts
- ❌ No floating glass cards with backdrop-blur — that's SaaS, not school
- ❌ No emoji as decoration (emoji only when semantically meaningful, e.g. in a quiz answer)
- ❌ No Inter, Roboto, Arial, system-ui as primary fonts

## 2. Audience & tone

Readers are **10–18 years old, Czech-speaking**, sitting in front of a real lesson they're trying to understand. The widest age band means we treat them like the older end and let visuals carry the warmth — a 12-year-old responds to *energy* (big numbers, vivid accent color, satisfying interactive moments), a 17-year-old responds to *respect* (good typography, real density, treats them like adults). The lab-notebook aesthetic gives both.

**Voice in copy** (set by SPEC.md, summarized here):
- Tykání, ne vykání. Krátké věty.
- Žádné „dobrá práce!" pochvalování. Bez emoji v textu.
- Vtip ano, dětinskost ne.

## 3. Color tokens

Paste into `/assets/style.css`:

```css
:root {
  /* Surfaces */
  --paper:        #F6F1E1;   /* warm cream, primary background */
  --paper-dim:    #ECE5D2;   /* slightly darker cream, for cards/sections */
  --paper-grid:   rgba(19, 26, 42, 0.055); /* the faint grid lines on paper */

  /* Ink (text, lines, diagrams) */
  --ink:          #131A2A;   /* fountain-pen ink, primary text + diagram strokes */
  --ink-soft:     #3D4B66;   /* secondary text, captions */
  --ink-faint:    #8997AE;   /* tertiary, axis labels, fine print */

  /* Accents — use sparingly, like real highlighters */
  --highlight:    #D6F500;   /* acid lime — highlighter behind key terms, hot interactive state */
  --highlight-ink:#131A2A;   /* text color on highlight (always ink) */
  --marker:       #E85D3D;   /* warm coral — warnings, "pozor", important callouts */
  --chalk:        #F8FBFF;   /* near-white — chalk lines on dark surfaces, only for inversions */

  /* Diagram supports */
  --construction: #B6BFD0;   /* dashed construction lines, secondary diagram elements */
  --diagram-ray:  #131A2A;   /* main rays/vectors */
  --diagram-aux:  #E85D3D;   /* alternative ray colors (incoming vs refracted) */
}
```

**Rules of use**
- Default page = `--paper` background, `--ink` text. Don't override unless you have a reason.
- `--highlight` (acid lime) is **a highlighter**, not a button color. Use it as a `background` strip behind 1–3 words of text per page, or as the *active* state of an interactive control. Never as a section background — it'd burn the page out.
- `--marker` (coral) is for **alarm and importance**: "Pozor", "Časté chyby" callouts, validation errors. One use per section, max.
- One accent dominates per page. If a lesson is highlight-heavy (lots of key terms), keep coral down to a single "Pozor" box, and vice versa.

## 4. Typography

### Fonts (Google Fonts, free, no build needed, **full Czech support**)

All three chosen fonts ship the **Latin Extended** subset, which covers every Czech diacritic (žščřěťďňáéíóúýů, both cases). Google Fonts uses unicode-range subsetting automatically — the browser only downloads `latin-ext` when needed, so leaving the URL without an explicit subset param is fine.

If you're paranoid about a CDN-side default change, pin the subset explicitly by appending `&text=...` (not recommended — bloats requests) or rely on the fact that the served CSS already includes `@font-face` rules with `unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, ...` for latin-ext. Verified for Fraunces, Bricolage Grotesque, and JetBrains Mono as of Google Fonts current.

**Always set `<html lang="cs">`** — it affects hyphenation, quote rendering, and screen-reader pronunciation.

In every page `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..900,0..100;1,9..144,300..900,0..100&family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Czech typography rules

- **Non-breaking space after single-letter prepositions** (`k`, `s`, `v`, `z`, `o`, `u`, `a`, `i`) — `v&nbsp;zrcadle`, not `v zrcadle`. Single-letter words must not end a line in Czech typography. Apply consistently in lesson copy.
- **Czech quote marks**: low-9 opening, high-9 closing → `„takhle"`. Not `"takhle"` (those are English). Use them in body copy and callouts.
- **Em-dash with hair spaces or just spaces** for parenthetical thoughts — like this — yes.
- **Numbers and units**: non-breaking space between value and unit: `650&nbsp;nm`, `35&nbsp;min`, `3&nbsp;·&nbsp;10⁸&nbsp;m/s`.
- **Decimal comma**, not point: `1,33` not `1.33`. (Exception: code, formulas where convention follows the math notation in use.)

```css
:root {
  --font-display: 'Fraunces', 'Iowan Old Style', Georgia, serif;
  --font-body:    'Bricolage Grotesque', 'Helvetica Neue', sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
}
```

### When to use what

- **Fraunces** — h1, h2, big example numbers ("01", "02"), occasional pulled-out quote or definition. **Always italic on h1.** Always tracked tight on display sizes (`letter-spacing: -0.02em`). Fraunces has a `SOFT` axis (0–100) and `opsz` axis — use `font-variation-settings: 'SOFT' 50, 'opsz' 144` for headlines to get the rounded-warm look without it becoming cute.
- **Bricolage Grotesque** — all body text, h3+, labels, buttons, navigation. Variable, so size-axis is automatic.
- **JetBrains Mono** — inline numeric values, code, axis labels in diagrams, variable definitions next to formulas. **Not** for prose.

### Scale (modular, base 1rem = 16px)

```css
:root {
  --fs-3xs:  0.6875rem;  /* 11px — fine print, diagram labels */
  --fs-2xs:  0.75rem;    /* 12px — captions */
  --fs-xs:   0.875rem;   /* 14px — small body, ui labels */
  --fs-sm:   1rem;       /* 16px — secondary body */
  --fs-md:   1.125rem;   /* 18px — primary body (default) */
  --fs-lg:   1.375rem;   /* 22px — lead paragraph */
  --fs-xl:   1.75rem;    /* 28px — h3 */
  --fs-2xl:  2.5rem;     /* 40px — h2 */
  --fs-3xl:  4rem;       /* 64px — h1 */
  --fs-display: clamp(3rem, 8vw, 6.5rem); /* huge editorial moments */
}

body {
  font-family: var(--font-body);
  font-size: var(--fs-md);
  line-height: 1.55;
  color: var(--ink);
  background: var(--paper);
}

h1 {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: var(--fs-3xl);
  line-height: 0.95;
  letter-spacing: -0.025em;
  font-variation-settings: 'SOFT' 50, 'opsz' 144;
  text-wrap: balance;
}

h2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--fs-2xl);
  line-height: 1.05;
  letter-spacing: -0.02em;
  font-variation-settings: 'SOFT' 30, 'opsz' 96;
}

h3 {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: var(--fs-xl);
  line-height: 1.2;
  letter-spacing: -0.01em;
}
```

### Highlighter underline (for key terms in prose)

```html
<p>... vlnová délka <span class="hl">λ</span> a frekvence <span class="hl">f</span>...</p>
```

```css
.hl {
  background: linear-gradient(180deg, transparent 55%, var(--highlight) 55%, var(--highlight) 92%, transparent 92%);
  padding: 0 0.15em;
  color: var(--highlight-ink);
  font-weight: 500;
}
```

This looks like a real highlighter swipe, not a button. Use sparingly: 3–6 highlights per lesson, not per paragraph.

## 5. Spacing, layout, grid

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;

  --measure: 68ch;       /* readable column width */
  --page-max: 1240px;    /* max content width */
  --radius-sm: 4px;
  --radius:   8px;
  --radius-lg: 16px;
}
```

### Page shell

Lesson pages have a **three-track grid**: a narrow left margin for marginalia/big numbers, the main column for prose and widgets, a narrow right margin that's mostly empty (visual breathing room — used occasionally for annotations).

```css
.lesson {
  display: grid;
  grid-template-columns:
    [margin-left] minmax(0, 1fr)
    [main-start] minmax(0, 68ch)
    [main-end] minmax(0, 0.5fr) [margin-right];
  column-gap: var(--space-6);
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-8) var(--space-5);
}

.lesson > * { grid-column: main; }
.lesson > .full-bleed { grid-column: margin-left / margin-right; }
.lesson > .margin-note { grid-column: margin-left; font-size: var(--fs-xs); color: var(--ink-soft); }
```

On viewport < 720px collapse to a single column with `--space-5` side padding. Widgets and SVG diagrams that are wider than the column go `full-bleed`.

## 6. Texture & atmosphere

The paper has a **dot grid**, very faint, in the background. This is what makes the lab-notebook feel work. It's CSS-only:

```css
body {
  background-color: var(--paper);
  background-image:
    radial-gradient(circle, var(--paper-grid) 1px, transparent 1px);
  background-size: 24px 24px;
  background-position: 0 0;
}
```

For a **stronger lab-notebook moment** (e.g. behind a diagram), swap to a square grid:
```css
.grid-bg {
  background-image:
    linear-gradient(to right, var(--paper-grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--paper-grid) 1px, transparent 1px);
  background-size: 8px 8px;
}
```

### Optional grain
On the body, layered SVG noise via `background-image`:
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.04;
  z-index: 100;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
}
```
Use grain on landing/index pages; skip on dense lesson pages so it doesn't muddy diagrams.

## 7. Component patterns

All of these are concrete and copy-paste-ready. When generating a lesson, **use these**, don't invent parallel versions.

### 7.1 Lesson header

```html
<header class="lesson-header">
  <p class="eyebrow"><span class="dot"></span> Fyzika · Optika</p>
  <h1>Světlo, lom a&nbsp;zrcadla</h1>
  <p class="lead">Co je světlo, proč se v&nbsp;jiném prostředí láme a&nbsp;jak vzniká obraz v&nbsp;zrcadle.</p>
  <dl class="meta">
    <div><dt>Úroveň</dt><dd>9. třída / SŠ</dd></div>
    <div><dt>Délka</dt><dd>35 min</dd></div>
  </dl>
</header>
```

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: var(--space-5);
}
.eyebrow .dot {
  display: inline-block; width: 8px; height: 8px;
  background: var(--marker); border-radius: 50%;
  vertical-align: middle; margin-right: var(--space-2);
}
.lesson-header h1 { margin: 0 0 var(--space-5) 0; }
.lead {
  font-size: var(--fs-lg); line-height: 1.4;
  color: var(--ink-soft);
  max-width: 50ch;
  text-wrap: balance;
}
.meta {
  display: flex; gap: var(--space-6);
  margin-top: var(--space-6);
  font-family: var(--font-mono); font-size: var(--fs-xs);
}
.meta dt { color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.05em; font-size: var(--fs-3xs); }
.meta dd { margin: 0; color: var(--ink); font-weight: 500; }
```

### 7.2 Big section heading with chapter number

```html
<section class="block">
  <h2 class="block-h">
    <span class="block-n">01</span>
    Co je vlastně světlo
  </h2>
  <p>Světlo je elektromagnetické vlnění...</p>
</section>
```

```css
.block { margin: var(--space-9) 0; }
.block-h {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-5);
  align-items: baseline;
  margin-bottom: var(--space-5);
}
.block-n {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: var(--fs-3xl);
  line-height: 0.9;
  color: var(--marker);
  font-variation-settings: 'SOFT' 80, 'opsz' 144;
}
```

### 7.3 Formula block

For KaTeX-rendered formulas. Wrap each display formula in a `.formula` block with the variable legend underneath:

```html
<figure class="formula">
  <div class="formula-eq">\[ n_1 \sin\alpha_1 = n_2 \sin\alpha_2 \]</div>
  <figcaption class="formula-legend">
    <span><code>n₁, n₂</code> — indexy lomu prostředí</span>
    <span><code>α₁, α₂</code> — úhly od kolmice</span>
  </figcaption>
</figure>
```

```css
.formula {
  margin: var(--space-6) 0;
  padding: var(--space-5) var(--space-6);
  background: var(--paper-dim);
  border-left: 3px solid var(--ink);
  border-radius: 0 var(--radius) var(--radius) 0;
}
.formula-eq {
  font-size: var(--fs-lg);
  text-align: center;
  padding: var(--space-3) 0;
}
.formula-legend {
  display: flex; flex-wrap: wrap; gap: var(--space-2) var(--space-5);
  margin-top: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--ink-soft);
}
.formula-legend code {
  font-family: var(--font-mono); /* explicit; some browsers default-style code */
  background: none; color: var(--ink); font-weight: 500;
}
```

### 7.4 Callouts: Pozor / Tip / Pamatuj

Three variants, sharing a base. **One callout per section, max.**

```html
<aside class="callout callout--warn">
  <p class="callout-tag">Pozor</p>
  <p>Úhly v Snellově zákoně se měří <span class="hl">od kolmice</span>, ne od povrchu.</p>
</aside>
```

```css
.callout {
  margin: var(--space-6) 0;
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius);
  background: var(--paper-dim);
}
.callout-tag {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 var(--space-2) 0;
}
.callout p:not(.callout-tag) { margin: 0; }

.callout--warn { border-left: 4px solid var(--marker); }
.callout--warn .callout-tag { color: var(--marker); }

.callout--tip { border-left: 4px solid var(--ink); }
.callout--tip .callout-tag { color: var(--ink); }

.callout--remember { border-left: 4px solid var(--highlight); background: linear-gradient(90deg, color-mix(in srgb, var(--highlight) 15%, var(--paper-dim)), var(--paper-dim) 30%); }
.callout--remember .callout-tag { color: var(--ink); }
```

### 7.5 Example card

Big chunky example number, ink rule above and below.

```html
<div class="example">
  <p class="example-n">Příklad 01</p>
  <p class="example-q">Vlnová délka červeného laseru je 650 nm. Jaká je jeho frekvence?</p>
  <details class="example-a">
    <summary>Ukázat řešení</summary>
    <div class="example-body">
      ...
    </div>
  </details>
</div>
```

```css
.example {
  margin: var(--space-6) 0;
  border-top: 2px solid var(--ink);
  border-bottom: 1px solid var(--ink-faint);
  padding: var(--space-5) 0;
}
.example-n {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: var(--fs-xl);
  margin: 0 0 var(--space-3) 0;
  font-variation-settings: 'SOFT' 60, 'opsz' 96;
}
.example-q { font-size: var(--fs-md); margin: 0 0 var(--space-4) 0; }
.example-a summary {
  cursor: pointer;
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--ink);
  border-radius: var(--radius);
  background: var(--paper);
  transition: background 120ms ease;
}
.example-a summary:hover { background: var(--highlight); }
.example-a[open] summary { background: var(--ink); color: var(--paper); }
.example-body { margin-top: var(--space-5); }
```

### 7.6 Interactive widget frame ("specimen card")

Interactive widgets are framed like lab specimens: corner tick marks, eyebrow label, footer with a tiny instruction.

```html
<figure class="widget" id="snell-demo">
  <p class="widget-tag">Interaktivní · 02</p>
  <div class="widget-stage">
    <!-- Preact widget mounts here -->
  </div>
  <figcaption class="widget-hint">Posuň úhel a sleduj, kdy paprsek přestane procházet.</figcaption>
</figure>
```

```css
.widget {
  position: relative;
  margin: var(--space-7) 0;
  padding: var(--space-6);
  background: var(--paper-dim);
  border-radius: var(--radius-lg);
  /* corner tick marks */
  background-image:
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink)),
    linear-gradient(var(--ink), var(--ink));
  background-position:
    0 0, 0 0,                /* top-left */
    100% 0, 100% 0,          /* top-right */
    0 100%, 0 100%,          /* bottom-left */
    100% 100%, 100% 100%;    /* bottom-right */
  background-size:
    14px 2px, 2px 14px,
    14px 2px, 2px 14px,
    14px 2px, 2px 14px,
    14px 2px, 2px 14px;
  background-repeat: no-repeat;
}
.widget-tag {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0 0 var(--space-4) 0;
}
.widget-stage {
  background: var(--paper);
  border-radius: var(--radius);
  padding: var(--space-5);
  min-height: 240px;
}
.widget-hint {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--ink-soft);
  margin-top: var(--space-3);
}
```

### 7.7 Static fallback + "open interactive" button

Per SPEC.md, complex widgets ship as inline SVG with a button to lazy-mount the Preact widget. The button is the universal trigger:

```html
<figure class="widget">
  <p class="widget-tag">Statický nákres · 03 · zobrazení v dutém zrcadle</p>
  <div class="widget-stage" data-widget="ConcaveMirror">
    <svg viewBox="0 0 600 300" class="static-diagram"> ... </svg>
    <div class="static-cases"> ... three labeled cases ... </div>
    <button class="open-interactive" type="button">
      Otevřít interaktivní verzi
      <span aria-hidden="true">→</span>
    </button>
  </div>
</figure>
```

```css
.open-interactive {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-5);
  padding: var(--space-3) var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: var(--ink);
  color: var(--paper);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform 80ms ease, background 120ms ease;
}
.open-interactive:hover {
  background: var(--marker);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0 var(--ink);
}
.open-interactive:active { transform: translate(0, 0); box-shadow: none; }
```

When pressed, the static SVG fades out, the Preact widget mounts in `.widget-stage`. The button is the affordance — give it weight.

### 7.8 Quiz card

```html
<div class="quiz">
  <p class="quiz-q"><span class="quiz-n">1</span> Která barva má větší vlnovou délku?</p>
  <ul class="quiz-options">
    <li><button data-correct="false">Modrá</button></li>
    <li><button data-correct="true">Červená</button></li>
    <li><button data-correct="false">Stejně</button></li>
  </ul>
</div>
```

```css
.quiz { margin: var(--space-6) 0; padding: var(--space-5) 0; border-top: 1px solid var(--ink-faint); }
.quiz-q { font-weight: 500; font-size: var(--fs-md); margin: 0 0 var(--space-4) 0; }
.quiz-n {
  display: inline-block; width: 1.8em; height: 1.8em;
  line-height: 1.8em; text-align: center;
  background: var(--ink); color: var(--paper);
  font-family: var(--font-mono); font-size: var(--fs-xs);
  border-radius: 50%; margin-right: var(--space-2);
}
.quiz-options { list-style: none; padding: 0; margin: 0; display: grid; gap: var(--space-2); }
.quiz-options button {
  width: 100%; text-align: left;
  padding: var(--space-3) var(--space-4);
  background: var(--paper); border: 1.5px solid var(--ink);
  border-radius: var(--radius); font: inherit; cursor: pointer;
  transition: background 100ms ease, transform 80ms ease;
}
.quiz-options button:hover { background: var(--highlight); transform: translateX(2px); }
.quiz-options button.correct { background: var(--highlight); border-color: var(--ink); }
.quiz-options button.wrong { background: color-mix(in srgb, var(--marker) 25%, var(--paper)); border-color: var(--marker); }
```

### 7.9 "Co si odnést" closing block

Every lesson ends with this. Always.

```html
<section class="takeaway">
  <p class="takeaway-tag">Co si odnést</p>
  <ol>
    <li>Světlo je elektromagnetické vlnění — barva odpovídá frekvenci.</li>
    <li>Při přechodu do hustšího prostředí se paprsek láme ke kolmici.</li>
    ...
  </ol>
</section>
```

```css
.takeaway {
  margin-top: var(--space-9);
  padding: var(--space-6);
  background: var(--ink);
  color: var(--paper);
  border-radius: var(--radius-lg);
}
.takeaway-tag {
  font-family: var(--font-display);
  font-style: italic;
  font-size: var(--fs-xl);
  color: var(--highlight);
  margin: 0 0 var(--space-4) 0;
  font-variation-settings: 'SOFT' 80, 'opsz' 96;
}
.takeaway ol {
  padding-left: var(--space-5);
  display: grid; gap: var(--space-3);
}
.takeaway li::marker { color: var(--highlight); font-family: var(--font-mono); font-weight: 600; }
```

## 8. Diagrams (SVG conventions)

Diagrams are first-class — for math and physics they often carry the meaning more than text. Treat them like real lab diagrams.

- **Stroke**: 2px ink for primary lines, 1.5px for secondary, 1px dashed for construction/auxiliary
- **Color**: `--ink` for main, `--diagram-aux` (coral) for "other ray" / contrast, `--construction` for dashed aids, `--highlight` for the *current state* / animated element
- **Labels**: JetBrains Mono, `--fs-2xs`, in `--ink`. Place with `<text>` not HTML — keeps SVG self-contained.
- **Arrows**: end with a chunky filled triangle, never a thin V. Define one shared `<marker>` per file.
- **Dashed construction lines**: `stroke-dasharray="4 4"` for short dashes, `"8 6"` for longer.
- **Grid background inside diagrams**: include the same 8px grid (very faint) for a lab-notebook feel.

Standard arrow marker (paste once per diagram):
```html
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink, #131A2A)"/>
  </marker>
</defs>
```

## 9. Motion

Restraint over spectacle. Three sanctioned motion patterns:

### Page-load stagger
On first load, the header reveals top-down: eyebrow → h1 → lead → meta. Single, satisfying intro.

```css
@keyframes rise {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.lesson-header > * {
  animation: rise 480ms cubic-bezier(.2,.7,.2,1) both;
}
.lesson-header .eyebrow { animation-delay: 0ms; }
.lesson-header h1       { animation-delay: 80ms; }
.lesson-header .lead    { animation-delay: 200ms; }
.lesson-header .meta    { animation-delay: 320ms; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

### Highlighter swipe (optional, first paragraph only)
Animate the `.hl` background-gradient width from 0 to 100% over ~300ms on intersection.

### Button press
Buttons translate -1/-1 px on hover with a 2/2 px ink shadow, snap back on active. That's it. No bounce.

## 10. Iconography & illustrations

- **No icon library.** No Lucide, no Phosphor, no Feather. They contaminate the aesthetic.
- For UI affordances (next, expand, etc.), use **Unicode arrows** in display font: `→ ← ↑ ↓ ✓ ✗`. Sized via `font-size`.
- For lesson content, use **custom inline SVG**. When generating, draw the simplest possible diagram with `--ink` strokes and the diagram conventions above.
- Decorative illustrations (header art, landing-page hero): chunky geometric SVG in 2–3 colors max from the palette. Optional risograph-style **misregistration**: duplicate a shape, offset by 2–4px, set one copy to `--marker` and one to `--ink`, multiply blend.

## 11. Landing / index page

The landing page is the "cover of the magazine" — it can break rules the interior obeys. Bigger type, asymmetric layout, more decorative SVG. Each subject (Matematika, Fyzika, Obecné) gets a card; cards can use slightly different accent emphasis but stick to the same palette.

```css
.subject-card {
  display: flex; flex-direction: column;
  padding: var(--space-6);
  background: var(--paper-dim);
  border-radius: var(--radius-lg);
  text-decoration: none; color: var(--ink);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.subject-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--ink);
}
.subject-card h3 {
  font-family: var(--font-display); font-style: italic;
  font-size: var(--fs-2xl); margin: 0 0 var(--space-3) 0;
  font-variation-settings: 'SOFT' 80, 'opsz' 144;
}
```

## 12. Accessibility minimums

- All text must hit **4.5:1 contrast** against its background. Verified pairs that pass:
  - `--ink` on `--paper`: ✅ ~15.8:1
  - `--ink` on `--paper-dim`: ✅ ~14.4:1
  - `--ink` on `--highlight`: ✅ ~14.2:1
  - `--paper` on `--ink`: ✅ ~15.8:1
  - `--ink-soft` on `--paper`: ✅ ~7.1:1
- **Never put text directly on `--marker`** — coral on cream fails. Use it only as a border or background for *icons/dots*.
- Every interactive widget must have a keyboard-accessible alternative or fallback.
- All SVG diagrams need an `aria-label` or `<title>`.
- Respect `prefers-reduced-motion` (snippet above).
- Focus states: `outline: 2px solid var(--marker); outline-offset: 3px;` on all interactive elements.

## 13. DOs and DON'Ts (cheat sheet)

| ✅ DO | ❌ DON'T |
|---|---|
| Use `--ink` on `--paper` as default | Use white backgrounds |
| One highlighter, one coral per section | Sprinkle accents everywhere |
| Big display italic numbers for examples | Number with `1.`, `2.` plain ordering |
| Frame widgets as specimen cards with corner ticks | Float widgets bare in the prose |
| Hand-feel inline SVG diagrams | Stock icons or emoji as content |
| JetBrains Mono for any numeric value next to text | Body font for variable names and units |
| Italic Fraunces for `<h1>` always | Bold sans for headlines |
| Bottom dark "Co si odnést" on every lesson | End with a lonely paragraph |
| Highlighter as background of 1–3 words | Highlighter as section background |
| Static-fallback for complex widgets | Ship a half-working interactive |
| Light dot-grid background body-wide | Solid flat paper-color body |
| Marginalia in left margin for hints/asides | Inline parenthesticals for everything |

## 14. File expectations

- All CSS variables defined in `/assets/style.css` once.
- One stylesheet, no per-lesson CSS files unless a widget genuinely demands it (rare — prefer component-scoped styles inside the component module).
- Google Fonts `<link>` in every lesson `<head>` (cheap, cached cross-page).
- No CSS framework. No Tailwind. No Bootstrap. No utility classes beyond what's defined here.
