/* ═══════════════════════════════════════════════════════════════
   ⚙️  WORLD CONFIG — edit this file, nothing else
   ═══════════════════════════════════════════════════════════════ */

export const SITE = {
  playerName: 'Sanjai',
  worldName: 'Sanjai Builds',
  worldSubtitle: 'Survival · Hard Mode',
  version: '1.0.0',

  metaTitle: 'Sanjai Builds — Portfolio',
  metaDescription: 'Full-stack developer, designer and AI creator. Cinematic web experiences from Tamil Nadu.',

  // splash text — one is picked at random, like the real title screen
  splashes: [
    'Also try Astro!',
    'Now with 100% more blocks!',
    'Built in Tamil Nadu!',
    'Shaders on!',
    'No creepers were harmed!',
    'Diamonds below y=16!',
    'It\'s dangerous to go alone!'
  ],

  startXP: 1,
  startLevel: 0
};

/* ── SCREENS ───────────────────────────────────────────────────
   Slot order = hotbar order = keyboard 1-9
   `machine` decides which UI panel renders on that screen.
   `loop` is optional — set it to /loops/<id>.webm when a video
   loop exists for that screen and the plate renders a <video>
   instead of a still. The matching .mp4 fallback is derived from
   it. Leave it off and the screen keeps its still / gradient.

   `align`  left | right | center  — which side the panel sits on.
            Also picks the side the scrim darkens.
   `valign` top | center           — defaults to center if omitted.
   ─────────────────────────────────────────────────────────── */
export const SCREENS = [
  {
    id: 'hero', slot: 1, label: 'Home', item: '/icons/hero.png',
    machine: 'title', align: 'center', valign: 'top',
    frame: '/frames/01-hero.avif',
    loop: '/loops/01-hero.webm',
    biome: 'Plains', coords: [128, 72, -340],
    accent: '#7ac74f', accent2: '#ffd966',
    fallback: ['#7ec0f0', '#a8dd6a', '#5a8f3a'],
    counts: false
  },
  {
    id: 'about', slot: 2, label: 'About', item: '/icons/about.png',
    machine: 'profile', align: 'left',
    frame: '/frames/02-about.avif',
    loop: '/loops/02-about.webm',
    biome: 'Cherry Grove', coords: [312, 68, -180],
    accent: '#ff9ec7', accent2: '#8fd96a',
    fallback: ['#ffc2dd', '#ff9ec7', '#7ec06a'],
    counts: true
  },
  {
    id: 'skills', slot: 3, label: 'Skills', item: '/icons/skills.png',
    machine: 'enchant', align: 'left',
    frame: '/frames/03-skills.avif',
    loop: '/loops/03-skills.webm',
    biome: 'Stronghold', coords: [64, 32, -412],
    accent: '#a879e6', accent2: '#3fd9c9',
    fallback: ['#2a1840', '#5b3a8f', '#8f5fd6'],
    counts: true
  },
  {
    id: 'projects', slot: 4, label: 'Projects', item: '/icons/projects.png',
    machine: 'chest', align: 'left',
    frame: '/frames/04-projects.avif',
    loop: '/loops/04-projects.webm',
    biome: 'Mineshaft', coords: [-88, 24, -256],
    accent: '#e8a33d', accent2: '#4fd6e0',
    fallback: ['#2a1f14', '#6b4a28', '#c48a3d'],
    counts: true
  },
  {
    id: 'experience', slot: 5, label: 'Journey', item: '/icons/experience.png',
    machine: 'crafting', align: 'left',
    frame: '/frames/05-experience.avif',
    loop: '/loops/05-experience.webm',
    biome: 'Snowy Peaks', coords: [520, 186, -640],
    accent: '#a8d8f0', accent2: '#ff8c42',
    fallback: ['#8fc4e8', '#d4e8f5', '#f0f5f8'],
    counts: true
  },
  {
    id: 'achievements', slot: 6, label: 'Advancements', item: '/icons/achievements.png',
    machine: 'advancements', align: 'right', valign: 'top',
    frame: '/frames/06-achievements.avif',
    loop: '/loops/06-achievements.webm',
    biome: 'Deep Dark', coords: [-204, -48, -880],
    accent: '#1fd6d6', accent2: '#5b8cff',
    fallback: ['#06121a', '#0d2b38', '#1a4d5c'],
    counts: true
  },
  {
    id: 'services', slot: 7, label: 'Trades', item: '/icons/services.png',
    machine: 'trading', align: 'left',
    frame: '/frames/07-services.avif',
    loop: '/loops/07-services.webm',
    biome: 'Village', coords: [140, 70, -320],
    accent: '#3fcf6f', accent2: '#e8b84f',
    fallback: ['#3d2a18', '#8a6035', '#c49a5a'],
    counts: true
  },
  {
    id: 'contact', slot: 8, label: 'Contact', item: '/icons/contact.png',
    machine: 'book', align: 'left',
    frame: '/frames/08-contact.avif',
    loop: '/loops/08-contact.webm',
    biome: 'Lush Caves', coords: [-32, 12, -498],
    accent: '#6fd943', accent2: '#ffd24a',
    fallback: ['#1a2412', '#3d5b28', '#6f9440'],
    counts: true
  },
  {
    id: 'outro', slot: 9, label: 'The End', item: '/icons/outro.png',
    machine: 'credits', align: 'center',
    frame: '/frames/09-outro.avif',
    loop: '/loops/09-outro.webm',
    biome: 'The End', coords: [0, 64, 0],
    accent: '#c46fe8', accent2: '#f0e68c',
    fallback: ['#0d0618', '#2a1240', '#4d2a6b'],
    counts: false
  }
];

export const TOTAL_SECTIONS = SCREENS.filter((s) => s.counts).length;

/* ── ICONS ─────────────────────────────────────────────────────
   Every icon in the build resolves through here and through the
   `item` / `icon` fields below. A value starting with "/" renders
   as an <img>; anything else renders as literal text. So to swap
   the emoji for real pixel art, drop the PNGs into public/icons/
   and change the strings — nothing else in the project moves.

     item: '🌱'              →  item: '/icons/hero.png'

   See ICON-PROMPTS.md for the generation prompt for each one.
   ─────────────────────────────────────────────────────────── */
export const ICONS = {
  avatar:  '/icons/avatar.png',   // About — player head in the profile slot
  heart:   '/icons/heart.png',    // HUD health pip
  hunger:  '/icons/hunger.png',   // HUD hunger pip
  done:    '/icons/done.png',     // Advancements — unlocked tick
  locked:  '/icons/locked.png',   // Advancements — locked padlock
  arrow:   '/icons/arrow.png'     // Crafting / trade result arrow
};

/* ── TITLE SCREEN — the main menu ──────────────────────────────
   Laid out like the real one: logo, splash to its upper right,
   then a stacked button menu. `stack` renders full-width buttons,
   `row` renders the pair side by side underneath, same as
   Options / Quit Game in the game.
   ─────────────────────────────────────────────────────────── */
export const TITLE = {
  stack: [
    { label: 'Enter World',  go: 'about' },
    { label: 'View Builds',  go: 'projects' },
    { label: 'Villager Trades', go: 'services' }
  ],
  row: [
    { label: 'Contact', go: 'contact' },
    { label: 'The End', go: 'outro' }
  ],
  // opens the mini-game instead of navigating to a screen
  play: 'Mine for the Amulet',
  hint: 'Press 1–9 or click the hotbar · M to mine',
  footer: 'Built by Sanjai · not affiliated with Mojang'
};

/* ── MINIGAME — Ancient Excavation ─────────────────────────────
   A playable dig. The grid hides one Amulet; every block you break
   reports how far it is, so you triangulate rather than guess.
   Magma costs you an extra swing. Ores are pure bonus XP.

   Balance lives here — grid size, swings, and the loot table.
   `weight` is how many of that block get seeded into the grid.
   ─────────────────────────────────────────────────────────── */
export const MINIGAME = {
  title: 'Ancient Excavation',
  hint: 'Break blocks to sound out the Amulet. Numbers are how many blocks away it is.',
  cols: 9,
  rows: 6,
  swings: 12,

  amulet: {
    icon: '/icons/outro.png',
    name: 'Amulet of the Deep',
    lore: 'It hums when you get close'
  },

  ores: [
    { key: 'emerald', icon: '/icons/emerald.png',      name: 'Emerald',    xp: 3, cost: 1, weight: 7 },
    { key: 'star',    icon: '/icons/achievements.png', name: 'Nether Star', xp: 8, cost: 1, weight: 3 },
    { key: 'lamp',    icon: '/icons/craft-lamp.png',   name: 'Glowstone',  xp: 2, cost: 1, weight: 5 },
    { key: 'magma',   icon: '/icons/adv-hot.png',      name: 'Magma',      xp: 0, cost: 2, weight: 5 }
  ],

  copy: {
    swings:  'Pickaxe',
    score:   'XP',
    win:     'You found the Amulet of the Deep!',
    lose:    'Your pickaxe shattered. The Amulet stays buried.',
    idle:    'Pick a block and start swinging.',
    again:   'New Dig Site',
    close:   'Close',
    open:    'Mine for the Amulet'
  },

  // shown on the About screen once the player has won, and saved
  advancement: { icon: '/icons/outro.png', name: 'Treasure Hunter' }
};

/* ── ABOUT — player profile ────────────────────────────────── */
export const ABOUT = {
  title: 'Player Profile',
  bio: `Full-stack developer, designer and AI creator. I build digital
        experiences that aren't just functional — they're memorable.`,
  stats: [
    { label: 'Class',     value: 'Full-Stack Builder' },
    { label: 'Level',     value: '20 — Final year B.Tech IT' },
    { label: 'Spawn',     value: 'Tamil Nadu, India' },
    { label: 'Status',    value: 'Online — accepting quests' }
  ],
  goTo: 'experience'
};

/* ── SKILLS — enchantment table ────────────────────────────── */
export const SKILLS = {
  title: 'Enchantments',
  hint: 'Hover an enchantment to inspect it',
  list: [
    { name: 'HTML / CSS',      level: 'V',   value: 95, lore: 'Mastery of structure and style' },
    { name: 'JavaScript',      level: 'V',   value: 90, lore: 'Bends the browser to your will' },
    { name: 'Astro / GSAP',    level: 'IV',  value: 88, lore: 'Motion without the weight' },
    { name: 'Python',          level: 'IV',  value: 75, lore: 'For when the data gets deep' },
    { name: 'UI / UX',         level: 'V',   value: 90, lore: 'Sees what others overlook' },
    { name: 'Blender',         level: 'III', value: 70, lore: 'Shapes things in three dimensions' },
    { name: 'AI / Automation', level: 'IV',  value: 85, lore: 'Summons help from the void' }
  ]
};

/* ── PROJECTS — chest inventory ────────────────────────────── */
export const PROJECTS = {
  title: 'Chest — Completed Builds',
  hint: 'Hover an item for details',
  items: [
    { icon: '/icons/proj-constellation.png', name: 'Code Constellation', lore: 'AI-powered dev & design studio', rarity: 'legendary', url: '' },
    { icon: '/icons/proj-aureo.png',         name: 'Auréo',              lore: 'Premium ice cream — cinematic scroll', rarity: 'rare', url: '' },
    { icon: '/icons/proj-novascan.png',      name: 'NovaScan',           lore: 'AI website auditor SaaS', rarity: 'rare', url: '' },
    { icon: '/icons/proj-thunderstorm.png',  name: 'Thunderstorm',       lore: 'Tamil heritage AI cinematics', rarity: 'epic', url: '' },
    { icon: '/icons/proj-agrisense.png',     name: 'AgriSense',          lore: 'Physics-informed neural networks', rarity: 'epic', url: '' },
    { icon: '/icons/palette.png',            name: 'Stellarcore',        lore: 'Design system + component library', rarity: 'common', url: '' }
  ],
  goTo: 'services'
};

/* ── EXPERIENCE — crafting recipes ─────────────────────────── */
export const EXPERIENCE = {
  title: 'Crafting — The Journey',
  recipes: [
    {
      year: '2024 — NOW',
      result: 'Founder, Code Constellation',
      lore: 'Cinematic web for clients across India, South Africa and Canada.',
      inputs: ['/icons/craft-laptop.png', '/icons/palette.png', '/icons/craft-robot.png']
    },
    {
      year: '2023 — 2024',
      result: 'Freelance Full Stack Developer',
      lore: 'Custom web apps and products for startups and student founders.',
      inputs: ['/icons/craft-keyboard.png', '/icons/craft-ruler.png', '/icons/craft-rocket.png']
    },
    {
      year: '2022 — 2023',
      result: 'Learning & Exploring',
      lore: 'Development, design, automation — building in public from day one.',
      inputs: ['/icons/craft-books.png', '/icons/craft-wrench.png', '/icons/craft-lamp.png']
    }
  ]
};

/* ── ACHIEVEMENTS — advancements ───────────────────────────── */
export const ADVANCEMENTS = {
  title: 'Advancements',
  list: [
    { icon: '/icons/adv-inventory.png', name: 'Taking Inventory',     lore: 'Shipped my first live web build', done: true },
    { icon: '/icons/adv-world.png',     name: 'Into the Wider World', lore: 'Delivered across three continents', done: true },
    { icon: '/icons/adv-hot.png',       name: 'Hot Topic',            lore: '2 lakh+ views on a single reel', done: true },
    { icon: '/icons/adv-haul.png',      name: 'The Long Haul',        lore: '1000+ hours of consistency', done: true },
    { icon: '/icons/adv-dragon.png',    name: 'Free the End',         lore: 'Ship the product company', done: false }
  ],
  goTo: 'contact'
};

/* ── SERVICES — villager trades ────────────────────────────── */
export const TRADES = {
  title: 'Villager Trades',
  subtitle: 'Master Builder · Level 5',
  list: [
    { give: '/icons/emerald.png', giveQty: 12, get: '/icons/trade-landing.png', name: 'Landing Page',           lore: 'Single-page cinematic site', stock: 'In stock' },
    { give: '/icons/emerald.png', giveQty: 28, get: '/icons/trade-website.png', name: 'Full Website',           lore: 'Multi-page build + CMS', stock: 'In stock' },
    { give: '/icons/emerald.png', giveQty: 20, get: '/icons/trade-cinema.png',  name: 'AI Cinematics',          lore: 'Reels, loops and motion', stock: 'In stock' },
    { give: '/icons/emerald.png', giveQty: 36, get: '/icons/trade-brand.png',   name: 'Brand + Design System',  lore: 'Identity, tokens, components', stock: 'Limited' }
  ],
  stats: [
    { number: '20+', label: 'Builds' },
    { number: '15+', label: 'Clients' },
    { number: '3',   label: 'Countries' }
  ],
  goTo: 'contact'
};

/* ── CONTACT — written book ────────────────────────────────── */
export const CONTACT = {
  title: 'Written Book',
  heading: "Let's Connect",
  intro: 'Send word and I will answer within a day.',
  links: [
    { icon: '/icons/contact-email.png',     label: 'Email',     value: 'hello@codeconstellation.dev', url: 'mailto:hello@codeconstellation.dev' },
    { icon: '/icons/contact-location.png',  label: 'Location',  value: 'Tamil Nadu, India', url: '' },
    { icon: '/icons/contact-linkedin.png',  label: 'LinkedIn',  value: '/in/sanjai-dev', url: '' },
    { icon: '/icons/contact-instagram.png', label: 'Instagram', value: '@sanjai.builds', url: '' }
  ],
  goTo: 'outro'
};

/* ── OUTRO ─────────────────────────────────────────────────── */
export const OUTRO = {
  kicker: 'Thanks for playing',
  title: 'The End',
  lines: [
    'You reached the end of the world.',
    'But every world has another seed.',
    'Go build something nobody expects.'
  ],
  goTo: 'hero'
};

/* ── SETTINGS ──────────────────────────────────────────────── */
export const SETTINGS = {
  progressionEnabled: true,
  maxHearts: 10,
  saveProgress: true,
  showKeyHints: true,
  splashDuration: 2.4,
  enableF3: true
};
