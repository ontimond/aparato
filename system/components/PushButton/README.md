# PushButton

Round button with a concave face in a recess with a ring, with an LED above that lights up when it stays active.

- Structure: `<div class="ap-ctl">` with `<span class="ap-led">`, `<button class="ap-push" aria-pressed>` and `<span class="ap-cap">` with the label.
- Anatomy (from the reference): 3px ring, 40px convex rim, 36px concave face with a white reflection at the bottom and a long shadow downwards: a halo against the button and a tail that narrows.
- Pressed (`aria-pressed="true"` or `:active`), cream and olive lose the long shadow, like the pressed variant in the reference. The shadow fades in 50 ms going down and 120 ms coming up; that motion is an addition, because the PSD is static. The LED is not animated.
- Variants: cream (default) and `ap-push--olive` for the main function of the group (once). `ap-push--signal` is the 44px red cylinder with a lit lip, for powering the appliance on; it has no long shadow.
- `ap-push--signal` is not pressed in, it rocks. With `aria-pressed="true"` (on) it is the reference's drawing: top half raised, lit lip at the top and LED on. Off is that geometry reversed: the cylinder rises 2px and the cap 7px, with 5px of dark lip and 2px of recess at the bottom. When off, the cap has a reflection at the bottom like the green button's. 80 ms jump, 50 ms on press and the LED 50 ms into the jump. The off state and the motion are additions, because the PSD only draws one.
- Momentary: `<button class="ap-push">` without `aria-pressed` or `.ap-led`. It is pressed only while held (`:active`) and returns on release, without keeping state. It works in cream and in `ap-push--olive`; not in `ap-push--signal`, which rocks.
- If it has `aria-pressed`, `components/bundle.js` toggles it on `click` and fires `change`; the LED follows that attribute.
- Don't: use more than one orange button per appliance, or buttons without a label below.
