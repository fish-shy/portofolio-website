# Design direction

The owner asked for a full revamp, modern and sleek, guided by the apple-design skill (`.claude/skills/apple-design`). Edit this file to change direction; the antislop and apple-design skills read it before UI work.

Reading this as: a personal portfolio for clients and recruiters hiring a web and mobile engineer, in the calm, product-page language of Apple's own sites. Dial: ENERGY 2 / RHYTHM 2 / MOTION 2.

## Identity

- Personality: plain-spoken, practical, confident about real work rather than claims.
- Mark: a lowercase "h" in white on a near-black rounded square, with a blue dot as its full stop. The same dot closes the "Hafiz." wordmark in the header and the name in the hero.
- Motif: the product-page tile. Every section is a centred accent label, a large tightly tracked title, and content set in soft rounded tiles on a near-white (or true black) page.
- Focal point per screen: the name in the hero, each project tile's title and screenshot, the email button in Contact.

## Palette

| Token | Light | Dark | Why |
|---|---|---|---|
| paper | `#fbfbfd` | `#000000` | Apple's off-white page and true black, so tiles read as lifted surfaces |
| tile | `#f5f5f7` | `#161617` | The rounded content tiles |
| ink | `#1d1d1f` | `#f5f5f7` | Body and headings, 16:1 or better |
| muted | `#6e6e73` | `#a1a1a6` | Secondary text, at least 4.6:1 on every surface |
| accent | `#0066cc` | `#2997ff` | Blue, chosen by the owner in place of the old green; on the section labels, primary buttons, links and the dot in the mark |

Every text pairing was checked with `.claude/skills/antislop-human/contrast-check.py`.

## Type

- Plus Jakarta Sans everywhere, loaded with `next/font` (self-hosted, no layout shift). The owner found the system font stack bland, and on Android it fell back to Roboto. Jakarta was drawn by Tokotype for Jakarta's city identity: a modern grotesque from Indonesia with tight, geometric capitals, which suits an Indonesian engineer's site and reads well from 12px fine print up to the hero name. The Open Graph image uses the same face from `@fontsource/plus-jakarta-sans`.
- Tracking scales with size: the hero name at -0.035em, section titles at -0.03em, body at 0. Leading is tight on display sizes (0.98 to 1.05) and relaxed on body copy.

## Decisions

- Hero: centred, Apple product-page layout. Accent headline label, the name as the display title, one sentence, a filled pill button and a text link. Below it, a liquid-glass scene: a frosted glass rounded square (echoing the mark), a small glass sphere and a glass ring, all refracting soft blue, cyan and white lights that drift behind them. The glass is real transmission, so the colour comes from what it bends. The group leans toward the cursor and settles back and smaller as the hero scrolls away; the canvas edges fade so the glow never ends on a hard line. Rendering stops off screen; reduced motion holds it still.
- Work: CreativeChain as a full-width tile, then a two-column grid of the other featured projects. Each tile has the context label, title, description, stack and link on top, and the screenshot rising from the bottom edge, growing from 90% to full size as it scrolls into view. The smaller projects sit in a horizontal rail that scrolls natively with snap, with previous/next buttons for mouse users.
- About: rounded portrait beside three short paragraphs, then four figure tiles. Every figure comes from the CV or this page.
- Experience: the CV content in grouped tiles (work, achievements, training) with a Download CV link.
- Stack: four tiles; filled chips are the first-choice tools.
- Contact: a large email pill, three channel tiles, and the mailto form in its own tile.
- Header: a translucent material bar (`backdrop-filter`) with content scrolling under it and a soft scroll-edge fade instead of a divider. It turns solid under `prefers-reduced-transparency`. The phone menu drops from the bar.
- Motion: critically damped springs (bounce 0) everywhere; nothing overshoots. Buttons and tiles respond on press (`scale(0.97)`). Reduced motion swaps every rise for a short cross-fade.
- Radius: 28px on large tiles, 24px on small ones, pills only on buttons and chips.
- The `↗` arrow appears only on links that leave the site; `›` marks in-page text links, as on Apple's pages.
