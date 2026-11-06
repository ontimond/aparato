Aparato is a precision appliance: a light panel, dished keys, knobs, graphite levers and a single orange signal. Each control does one thing and its label says which. What serves no purpose isn't there.

The values come from the layer effects of the reference PSD (colors, angles, distances, sizes and opacities), at 1x size. The long shadows and reflections, which are painted in the PSD, were measured on the rendered image.

## Voice

- All lowercase, including titles: "power", "tuning", "table radio".
- Nouns before sentences. A label has one or two words.
- Numbers and abbreviations without ornament: "0 · 1", "16 33 45", "uv · 0 · ir". No exclamation marks or emoji.

## Light

- Global light at 30°, top right. 1px highlights and shadows land on `-0.87px 0.5px`; 2px ones, on `-1.73px 1px`.
- Labels, printed marks, pointer and LED carry `emboss`: a 1px white highlight at the bottom left.
- The long shadows under buttons, knobs and levers are painted: they fall straight down and fade out over 20–40px. On buttons and the selector they pass above the ring and below the rim; on the knurled knob, above the ring and the teeth and below the cap. As in the reference. Each control brings its own; there is no token. The exception is the channel selector: in the PSD, its shadow is a blurred copy of the arrow.

## Materials

- Page background: gradient from `ground-hi` to `ground-shade`, spanning the same pixels as the reference (it does not stretch with height).
- Each recess has an outer gradient ring, from `frame` at the top to `frame-hi` at the bottom (`--ring` in bundle.css), and `hole` inside.
- Buttons: 40px convex rim and 36px concave face, from `cream-deep` at the top to `cream` at the bottom, with a white reflection at the bottom.
- Keys: 50px square `key` base and 44px dish. The chosen one carries the `dot`.
- Knurled knob: `alu-shade` base, 60-tooth gear with a conic highlight and flat `alu` cap. Selector: central ridge shaded with a horizontal gradient.
- Levers: black slot with a ring. Flat cream thumb, or cylindrical graphite lever.
- Channel selector: graphite arrow with a 4px edge and a scale printed in black at 80%.
- Rocker and orange button: `signal-hi` at the top, pressed face `signal-deep`, pink rims `signal-glow`.

## Color

- `signal` is the only signal: printed marks, pointer and on LED. Never decorative.
- `olive` marks the main function of a group, once.
- Labels in `ink`. The ends of a scale ("uv", "ir"), in `signal-ink`. `ink-muted` only for long secondary text.
- Text on `signal` in `ink`; on `signal-deep`, white.

## Typography

- One family, `sans` (Helvetica Neue, the one in the reference), in lowercase: `title`, `heading`, `body`, `label`, `scale`.
- The reference labels at 8px. Here `scale` is 11px and `label` 12px, the legible minimum.

## Space and shape

- Scale from `space-1` to `space-8`. Inside `ap-ctl`, LED, control and label sit at `space-3`. Between controls in a row, `space-4`; between groups, `space-8`.
- Nearly square corners (`radius-xs`) on recesses, keys and rocker; circles on buttons, knobs and LED.
- Same axis for the LED, the control and its label.

## Focus and states

- Focus is a solid 2px ring in `focus` (= `ink`), 2–3px away.
- On = `signal` LED, no halo; off = `graphite` LED. Both carry the `--ring` collar and a highlight, and always go inside `ap-ctl`. Nothing blinks.
- A pressed button loses its long shadow; a pressed key receives `pressed`.

## Iconography

- There are no icons: controls are explained with labels and scales. If an arrow is needed, it is the `signal` triangle of the pointer. The arrow of the channel selector is not an icon: it is the control.

## Usage

Load `components/bundle.css` after the tokens, and `components/bundle.js` if you use a stateful PushButton or Knob. Classes start with `ap-`. Wrap each control in `ap-ctl`, which isolates the long shadows under the control and its label; KeyBank is the exception, because `ap-bank` already acts as the container. Keys, channel selector, levers and switches are native inputs (radio and checkbox) and need no JavaScript. Each component explains its markup in its README.

## Parts

The controls carry them; they can also be used on their own.

- `ap-led` (off, `graphite`) and `ap-led ap-led--on` (on, `signal`): a 9px box that looks like 12, because the collar goes outside with `z-index: -1`. Needs `ap-ctl`.
- `ap-pointer`: 14×11 `signal` triangle that marks the position of a knob. Carries `aria-hidden="true"`.
- `ap-scale`: scale numbers and marks (11px). `ap-scale--accent`, for the ends of a scale, in `signal-ink`.
- `ap-cap`: label under a control, printed with `emboss`.
- `ap-stage`: row of controls on the panel, aligned at the bottom, separated by `space-8` and with `space-6` of padding.
