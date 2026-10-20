# Blockcraft Portfolio

A portfolio that works like Minecraft. Hotbar navigation, hover tooltips,
and a different in-game machine on every screen.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
```

## Add your frames

Drop nine images into `public/frames/`:

```
01-hero.avif          Plains village sunrise
02-about.avif         Cherry blossom grove
03-skills.avif        Enchanting room
04-projects.avif      Mineshaft
05-experience.avif    Snowy peak
06-achievements.avif  Ancient City
07-services.avif      Trading hall
08-contact.avif       Lush cave
09-outro.avif         The End
```

1920x1080, AVIF q60-70. Missing frames fall back to biome gradients,
so the site runs before you've generated anything.

## Controls

| Input | Action |
|---|---|
| 1-9 | Select hotbar slot |
| ← → | Cycle screens |
| Scroll | Cycle screens (like the real hotbar) |
| Esc | Home |
| F3 | Debug overlay |
| Hover | Item tooltips |

## Why this isn't a reskin

Each screen renders a different Minecraft interface:

| Screen | Machine |
|---|---|
| About | Player profile panel |
| Skills | Enchantment table — glyph levels, cost |
| Projects | Chest inventory grid with rarity dots |
| Experience | Crafting table — inputs → result |
| Achievements | Advancements list, locked and unlocked |
| Services | **Villager trade UI** — emerald prices, stock |
| Contact | Written book |
| Outro | End credits |

Navigation is a hotbar at the bottom, not a menu on the left. Content
lives in hover tooltips, not static panels. The GUI panels use
Minecraft's real 3px bevelled border, recreated in box-shadow.

## Edit everything in one file

`src/config/site.config.js` drives all content, colours, biomes,
coordinates and trades. You should not need to open a component.

## Extras built in

- Advancement toast on first visit to each screen
- XP bar and level that rise as you explore
- Hunger bar that depletes as you go
- Random splash text on the title screen, like the real menu
- F3 debug overlay with live FPS and per-biome coordinates
- localStorage progress
