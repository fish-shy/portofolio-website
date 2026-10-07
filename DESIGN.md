# Design direction

Taken from the site's existing identity (green accent, Sora for the name, light and dark themes). Edit this file to change the direction; the antislop skills read it before any UI work.

Reading this as: a personal portfolio for clients and recruiters hiring a web and mobile engineer, in an editorial print-like style. Dial: ENERGY 2 / RHYTHM 3 / MOTION 2.

## Identity

- Personality: plain-spoken, practical, confident about real work rather than claims.
- Motif: every section opens with a hairline rule and a numbered label (`01 / About`), and lists use the same hairline rows. It reads like a printed CV or catalogue.
- Focal point per screen: the name in the hero, the screenshot in each featured project, the email address in Contact.

## Palette

| Token | Light | Dark | Why |
|---|---|---|---|
| paper | `#f7f7f2` | `#0e1311` | Warm off-white and a green-tinted near-black, so the page is not sterile white or generic grey |
| ink | `#15171a` | `#eef1ec` | Body and headings, 16:1 or better |
| muted | `#585e66` | `#9ba49e` | Secondary text, at least 6:1 |
| accent | `#15803d` | `#4ade80` | The owner's green, used only on the surname, the primary button, section numbers, and outbound links |

Every text pairing was checked with `.claude/skills/antislop-human/contrast-check.py`.

## Type

- Sora (display): the name and headings. Geometric with a slightly wide stance, already the site's wordmark face.
- Geist (body): neutral and legible at small sizes, so the personality stays in the headings.
- Geist Mono: only for numbers and dates (section indexes, experience periods), where fixed-width digits line up.

## Decisions

- No cards: content sits on hairline rows so hierarchy comes from type size, not boxes and shadows.
- Projects with a full screenshot get a large alternating row; projects with only a logo sit in a compact list.
- No background grid, glow, orbs, particles, or 3D scene: none of them said anything about the work.
- Motion: the name rises in once on load, each section fades up once as it enters the viewport, hover states elsewhere. Reduced motion turns the durations to zero.
- The `↗` arrow appears only on links that leave the site.
- Radius is a small 6px everywhere; nothing is pill-shaped.
