# Knob

Rotary knob: a three-position selector with a central ridge and scale, or a knurled aluminium knob for continuous values.

- Selector: `<div class="ap-dial">` with the `ap-scale` labels and `<button class="ap-knob" role="slider" aria-label aria-valuemin="0" aria-valuemax="2" aria-valuenow aria-valuetext data-labels="uv off ir">`. `data-labels` gives the `aria-valuetext` of each position. 59.33px knob (`vmsk` path of the PSD) with a 4px ring, gradient ridge, reddish pointer at the top and dark lens at the bottom. The ends use `ap-scale--accent` and rotate ±30° following the ring, as in the reference ("uv · 0 · ir").
- Knurled: `<div class="ap-knurl-wrap">` with `<span class="ap-pointer" aria-hidden="true">` (14×11 `signal` triangle) and `<div class="ap-knurl" role="slider" tabindex="0" aria-label aria-valuemin="0" aria-valuemax="100" aria-valuenow>`: 61px base, 60-tooth gear, flat 45px cap. Its long shadow passes over the ring and the teeth, and under the cap.
- The selector rotates with `aria-valuenow` alone: 0, 1 or 2 = −30°, 0° or 30°. Don't set `--turn` by hand. Its shadow follows the lens and always points down.
- The knurled knob rotates with `--turn`, from −135° to 135° for 0–100 (circular drag around the centre, wheel or arrow keys in steps of 5). Only the teeth and the dot rotate; the conic highlight and the cap's rim and inner shadow stay still, because the light does not rotate.
- The behaviour lives in `components/bundle.js`: it attaches both knobs on load, from `aria-valuenow`, and fires `change` on every change. For markup added later, `Aparato.attach(root)`.
- The dot on the cap is not in the reference: it was added so the value can be read.
- Both go inside `ap-ctl`, with their `ap-cap` label below, so the long shadow stays under the control.
- Don't: use more than three positions on the selector, or knobs without a scale or label.
