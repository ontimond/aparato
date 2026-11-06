# Aparato

Skeuomorphic design system: a Braun-style precision appliance, with a light panel, dished keys, knobs, graphite levers and a single orange signal. The values come from the layer effects of a reference PSD, at 1x size. It started in a Claude Code session (November 2 and 3, 2026) and continues here as its own project.

## Where everything is

| Path | What it is |
|---|---|
| `system/` | The system. `README.md` has the usage rules and `tokens.json` is the source of the values. `tokens.css` is generated from `tokens.json` with `python3 system/tokens_css.py system/tokens.json > system/tokens.css`, `components/bundle.css` has all the component CSS and `components/bundle.js` their behavior. Each component has a folder with its `README.md` and its `preview.html`. |
| `index.html` | Example page for GitHub Pages: every component working, with its live state. |

To see it locally, start the `aparato` server from `.claude/launch.json` (`python3 -m http.server 8765`) and open `http://localhost:8765/`. It is published with GitHub Pages from the repo root; paths are relative, so there is no build step.

## System rules

The full guide is in `system/README.md` and in each component's README. These rules are not broken:
- **Voice:** all English copy is lowercase, including titles. Labels of one or two words, no exclamation marks or emoji. No icons: controls are explained with labels and scales.
- **Light:** the global light comes from the top right, at 30°. 1px highlights and shadows land on `-0.87px 0.5px`; 2px ones, on `-1.73px 1px`. Labels, marks, pointer and LED carry `emboss` (the LED, on its collar).
- **Color:**
  - `signal` (#ed5700) is the only signal: printed marks, pointer and on LED. It is never decorative.
  - `olive` marks the main function of a group, only once.
  - Each appliance has a single orange button (`ap-push--signal`) and a single rocker.
- **Typography:** a single family, Helvetica Neue, the one in the reference. The reference labels at 8px; here `scale` is 11px and `label` 12px, the legible minimum.
- **Theme:** there is a single theme, the light one ("Cream"), with no dark mode.
- **Values:** use the ones from the PSD at 1x, without rounding by eye. What is not in the reference is stated in its `usage` or in a `ponytail:` comment in the CSS: `ink-muted`, `well`, the dot of the knurled knob and, on the LED, the collar, the highlight, the inner shadow and the `graphite` off state. The focus ring (`focus`) is also an addition.

## Components

Each component's interface (markup, classes, ARIA, states) is in its README, `system/components/<Component>/README.md`. The loose parts are in `system/README.md` › "Parts". Not repeated here.

Before touching a component's markup or CSS, read its README. If you change the interface, change the README in the same step.

| Component | Root | README |
|---|---|---|
| KeyBank | `.ap-bank` (no `.ap-ctl`) | `KeyBank/README.md` |
| PushButton | `.ap-ctl` › `button.ap-push` | `PushButton/README.md` |
| Knob | `.ap-ctl` › `.ap-dial` or `.ap-knurl-wrap` | `Knob/README.md` |
| ChannelSwitch | `.ap-ctl` › `.ap-chan` | `ChannelSwitch/README.md` |
| Lever | `.ap-ctl` › `.ap-lever-ctl` | `Lever/README.md` |
| Rocker | `.ap-ctl` › `input.ap-rocker` | `Rocker/README.md` |

What applies to all of them:
- Prefix `ap-`. Each control goes in `.ap-ctl`, except KeyBank. `.ap-ctl` has `isolation: isolate`: without it, the shadows with `z-index: -1` and the LED collar escape.
- JavaScript only in `system/components/bundle.js` (`window.Aparato`): it toggles `aria-pressed`, turns the knobs and fires `change`. The selector turns with `aria-valuenow` alone (the CSS sets `--turn`); the knurled knob, with `--turn` set by `bundle.js`. `index.html` and the `preview.html` files link it with `<script src>`.
- `bundle.css`'s own variables: `--ring` (outer gradient ring, from `frame` to `frame-hi`), `--ring-knob` and `--rail` (pink rims of the rocker).
- The READMEs are public: the PSD layers and the `ponytail:` notes go in the comments of `bundle.css`.

## From PSD to CSS

Conversions:
- **Shadows:**
  - With angle `a` and distance `d`, the offset is `x = −cos(a)·d`, `y = sin(a)·d`. If the effect uses the global light, `a` = 30°.
  - The shadow size becomes CSS blur, and `choke`/`spread` becomes CSS spread.
- **Gradients:**
  - The CSS angle is `90 − PS angle`.
  - If the gradient is reversed (`Rvrs`), the stops are reversed.
  - With scale `s`, each stop `p` becomes `50 + (p − 50)·s`.
- **Strokes:**
  - Outside: border or `box-shadow` with spread. Inside: `inset`.
  - A gradient stroke is made with `border: Npx solid transparent` + `background: <fill> padding-box, <gradient> border-box`, like `--ring`.
- **Overlays:** from top to bottom, color > gradient > pattern.
- **Fill:** `fill=0` hides the layer's pixels, but not its effects.
- **Sizes:** they come from the `vmsk` path, not from the layer rectangle, which on shape layers has 1px of transparency per side. So far only the PushButton, the knurled knob, the selector and the Lever `--bat` are corrected.
- **Multi-layer backgrounds:** in `background`, a solid color is only valid in the last layer. In the others it goes as `linear-gradient(c, c)`.
- **Smart objects:** `SoLd` brings its transform (`Trnf`) and its filters (`filterFX`), and the `.ai` with the path is in the global `lnk2` block.

The long shadows under buttons, knobs and levers are painted in the PSD as pixels, not as effects. They were measured on the reference image as black alpha over the background: `a = 1 − L / L_background`, with the background read at the same height at x = 6–8. They were then converted to masked gradients. The exception is the channel selector's: it is a copy of the arrow, transformed and with a Gaussian filter.

## Long shadows: layer order

In the PSD, from bottom to top: ring (outer stroke) < long shadow < rim and face of the control. The shadow passes **above the ring** and **below the rim**. It used to be the other way round, and the light ring covered the shadow right under the button.

In `bundle.css`:
- **`.ap-push::after`:** sits above the ring, clipped with `clip-path: path(evenodd, …)` to keep the rim clear. The clip is a 20px circle (its real 40px rim). The shadow copies the three painted layers of the PSD: an elliptical halo (`Shape 31`) and two long tapering shapes (`Shape 4`), as three masks composited with `mask-composite: add, intersect, add`, without `blur`. `--cast` is 1 and goes to 0 when pressed.
- **`.ap-dial::after`** (selector): these are the layers `Shape 32` (black ellipse) and `Shadow` (ellipse ∩ vertical gradient, tapering downward), with the same three masks and its axis at x = 381.5, 0.5px to the right of the knob's. It has no clip: it stays under the knob because `.ap-knob::before` and `::after` have `z-index: 1`. `Shadow` is gray in the PSD; here, equivalent black. When turned, it follows the lens along the arc and always points down, because the light does not turn; it reads this from `aria-valuenow` because `--turn` is on the child. The PSD only shows 0°, so this does not come from the reference.
- **`.ap-knob::after`** (selector): its box is the rectangle of the `Switch` layer (60×62), so that the `bottom` lens can leave the circle. It carries the lens row by row (`#7f7869`, layer alpha + inner shadow) and the 2×9 indicator, and turns with `--turn`. The 10×2 tab at the top is missing.
- **`.ap-knurl-wrap::after`** (knurled knob): this is the `Shape 4` layer, which passes above the ring and the teeth and below the cap (`z-index: 1`). It has opacity .8, a mask of ellipse ∩ vertical gradient and its axis 1px to the left of the knob's. The gray goes from `#000` to `#b4b4b4`, measured on the reference image: the layer declares `#000 → #b9b9b9`, but that stretch only covers y ≈ 95 to y ≈ 139, not its whole box. In black, on top of the teeth, it came out too dark.
- **`.ap-chan::before`** (channel selector): the silhouette with the layer's `Trnf` and `blur(10px)`; the layer says 8.8, but 10 measures better. It stays under the arrow and the lines. Its 7.52px downward offset does not turn, because the light does not turn.
- **`.ap-ctl`:** has `isolation: isolate`, so that the shadows with `z-index: -1` do not escape the control.

The user's first complaint ("there seems to be a problem with the shadows") did not say which part. A guessed fix had to be reverted. Faced with a visual complaint without detail, ask which part before touching anything, and check with numbers against the reference.

## Where it's heading

This was discussed in the original session as recommendations; these are not final decisions:
- **Library:** discarded. With five components, a daisyUI-style library isn't worth it; the repo remains a normal repo.
- **Tokens:** they would be written in JSON (DTCG format, with Style Dictionary), to generate the CSS from them and, later, a C++ header.

## Caution

- **Origin of the design:** the original design is ["Braun UI"](https://dribbble.com/shots/597337-Braun-UI), by Adrien Olczak, on Dribbble. The PSD the values come from is ["Free Website UI .PSD"](https://www.deviantart.com/yesimadesigner/art/Free-Website-UI-.PSD-425937630), by YesIMaDesigner (DeviantArt, 2014), with no declared license. Neither is in the repo and they are not redistributed. It carries the Braun logo, which is a registered trademark and is left out.
- **Arrow of `.ap-chan`:** its path in `bundle.css` is copied from the `.ai` inside the PSD. It was decided to leave it this way (November 6, 2026).

## How the user works

- Prefers short answers.
- Reviews under magnification (4× screenshots) and wants the exact values from the PSD.
- If a visual complaint does not say which part fails, ask before changing anything.
