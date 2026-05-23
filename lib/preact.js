/**
 * Centralized Preact + htm imports.
 * Pin exact versions here; every page imports from this module.
 */

export { h, render, Fragment, createRef } from 'https://esm.sh/preact@10.19.3';
export { useState, useEffect, useRef, useMemo, useCallback } from 'https://esm.sh/preact@10.19.3/hooks';
import htm from 'https://esm.sh/htm@3.1.1';
import { h as _h } from 'https://esm.sh/preact@10.19.3';

export const html = htm.bind(_h);
