# Design direction

Taken from the site's existing identity (green accent, Sora for the name, light and dark themes). Edit this file to change the direction; the antislop skills read it before any UI work.

Reading this as: a personal portfolio for clients and recruiters hiring a web and mobile engineer, in a polished studio style with real 3D product shots. Dial: ENERGY 3 / RHYTHM 3 / MOTION 3.

## Identity

- Personality: plain-spoken, practical, confident about real work rather than claims.
- Motif: every section opens with a hairline rule and a numbered label (`01 / About`), and lists use the same hairline rows. It reads like a printed CV or catalogue.
- Motif: your real work shown on physical objects. The hero is an abstract 3D sculpture, the stack is a 3D sphere of the actual tools, and Work screenshots sit in browser frames that stand up in 3D as you scroll.
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

- Owner asked for more 3D and a more professional finish. The hero sculpture is pure identity (owner's direction); the other 3D pieces carry real content: project screenshots and the actual skill list.
- Hero: no photo (owner's call; the portrait lives in About). The owner asked for abstract shapes that look cool rather than a literal object, so the stage is a glossy green torus knot with a thin-film sheen, ringed by six smaller pieces in different shapes and finishes (faceted icosahedron, pearl sphere, rounded cube, torus, capsule). Everything floats, the group leans toward the cursor, and the knot turns slowly. On phones the stage comes first so the 3D is on the first screen. Canvas edges fade out, rendering stops off screen, and reduced motion holds everything still.
- Stack: CSS 3D sphere, so labels stay sharp text. The grouped cards beside it carry the same list for screen readers and scanning.
- Work: four featured projects (CreativeChain first, SmartCal last) in browser frames whose address bar shows the real host, or says there is none. Smaller projects are cards in a two-column grid.
- Surfaces: 16px radius cards on a surface colour with a hairline border. Shadow only on things that are lifted in 3D (screens, portrait, the floating header).
- Glass: only the floating header, because content scrolls under it.
- Motion: name and intro rise in once on load; sections fade up once; cards tilt toward a mouse cursor. Reduced motion turns all of it off.
- The `↗` arrow appears only on links that leave the site.
- Experience mirrors the CV (public/cv): work, achievements, and training, each row with organisation and role on the left, place and dates on the right, a heavy rule under each block heading. A Download CV button sits beside it.
