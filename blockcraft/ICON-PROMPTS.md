# Icon generation prompts

Every icon in the build is a string in `src/config/site.config.js`. A value
starting with `/` renders as an `<img>`; anything else renders as literal
text. So the emoji are placeholders — swap a string, get a PNG, nothing
else in the project moves.

```js
item: '🌱'   →   item: '/icons/hero.png'
```

You can migrate one icon at a time. Mixed emoji + PNG works fine.

---

## How to use this sheet

1. Paste the **style block** below, then one **subject** line from the tables.
2. Generate square, transparent background.
3. Downscale to a real pixel grid (step 3 below) — this is the step that
   makes it look like a game sprite instead of an AI drawing of one.
4. Save into `public/icons/` under the filename in the table.
5. Change the string in `site.config.js`.

### 1. Style block — prepend this to every subject

```
16x16 pixel art game item icon in the style of a Minecraft inventory
sprite. Flat front-facing orthographic view, no perspective. Hard pixel
edges, no anti-aliasing, no blur. Limited palette of 4-6 flat colours
plus one darker 1px outline. Two-tone shading only — one light face, one
shadow face. Object centred, filling the frame with 1px of padding.
Fully transparent background. No text, no letters, no drop shadow, no
gradient, no glow, no background scene. Single isolated object.
```

### 2. Subject

Append one line from the tables below, e.g.:

```
Subject: a grass block — green grassy top, brown dirt sides.
```

### 3. Key out the background and downscale

Two things need fixing in one pass.

**Transparency.** Image generators usually ignore "transparent
background" and hand back an opaque magenta fill instead — that's what
the first batch did. Magenta is a fine chroma key, so ask for it
explicitly rather than fighting it. Add this to the style block:

```
Background: solid flat magenta #FF00FF, completely uniform, no shadows
cast onto it.
```

**Pixel grid.** Output is ~1024-1254px with soft edges. It needs
nearest-neighbour downscaling so the pixels land on a real grid.

Both at once (ffmpeg is installed):

```bash
ffmpeg -i raw.png -vf "colorkey=0xF205F3:0.45:0.10,scale=64:64:flags=neighbor,format=rgba" -y hero.png
```

Whole folder (run from the folder holding the raw generations):

```bash
for f in *.png; do ffmpeg -v error -i "$f" -vf "colorkey=0xF205F3:0.45:0.10,scale=64:64:flags=neighbor,format=rgba" -y "../public/icons/$f"; done
```

**Target 64x64** for everything except `avatar.png`, which renders much
larger — make that one **128x128**.

Notes from doing this on the first batch, all measured rather than
guessed:

- **Similarity `0.45` is the ceiling.** At `0.55` the key starts eating
  saturated reds — `heart.png` came out hollow. At `0.30` a magenta
  fringe survives on the edges. `0.45:0.10` was clean across all 42.
- **Don't go below 64px.** At 16x16 the generator's grid doesn't line up
  with a clean 16px sampling and shapes break — the heart lost its
  centre notch entirely. 32px keeps the shape but fringes. 64 is the
  first size that is both correct and clean.
- The key colour is `0xF205F3`, not pure `0xFF00FF` — generator
  compression leaves the fill noisy (R 235-251, B 233-253), so it needs
  a mid value plus tolerance, not an exact match.
- If a subject legitimately contains magenta or hot pink, it will get
  punched through. Ask for a different colour in the prompt.
- **Purple/violet or blue-heavy subjects need a tighter key.** They sit
  close to magenta in the key's distance metric, so `0.45` erodes them
  to partial transparency — a purple book cover came out looking white
  because the cover had gone semi-transparent. Use `0.16:0.02` for
  those. It leaves ~1 stray edge pixel; scrub it or ignore it. The
  enchanted book (`skills.png`) was keyed this way, not at `0.45`.

> The stage scales fluidly with the viewport, so pixel scaling is never a
> perfect integer multiple. 64x64 is the pragmatic size: crisp on large
> displays, still clean on small ones.

---

## Hotbar — the 9 navigation items

`SCREENS[].item` in `site.config.js`.

| File | Replaces | Subject |
|---|---|---|
| `hero.png` | 🌱 | a grass block — green grassy top, brown dirt sides |
| `about.png` | 🙂 | a player head block, front view, simple face, brown hair |
| `skills.png` | 📖 | a closed enchanted book seen from the front, cover fully filled with **solid deep violet-purple**, gold clasp, faint cyan glyphs floating above it — the whole cover coloured, no white/blank areas |
| `projects.png` | 🧰 | a wooden chest, closed, front view, iron latch |
| `experience.png` | 🧭 | a compass, circular brass rim, red and white needle on white dial |
| `achievements.png` | ⭐ | a nether star — white four-pointed star with sharp spikes |
| `services.png` | 💚 | a cut emerald gem, bright green, faceted |
| `contact.png` | ✉️ | a written book, closed, brown leather cover with a quill resting on it |
| `outro.png` | 🔮 | an ender pearl — smooth teal-green sphere with a darker swirl |

## Projects — the chest inventory (6)

`PROJECTS.items[].icon`.

| File | Replaces | Subject |
|---|---|---|
| `proj-constellation.png` | ⭐ | a nether star with a small orbiting ring of tiny stars |
| `proj-aureo.png` | 🍦 | an ice cream cone, pale cream scoop on a golden waffle cone |
| `proj-novascan.png` | 🔍 | a spyglass / magnifying glass, copper rim, pale blue lens |
| `proj-thunderstorm.png` | ⚡ | a lightning bolt, bright yellow with a white core |
| `proj-agrisense.png` | 🛰️ | a small satellite with two blue solar panel wings |
| `palette.png` | 🎨 | an artist's paint palette, wooden, with four dabs of colour |

## Experience — crafting inputs (9)

`EXPERIENCE.recipes[].inputs`. `palette.png` is reused from the table above.

| File | Replaces | Subject |
|---|---|---|
| `craft-laptop.png` | 💻 | an open laptop computer, grey body, glowing blue screen |
| `palette.png` | 🎨 | *(reuse the file above)* |
| `craft-robot.png` | 🤖 | a small robot head, grey metal, two glowing cyan eyes, antenna |
| `craft-keyboard.png` | ⌨️ | a computer keyboard, grey keys, top-down slab view |
| `craft-ruler.png` | 📐 | a set square / triangle ruler, translucent yellow with markings |
| `craft-rocket.png` | 🚀 | a firework rocket, white paper tube with a red conical tip |
| `craft-books.png` | 📚 | a stack of three bookshelf books, red green and blue spines |
| `craft-wrench.png` | 🔧 | an iron wrench, grey metal, open jaw |
| `craft-lamp.png` | 💡 | a redstone lamp, glowing warm yellow centre in a dark frame |

## Advancements (7)

`ADVANCEMENTS.list[].icon`, plus `ICONS.done` / `ICONS.locked`.

| File | Replaces | Subject |
|---|---|---|
| `adv-inventory.png` | 🏗️ | a crafting table block, wooden, 3x3 grid on the top face |
| `adv-world.png` | 🌍 | a filled map / globe, blue oceans and green landmasses |
| `adv-hot.png` | 🔥 | a flame, orange and yellow, blaze-powder style |
| `adv-haul.png` | ⏳ | an hourglass, wooden frame, falling amber sand |
| `adv-dragon.png` | 🐉 | an ender dragon head, black scales, glowing magenta eyes |
| `done.png` | ✔ | a bold checkmark tick, bright lime green, thick strokes |
| `locked.png` | 🔒 | a closed padlock, iron grey with a dark keyhole |

## Services — villager trades (5)

`TRADES.list[].give` and `.get`.

| File | Replaces | Subject |
|---|---|---|
| `emerald.png` | 💚 | a cut emerald gem, bright green, faceted (the trade currency) |
| `trade-landing.png` | 🖥️ | a desktop monitor, dark grey bezel, glowing pale blue screen |
| `trade-website.png` | 🏛️ | a stone temple facade with four columns and a triangular roof |
| `trade-cinema.png` | 🎬 | a film clapperboard, black slate with white diagonal stripes |
| `trade-brand.png` | ✨ | a pinch of glowstone dust — three small glowing yellow sparkles |

## Contact — the written book (4)

`CONTACT.links[].icon`.

| File | Replaces | Subject |
|---|---|---|
| `contact-email.png` | ✉️ | a sealed paper envelope, cream white with a red wax seal |
| `contact-location.png` | 📍 | a map marker pin, red teardrop shape with a white centre dot |
| `contact-linkedin.png` | 💼 | a brown leather briefcase with a darker handle and clasp |
| `contact-instagram.png` | 📸 | a camera, dark grey body with a large round lens |

## Mini-game — Ancient Excavation (1)

`MINIGAME` in `site.config.js`. The dig-site prize currently borrows
`outro.png` (the ender pearl) as a stand-in — it reads as a mystical orb
and the win state gives it a gold glow, but it deserves its own art.

| File | Currently | Subject |
|---|---|---|
| `amulet.png` | *(borrowing `outro.png`)* | an ancient amulet — a teal-green gem in a gold setting hanging from a short gold chain, glowing faintly |

Once generated, point it at the new file:

```js
export const MINIGAME = {
  amulet: { icon: '/icons/amulet.png', name: 'Amulet of the Deep', ... },
  advancement: { icon: '/icons/amulet.png', name: 'Treasure Hunter' }
};
```

The ore blocks reuse existing icons (`emerald`, `achievements`,
`craft-lamp`, `adv-hot`) — swap any of them in `MINIGAME.ores`.

## HUD and misc (4)

`ICONS` in `site.config.js`.

| File | Replaces | Subject | Size |
|---|---|---|---|
| `avatar.png` | 🧑🏽‍💻 | a player head wearing headphones, brown skin, dark hair, front view | **128x128** |
| `heart.png` | ❤️ | a heart, bright red with a small white highlight square, Minecraft health style | 64 |
| `hunger.png` | 🍗 | a cooked chicken drumstick, golden brown meat on a white bone | 64 |
| `arrow.png` | ➜ | a thick right-pointing arrow, light grey with a dark outline | 64 |

---

## Wiring them up

Once the PNGs are in `public/icons/`, edit `src/config/site.config.js`:

```js
// hotbar
{ id: 'hero', slot: 1, label: 'Home', item: '/icons/hero.png', ... }

// projects
{ icon: '/icons/proj-aureo.png', name: 'Auréo', ... }

// HUD and misc
export const ICONS = {
  avatar: '/icons/avatar.png',
  heart:  '/icons/heart.png',
  hunger: '/icons/hunger.png',
  done:   '/icons/done.png',
  locked: '/icons/locked.png',
  arrow:  '/icons/arrow.png'
};
```

No component changes needed. `src/components/Icon.astro` and the
`paintIcon()` helper in `src/scripts/app.js` handle both forms, and
`image-rendering: pixelated` is already applied so the sprites stay sharp.
