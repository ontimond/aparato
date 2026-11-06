# Lever

Two-position lever in a black slot with a ring, with the "0 · 1" scale beside it.

- Structure: `ap-ctl` › `<div class="ap-lever-ctl">` with two `ap-scale` ("0" on top, "1" below) and `<input type="checkbox" class="ap-lever" role="switch" aria-label>`; below it, the `ap-cap` label.
- `ap-lever`: 6px slot and a flat 18×9 cream thumb that travels 24px, with a `handle` shadow.
- `ap-lever ap-lever--bat` (both classes): 9px slot and a cylindrical graphite lever coming out of the slot: a 16×32 capsule with a 1px stroke and, on top, a 16×12 elliptical cap with a light edge. At 1 it hangs down and casts its long shadow. When it changes it travels 32px without flipping: the cap slides to the other end, the shadow fades at the same pace and the light does not change direction. The PSD only draws position 1; position 0, the motion and the fade are additions.
- Choose one type per appliance. Down (1) is on. No JavaScript: read `checked`.
- Don't: use horizontal levers, or more than two positions.
