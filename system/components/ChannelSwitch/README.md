# ChannelSwitch

Seven-position selector: a 101×41 graphite arrow rotates over a scale printed from 1 to 7, with lines that fan out around it.

- Structure: `ap-ctl` › `<div class="ap-chan" role="radiogroup" aria-label>` with `<span class="ap-chan-arrow" aria-hidden="true"></span>` and seven `<label class="ap-chan-step"><input type="radio" name value><span class="ap-scale">1</span></label>`, and below it the `ap-cap` label.
- It is a native radio group and uses no JavaScript: choose with the number, with its line or with the arrow keys (down moves down the scale). One option carries `checked`, and `:has()` turns it into `--turn`. The arrow cannot be dragged.
- The shapes rotate and the light does not: the arrow's filter sits outside the rotating element, and the shadow keeps falling downwards.
- The reference only draws position 4. The axis, at the centre of the arrow, and the angles (±20.4°, ±42.5° and ±66°, towards the end of each line) are an assumption. That is why the steps are unequal.
- The rows measure 20px, as in the reference; they fall short of the 24px in WCAG 2.5.8.
- With the arrow keys, 7 wraps to 1, as in any native radio group: the arrow rotates back 132°.
- Don't: use another number of positions (the angles and lines are for seven), or long labels on the scale.
