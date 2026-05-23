/**
 * Shared Preact components used across lessons.
 *
 * A component graduates to this file when it's used by a second lesson.
 * For now this is empty scaffolding — actual components arrive with the first lesson.
 *
 * Convention: components produce DOM matching the classes defined in /assets/style.css
 * (e.g. .quiz, .quiz-options) so styling stays centralized.
 */

import { html, useState } from './preact.js';

/**
 * Tiny example component — kept here as a working placeholder so the module
 * is importable and the build path is verified end-to-end. Replace or extend
 * once real lessons start landing.
 */
export function HelloProbe() {
  const [pressed, setPressed] = useState(false);
  return html`
    <button
      class="open-interactive"
      onClick=${() => setPressed(p => !p)}
    >
      ${pressed ? 'Stisknuto' : 'Stiskni mě'}
      <span aria-hidden="true">→</span>
    </button>
  `;
}
