/* ═══════════════════════════════════════════════════════════════
   BLOCKCRAFT — state machine
   Everything configurable lives in src/config/site.config.js
   ═══════════════════════════════════════════════════════════════ */

import gsap from 'gsap';
import { ICONS, SCREENS, SETTINGS, SITE, TOTAL_SECTIONS } from '../config/site.config.js';
import { paintIcon } from './icon.js';
import { initMinigame } from './minigame.js';

const STORE_KEY = 'blockcraft-progress-v1';

export function initApp() {
  const stage = document.getElementById('stage');
  if (!stage) return;

  const $ = (s) => document.querySelector(s);
  const hotbar   = $('#hotbar');
  const hbLabel  = $('#hb-label');
  const heartsEl = $('#hearts');
  const hungerEl = $('#hunger');
  const xpFill   = $('#xp-fill');
  const xpLevel  = $('#xp-level');
  const dim      = $('#dim');
  const toast    = $('#toast');
  const toastIco = $('#toast-ico');
  const toastName= $('#toast-name');
  const tooltip  = $('#tooltip');
  const tipName  = $('#tip-name');
  const tipLore  = $('#tip-lore');
  const tipMeta  = $('#tip-meta');
  const f3       = $('#f3');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let sel = 0;
  let current = null;
  let f3On = false;
  const level = { v: 0 };

  /* ── progress ───────────────────────────────────────────── */
  let visited = new Set();
  if (SETTINGS.saveProgress) {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      if (Array.isArray(saved)) visited = new Set(saved);
    } catch { /* first run */ }
  }
  const persist = () => {
    if (!SETTINGS.saveProgress) return;
    try { localStorage.setItem(STORE_KEY, JSON.stringify([...visited])); } catch { /* ignore */ }
  };

  /* ── splash text ────────────────────────────────────────── */
  const splashEl = $('#splash-text');
  if (splashEl) {
    const pick = SITE.splashes[Math.floor(Math.random() * SITE.splashes.length)];
    splashEl.textContent = pick;
    if (!reduced) {
      gsap.to(splashEl, {
        scale: 1.08, duration: .55, repeat: -1, yoyo: true, ease: 'sine.inOut'
      });
    }
  }

  /* ── hearts & hunger ────────────────────────────────────── */
  for (let i = 0; i < SETTINGS.maxHearts; i++) {
    const h = document.createElement('span');
    h.className = 'pip';
    paintIcon(h, ICONS.heart);
    heartsEl.appendChild(h);

    const g = document.createElement('span');
    g.className = 'pip';
    paintIcon(g, ICONS.hunger);
    hungerEl.appendChild(g);
  }
  const hungerPips = [...hungerEl.children];

  /* Hunger depletes as you explore — a small joke, and it gives
     the HUD something to do besides sit there. */
  function setHunger(n) {
    const used = Math.min(SETTINGS.maxHearts, n);
    hungerPips.forEach((p, i) => {
      p.classList.toggle('off', i >= SETTINGS.maxHearts - used);
    });
  }

  /* ── XP ─────────────────────────────────────────────────── */
  function setXP(n, animate = true) {
    const ratio = TOTAL_SECTIONS ? n / TOTAL_SECTIONS : 0;
    const lvl = Math.round(ratio * 30);
    const pct = (ratio * 100) % 100;

    if (!animate || reduced) {
      xpFill.style.width = (ratio >= 1 ? 100 : pct) + '%';
      xpLevel.textContent = lvl;
      level.v = lvl;
      return;
    }
    gsap.to(xpFill, { width: (ratio >= 1 ? 100 : pct) + '%', duration: .7, ease: 'power3.out' });
    gsap.to(level, {
      v: lvl, duration: .7, ease: 'power2.out',
      onUpdate: () => { xpLevel.textContent = Math.round(level.v); }
    });
    if (!reduced) {
      gsap.fromTo(xpLevel, { scale: 1.5 }, { scale: 1, duration: .4, ease: 'back.out(2)' });
    }
  }

  /* ── hotbar ─────────────────────────────────────────────── */
  const slots = [...hotbar.querySelectorAll('.hb-slot')];

  slots.forEach((s, i) => {
    s.addEventListener('mouseenter', () => {
      hbLabel.textContent = s.dataset.label;
      hbLabel.classList.add('on');
    });
    s.addEventListener('mouseleave', () => hbLabel.classList.remove('on'));
    s.addEventListener('click', () => { sel = i; go(s.dataset.id); });
  });

  function paintHotbar() {
    slots.forEach((s, i) => {
      s.classList.toggle('sel', i === sel);
      s.classList.toggle('done', visited.has(s.dataset.id));
    });
  }

  /* ── tooltips ───────────────────────────────────────────── */
  function bindTooltips() {
    document.querySelectorAll('[data-tip]').forEach((el) => {
      if (el.dataset.tipBound) return;
      el.dataset.tipBound = '1';

      el.addEventListener('mouseenter', () => {
        tipName.textContent = el.dataset.tip || '';
        tipLore.textContent = el.dataset.lore || '';
        tipMeta.textContent = el.dataset.meta || '';
        tooltip.classList.add('on');
      });
      el.addEventListener('mousemove', (e) => {
        const pad = 16;
        let x = e.clientX + pad;
        let y = e.clientY + pad;
        const r = tooltip.getBoundingClientRect();
        if (x + r.width > window.innerWidth) x = e.clientX - r.width - pad;
        if (y + r.height > window.innerHeight) y = e.clientY - r.height - pad;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });
      el.addEventListener('mouseleave', () => tooltip.classList.remove('on'));
    });
  }

  /* ── advancement toast ──────────────────────────────────── */
  function showToast(icon, name) {
    paintIcon(toastIco, icon);
    toastName.textContent = name;
    gsap.killTweensOf(toast);
    gsap.fromTo(toast,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: .5, ease: 'power3.out' });
    gsap.to(toast, { opacity: 0, y: -20, duration: .5, delay: 2.8, ease: 'power2.in' });
  }

  /* ── the dig site ───────────────────────────────────────── */
  const mg = initMinigame({
    onWin: (adv) => showToast(adv.icon, adv.name)
  });
  const mgOpen = () => !!mg && mg.isOpen();

  const openBtn = $('#mg-open');
  if (openBtn && mg) openBtn.addEventListener('click', () => mg.open());

  /* ── world clock ────────────────────────────────────────── */
  function tickWorld() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const day = Math.max(1, visited.size + 1);
    const el = $('#wi-time');
    if (el) el.textContent = `Day ${day} · ${hh}:${mm}`;
  }
  tickWorld();
  setInterval(tickWorld, 20000);

  /* ── F3 debug ───────────────────────────────────────────── */
  let fpsFrames = 0, fpsLast = performance.now();
  function fpsLoop(now) {
    fpsFrames++;
    if (now - fpsLast >= 1000) {
      const el = $('#f3-fps');
      if (el) el.textContent = fpsFrames + ' fps';
      fpsFrames = 0;
      fpsLast = now;
    }
    requestAnimationFrame(fpsLoop);
  }
  if (SETTINGS.enableF3) requestAnimationFrame(fpsLoop);

  function setF3(meta) {
    const [x, y, z] = meta.coords;
    const xyz = $('#f3-xyz');
    const blk = $('#f3-block');
    const bio = $('#f3-biome');
    if (xyz) xyz.textContent = `XYZ: ${x}.00 / ${y}.00 / ${z}.00`;
    if (blk) blk.textContent = `Block: ${x} ${y} ${z}`;
    if (bio) bio.textContent = `Biome: minecraft:${meta.biome.toLowerCase().replace(/\s+/g, '_')}`;
  }

  /* ── navigation ─────────────────────────────────────────── */
  function go(id) {
    const meta = SCREENS.find((s) => s.id === id);
    if (!meta || id === current) return;

    stage.dataset.screen = id;
    // where the machine panel sits — drives .screen alignment and the
    // directional scrim, both from `align` / `valign` in the config
    stage.dataset.align = meta.align || 'center';
    stage.dataset.valign = meta.valign || 'center';
    sel = SCREENS.findIndex((s) => s.id === id);

    document.querySelectorAll('.plate').forEach((p) => {
      const on = p.dataset.id === id;
      p.classList.toggle('on', on);
      const v = p.querySelector('video');
      if (v) { on && !reduced ? v.play().catch(() => {}) : v.pause(); }
    });

    // dim the world behind any open machine panel
    dim.classList.toggle('on', meta.machine !== 'title' && meta.machine !== 'credits');

    const outgoing = document.querySelector('.screen.on');
    const incoming = document.querySelector(`.screen[data-s="${id}"]`);
    if (outgoing && outgoing !== incoming) outgoing.classList.remove('on');
    if (incoming) {
      incoming.classList.add('on');
      const panel = incoming.querySelector('.gui, .book, .title-screen, .credits');
      if (panel && !reduced) {
        gsap.fromTo(panel,
          { opacity: 0, scale: .96, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: .3, ease: 'back.out(1.6)', overwrite: true });
      }
    }

    current = id;
    const bio = $('#wi-biome');
    if (bio) bio.textContent = meta.biome;
    setF3(meta);
    paintHotbar();
    bindTooltips();

    if (SETTINGS.progressionEnabled && meta.counts && !visited.has(id)) {
      visited.add(id);
      persist();
      setXP(visited.size);
      setHunger(visited.size);
      showToast(meta.item, meta.label);
    }

    // enchantment bars animate on entry
    if (id === 'skills' && incoming) {
      gsap.fromTo(incoming.querySelectorAll('.ench-fill'),
        { width: '0%' },
        { width: (i, el) => el.dataset.v + '%',
          duration: .8, stagger: .07, ease: 'power3.out', delay: .15, overwrite: true });
    }
  }

  /* ── buttons ────────────────────────────────────────────── */
  document.querySelectorAll('[data-go]').forEach((b) => {
    b.addEventListener('click', () => go(b.dataset.go));
  });

  /* ── keyboard ───────────────────────────────────────────── */
  window.addEventListener('keydown', (e) => {
    // the dig site swallows navigation while it is open, so digging
    // with the number row doesn't fling you to another screen
    if (mgOpen()) {
      if (e.key === 'Escape') { e.preventDefault(); mg.close(); }
      return;
    }
    if ((e.key === 'm' || e.key === 'M') && mg) {
      e.preventDefault();
      mg.open();
      return;
    }

    // 1-9 select hotbar slot
    if (e.key >= '1' && e.key <= '9') {
      const i = parseInt(e.key, 10) - 1;
      if (SCREENS[i]) { sel = i; go(SCREENS[i].id); }
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      sel = (sel + 1) % SCREENS.length;
      go(SCREENS[sel].id);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      sel = (sel - 1 + SCREENS.length) % SCREENS.length;
      go(SCREENS[sel].id);
    }
    if (e.key === 'Escape') go(SCREENS[0].id);
    if ((e.key === 'F3' || e.key === 'f3') && SETTINGS.enableF3) {
      e.preventDefault();
      f3On = !f3On;
      f3.classList.toggle('on', f3On);
    }
  });

  /* ── scroll wheel cycles the hotbar, like the real game ─── */
  let wheelLock = false;
  window.addEventListener('wheel', (e) => {
    if (mgOpen()) return;
    if (wheelLock) return;
    wheelLock = true;
    setTimeout(() => { wheelLock = false; }, 260);
    sel = e.deltaY > 0
      ? (sel + 1) % SCREENS.length
      : (sel - 1 + SCREENS.length) % SCREENS.length;
    go(SCREENS[sel].id);
  }, { passive: true });

  /* ── missing-frame detection ────────────────────────────── */
  document.querySelectorAll('.plate[data-src]').forEach((plate) => {
    if (plate.querySelector('video')) { plate.dataset.missing = 'false'; return; }
    const img = new Image();
    img.onload = () => {
      plate.style.backgroundImage = `url("${plate.dataset.src}")`;
      plate.dataset.missing = 'false';
    };
    img.onerror = () => { plate.dataset.missing = 'true'; };
    img.src = plate.dataset.src;
  });

  /* ── loading screen ─────────────────────────────────────── */
  const loading = $('#loading');
  const loadFill = $('#loading-fill');
  const dur = reduced ? 0.1 : SETTINGS.splashDuration;

  const counter = { v: 0 };
  gsap.to(counter, {
    v: 100, duration: dur, ease: 'power1.inOut',
    onUpdate: () => { if (loadFill) loadFill.style.width = Math.round(counter.v) + '%'; },
    onComplete: () => {
      if (!loading) return;
      gsap.to(loading, {
        opacity: 0, duration: .4,
        onComplete: () => loading.remove()
      });
    }
  });

  /* ── boot ───────────────────────────────────────────────── */
  if (SETTINGS.progressionEnabled && visited.size) {
    setXP(visited.size, false);
    setHunger(visited.size);
  } else {
    setXP(0, false);
  }

  paintHotbar();
  go(SCREENS[0].id);
  bindTooltips();
}
