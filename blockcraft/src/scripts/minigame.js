/* ═══════════════════════════════════════════════════════════════
   ANCIENT EXCAVATION — the mini-game
   One Amulet is buried in the grid. Every block you break reports
   its Chebyshev distance to the Amulet, so two or three digs are
   enough to triangulate it if you read them properly.
   Balance lives in MINIGAME in src/config/site.config.js
   ═══════════════════════════════════════════════════════════════ */

import { MINIGAME } from '../config/site.config.js';
import { iconEl } from './icon.js';

const WON_KEY = 'blockcraft-amulet-v1';

export function initMinigame({ onWin } = {}) {
  const wrap = document.getElementById('mg-wrap');
  if (!wrap) return null;

  const gridEl  = document.getElementById('mg-grid');
  const swingEl = document.getElementById('mg-swings');
  const scoreEl = document.getElementById('mg-score');
  const msgEl   = document.getElementById('mg-msg');
  const againEl = document.getElementById('mg-again');
  const closeEl = document.getElementById('mg-close');

  const { cols, rows, swings: MAX } = MINIGAME;
  const total = cols * rows;

  let cells = [];      // { kind, ore, revealed, dist }
  let amuletAt = 0;
  let swingsLeft = MAX;
  let score = 0;
  let status = 'playing';

  const alreadyWon = () => {
    try { return localStorage.getItem(WON_KEY) === '1'; } catch { return false; }
  };
  const rememberWin = () => {
    try { localStorage.setItem(WON_KEY, '1'); } catch { /* ignore */ }
  };

  /* ── board ──────────────────────────────────────────────── */
  function seed() {
    cells = Array.from({ length: total }, () => ({ kind: 'stone', revealed: false }));

    // every index except the one the Amulet takes
    const free = Array.from({ length: total }, (_, i) => i);
    for (let i = free.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [free[i], free[j]] = [free[j], free[i]];
    }

    amuletAt = free.pop();
    cells[amuletAt].kind = 'amulet';

    for (const ore of MINIGAME.ores) {
      for (let n = 0; n < ore.weight && free.length; n++) {
        const at = free.pop();
        cells[at].kind = 'ore';
        cells[at].ore = ore;
      }
    }

    swingsLeft = MAX;
    score = 0;
    status = 'playing';
  }

  // Chebyshev — diagonal counts as one, which is how "blocks away"
  // reads on a grid you can dig in eight directions
  function distanceTo(i) {
    const ax = amuletAt % cols, ay = Math.floor(amuletAt / cols);
    const bx = i % cols,        by = Math.floor(i / cols);
    return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
  }

  /* ── render ─────────────────────────────────────────────── */
  function build() {
    gridEl.style.setProperty('--mg-cols', cols);
    gridEl.replaceChildren();

    cells.forEach((cell, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mg-cell';
      b.dataset.i = i;
      b.setAttribute('aria-label', `Block ${i + 1}`);
      b.addEventListener('click', () => dig(i));
      gridEl.appendChild(b);
    });
    paint();
  }

  function paint() {
    [...gridEl.children].forEach((b, i) => {
      const cell = cells[i];
      b.className = 'mg-cell';
      b.replaceChildren();
      b.disabled = status !== 'playing' || cell.revealed;

      if (!cell.revealed) return;

      b.classList.add('dug');
      if (cell.kind === 'amulet') {
        b.classList.add('amulet');
        b.appendChild(iconEl(MINIGAME.amulet.icon));
      } else if (cell.kind === 'ore') {
        b.classList.add('ore');
        if (cell.ore.key === 'magma') b.classList.add('magma');
        b.appendChild(iconEl(cell.ore.icon));
      } else {
        const n = document.createElement('span');
        n.className = 'mg-dist heat-' + Math.min(cell.dist, 4);
        n.textContent = cell.dist;
        b.appendChild(n);
      }
    });

    swingEl.textContent = Math.max(0, swingsLeft) + ' / ' + MAX;
    scoreEl.textContent = score;
    againEl.hidden = status === 'playing';
  }

  function say(text, tone) {
    msgEl.textContent = text;
    msgEl.className = 'mg-msg' + (tone ? ' ' + tone : '');
  }

  /* ── play ───────────────────────────────────────────────── */
  function dig(i) {
    if (status !== 'playing') return;
    const cell = cells[i];
    if (cell.revealed) return;

    cell.revealed = true;

    if (cell.kind === 'amulet') {
      status = 'won';
      paint();
      say(MINIGAME.copy.win, 'win');
      rememberWin();
      onWin?.(MINIGAME.advancement);
      return;
    }

    const cost = cell.kind === 'ore' ? cell.ore.cost : 1;
    swingsLeft -= cost;

    if (cell.kind === 'ore') {
      score += cell.ore.xp;
      say(
        cell.ore.key === 'magma'
          ? `${cell.ore.name} — that cost you an extra swing.`
          : `${cell.ore.name} +${cell.ore.xp} XP`,
        cell.ore.key === 'magma' ? 'bad' : 'good'
      );
    } else {
      cell.dist = distanceTo(i);
      say(cell.dist === 1 ? 'One block away. It is humming.' : `${cell.dist} blocks away.`);
    }

    if (swingsLeft <= 0) {
      status = 'lost';
      cells[amuletAt].revealed = true;   // show where it was
      paint();
      say(MINIGAME.copy.lose, 'bad');
      return;
    }
    paint();
  }

  function reset() {
    seed();
    build();
    say(MINIGAME.copy.idle);
  }

  /* ── open / close ───────────────────────────────────────── */
  const isOpen = () => !wrap.hidden;

  function open() {
    if (isOpen()) return;
    if (status !== 'playing' || swingsLeft === MAX) reset();
    wrap.hidden = false;
    wrap.classList.add('on');
  }

  function close() {
    wrap.hidden = true;
    wrap.classList.remove('on');
  }

  againEl.addEventListener('click', reset);
  closeEl.addEventListener('click', close);
  wrap.querySelector('.mg-scrim').addEventListener('click', close);

  reset();
  if (alreadyWon()) say('You have already claimed the Amulet — dig again for a better score.');

  return { open, close, isOpen, hasWon: alreadyWon };
}
