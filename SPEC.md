# School Materials — Interactive Static Site

## Goal
A collection of small, static, interactive pages that explain school topics — math formulas, physics demos, general concept widgets/quizzes. Each page is a focused mini-lesson the reader can poke at (sliders, animations, "try it" inputs), not a passive doc.

## Hard constraints
- Hosted on **GitHub Pages**, served from the repo root (or `/docs`) on the default branch.
- **No CI / no GitHub Actions workflow.** Push to main = published.
- **No local build step.** What's in the repo is what ships. Edits are plain text files; refresh the browser to see them.
- Modern browsers only (ES2022, native ES modules). No IE / old-Safari support.
- **Content language: Czech.** All lesson text, headings, UI labels, button copy, and quiz prompts are written in Czech. Code identifiers and file/folder names stay in English. Set `<html lang="cs">` on every page.

## Stack

### Runtime (in the browser)
- **Preact** + **htm** via `esm.sh` — component model with JSX-like template literal syntax, no compile step.
  - `import { h, render } from 'https://esm.sh/preact@10'`
  - `import htm from 'https://esm.sh/htm@3'`
  - `const html = htm.bind(h)`
- **KaTeX** via CDN for math rendering (faster than MathJax, ships CSS+fonts).
- **p5.js** via CDN for physics / canvas simulations — beginner-friendly, well-documented, good for the "school material" vibe.
- **Plain CSS**, one shared stylesheet. Optionally a tiny classless framework (e.g. Pico.css) for sane defaults — decide after the first 2–3 pages.

### Why this combo
- Preact + htm gives reusable components (a `<Quiz>`, a `<Slider>`, a `<PhysicsCanvas>`) without TypeScript, Vite, or any compilation. The price is template-literal syntax instead of real JSX — a minor cost.
- esm.sh handles dependency resolution and version pinning in the import URL. Pin exact versions (`preact@10.19.3`, not `preact@10`) so a CDN-side change can't silently break a page.
- KaTeX + p5.js cover the listed subject areas (math + physics + general widgets) without any heavy framework.

### Explicitly not using
- ❌ Vite / Webpack / Parcel — would require a build step.
- ❌ React — heavier and Preact covers the use case.
- ❌ TypeScript — would require compilation. Use JSDoc types if type hints help.
- ❌ Tailwind — JIT requires a build. Hand-rolled CSS scales fine here.
- ❌ A SPA router — each lesson is its own HTML page. Browser navigation = page navigation. Simpler, deep-linkable, prints well.

## Repo layout

```
/
├── index.html                  # landing page: index of topics
├── .nojekyll                   # disable Jekyll processing on GH Pages
├── assets/
│   ├── style.css               # shared styles
│   └── img/                    # static images, diagrams
├── lib/
│   ├── components.js           # shared Preact components (Quiz, Slider, MathBlock, ...)
│   ├── katex-setup.js          # KaTeX auto-render config
│   └── preact.js               # re-exports h, render, html (so pages import one thing)
├── preparations/               # teacher's source briefs (Czech), input to generation
│   ├── _template.md            # skeleton for new lesson preps
│   ├── math/
│   │   └── pythagoras.md
│   └── physics/
│       └── pendulum.md
├── topics/                     # generated lessons, what GH Pages serves
│   ├── math/
│   │   ├── pythagoras/
│   │   │   └── index.html      # one lesson = one folder = one HTML file
│   │   └── derivatives/
│   │       └── index.html
│   ├── physics/
│   │   └── pendulum/
│   │       └── index.html
│   └── general/
│       └── ...
└── SPEC.md
```

Each lesson is a self-contained `index.html` that:
1. Loads `/assets/style.css` and `/lib/preact.js`.
2. Imports any components it needs from `/lib/components.js`.
3. Mounts interactive widgets into specific DOM nodes.
4. Otherwise is just HTML — headings, paragraphs, diagrams.

URLs end up clean: `https://<user>.github.io/<repo>/topics/math/pythagoras/`.

## Authoring workflow

Two-tier authoring: a Markdown **preparation** captures the teacher's intent; the **lesson HTML** is generated from it by Claude. The HTML is what ships.

1. Teacher creates `preparations/<subject>/<lesson>.md` from `preparations/_template.md` and fills it in (Czech).
2. Teacher iterates on the prep alone until happy with the plan.
3. Teacher asks Claude: *"vygeneruj lekci z `preparations/<subject>/<lesson>.md`"*.
4. Claude reads the prep + this spec + `CLAUDE.md`, then writes `topics/<subject>/<lesson>/index.html` with Czech text, KaTeX math, and the requested Preact widgets mounted.
5. Teacher previews locally (any static server, e.g. `python3 -m http.server`), tweaks the HTML directly if needed.

**Source-of-truth rule:** once generated, **the HTML is authoritative.** Hand-edits to the HTML are normal and won't be clobbered. The prep is a planning doc, not a strict mirror. For major revisions, update the prep and regenerate fresh — accept that hand-edits will be lost when you do.

**Prep doc shape** (see `_template.md`):
- Front matter: `úroveň`, `předmět`, `předpoklady`, `délka` (odhad v minutách)
- Sections: *Učební cíle*, *Klíčové pojmy*, *Příklady* (kolik, jaký typ), *Interaktivní prvky* (které widgety: posuvník / kvíz / simulace), *Časté chyby*

The prep is a brief, not a script. It says *what to teach and what kinds of examples/widgets to include*, not the exact prose — Claude writes the prose.

## Conventions

- **One lesson per folder**, named `index.html` so the URL is the folder.
- **Components live in `/lib/components.js`.** A component graduates to shared once it's used twice.
- **Pin CDN versions** in import URLs. Centralize them in `/lib/preact.js` so a version bump is one edit.
- **No inline `<script>` for logic** beyond a single mount call — keep logic in `.js` files so it's reusable and grep-able.
- **Progressive enhancement**: lesson text should be readable even if JS fails to load. Interactive widgets sit alongside, not instead of, the explanation.

## Tooling map (pick the right library per lesson type)

Default: **compute geometry in JS, render with SVG.** That's enough for most math and optics. Reach for an engine only when the physics genuinely needs one (rigid bodies, particle systems).

| Lesson type | Recommended approach |
|---|---|
| **Optics** (lenses, mirrors, refraction, prisms) | Computed geometry + SVG. Formulas: `1/a + 1/a' = 1/f`, Snell, principal-ray rules. No engine. |
| **Wave / oscillation** (sound, light spectrum, simple harmonic motion) | Computed paths + SVG. If animated, `requestAnimationFrame` is plenty. |
| **Mechanics** (collisions, gravity, springs, pendulums, projectile motion, levers) | **Matter.js** via CDN. Rigid-body engine, handles forces / constraints / collisions out of the box. |
| **Particle systems, fluids, generative visuals** | **p5.js** via CDN. Fast canvas, friendly API. |
| **Interactive geometry** (constructions, drag points) | Computed SVG. For heavier needs: **JSXGraph** via CDN. |
| **Math graphs and plots** | Computed SVG for simple cases; **Plotly** or **Chart.js** if you need axes/legends polished. |

**Why no engine for optics:** thin-mirror / thin-lens problems reduce to a few lines of arithmetic. An engine adds weight, contaminates the visual language, and obscures the physics you're teaching. Compute it.

**Why an engine for mechanics:** writing collision detection, integrator step, constraint solver from scratch is days of work and easy to get wrong. Matter.js does it.

Always prefer the simplest tool that works. If a slider + computed SVG is enough, stop there.

## Lesson style (applies to every generated lesson)

These are universal rules — prep docs shouldn't repeat them. Subject-specific conventions can override later in a future `preparations/<subject>/_conventions.md`.

- **Tón**: věcný, ale přátelský. Krátké věty. Občas analogie ze života, ne ale za každou cenu.
- **Vzorce**: KaTeX. Vždy uvést všechny proměnné v krátkém popisu **pod** vzorcem.
- **Úvod widgetu**: každý interaktivní prvek má jednu instruktážní větu nad sebou (např. *„Posuň úhel a sleduj, kdy paprsek přestane procházet."*).
- **Závěr lekce**: krátké shrnutí *„Co si odnést"* ve 4–5 odrážkách.
- **Tahák**: pod *„Co si odnést"* další blok *„Tahák"* — kompaktní přehled **všech vzorců** a **top pojmů** v lekci k rychlému opakování / nahlížení. Vizuálně **méně výrazný** než *„Co si odnést"* (světlé pozadí `--paper-dim`, drobné písmo, hutná mřížka). Sekce: *Vzorce* (grid s formulkou + krátkým popisem), *Klíčové pojmy* (odrážky), případně další jako *Postup* nebo *Konvence*. Žádný nový obsah — jen sběr klíčových věcí v jednom místě.
- **Static-fallback pro složité widgety**: pokud by interaktivní nákres byl nepřiměřeně složitý na první iteraci, vyrob **inline SVG statický nákres** (typicky 2–3 reprezentativní případy s popisky) plus tlačítko *„Otevřít interaktivní verzi"*, které lazy-mountne plnou Preact komponentu na místo SVG. Lekce zůstává plnohodnotná i bez interaktivity.
- **Jednotky a notace**: SI jednotky, desetinná čárka (česká konvence), exponenty přes `^` v KaTeX. Vektory v matematice/fyzice tučně nebo šipkou — drž se jedné konvence v rámci lekce.

## Deployment

1. In repo Settings → Pages: source = `main` branch, folder = `/` (root).
2. Add a `.nojekyll` file at the root.
3. Push. Done.

First publish takes ~1 minute. Subsequent pushes are near-instant.

## Open questions (decide as we go, not upfront)
- Custom domain? Add a `CNAME` file if so.
- Light/dark theme? Probably yes, via `prefers-color-scheme`.
- Search across lessons? Skip until there are >10 lessons; then a tiny client-side index (Lunr or similar from CDN).
- English version of lessons? Start Czech-only; add an `/en/` mirror only if there's a real need.

## First milestone
Build one lesson in each subject area to validate the stack:
1. `topics/math/pythagoras/` — interactive triangle, KaTeX equation, slider for sides.
2. `topics/physics/pendulum/` — p5.js sim with length/gravity sliders.
3. `topics/general/binary-quiz/` — multiple-choice quiz component.

If all three feel pleasant to write, the stack is right. If any feels painful, revise this spec before adding more lessons.
