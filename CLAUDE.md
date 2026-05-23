# Project notes for Claude

See `SPEC.md` for the full project spec. Highlights to keep in mind every session:

## Content language
- **All user-facing content is in Czech.** Lesson text, headings, paragraphs, UI labels, buttons, quiz prompts, error messages, alt text — everything the reader sees is Czech.
- **Code stays in English.** Identifiers, function names, variable names, file names, folder names, CSS classes, commit messages, and code comments are English.
- Every HTML page sets `<html lang="cs">`.
- When generating example lesson content, write it in Czech directly — do not write English and translate later.

## Stack reminders
- No build step. No CI. Plain HTML + ES modules from `esm.sh`. Pin exact versions in CDN URLs.
- Preact + htm for components, KaTeX for math, p5.js for physics sims.
- One lesson = one folder = one `index.html`. URLs are the folder paths.

## Follow the design system
- **Before writing any HTML or CSS, consult `DESIGN_SYSTEM.md`.** It defines the aesthetic, color tokens, fonts, spacing, component patterns (formula block, callout, example card, widget frame, quiz, takeaway), motion, and Czech-typography rules.
- Use the CSS variables and class names from `DESIGN_SYSTEM.md` — they already exist in `/assets/style.css`. Don't invent parallel styling.
- Don't reinterpret the aesthetic on each lesson. The look should be cohesive across every page.
- For Czech text, apply the typography rules: `&nbsp;` after single-letter prepositions (`k`, `s`, `v`, `z`, `o`, `u`, `a`, `i`), Czech low/high quotes „takhle", decimal comma, `&nbsp;` between value and unit.

## Generating a lesson from a preparation
When the user asks to generate a lesson from a prep file (e.g. *"vygeneruj lekci z `preparations/math/pythagoras.md`"*):
1. Read the prep doc — it's the brief, not the script. It tells you the goals, key concepts, kind of examples, and which widgets to include.
2. Read `SPEC.md` for stack/layout conventions if not already in context.
3. Write `topics/<subject>/<lesson>/index.html` (create the folder). Czech prose. `<html lang="cs">`. Import shared components from `/lib/`. Mount widgets requested by the prep.
4. Don't invent widgets that don't exist in `/lib/components.js` — either reuse what's there or add a new component to the shared lib and use it.
5. If the prep is ambiguous or under-specified, make a reasonable call in Czech and note in the chat what you decided; don't pepper the page with TODOs.
6. **Do not edit the prep doc as part of generation.** The prep is the teacher's; the HTML is yours to produce.
7. Regeneration overwrites the HTML. Warn the user before regenerating if the existing HTML has hand-edits (check git status / diff).
