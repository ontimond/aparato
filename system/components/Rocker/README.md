# Rocker

Orange 26×42 rocker switch in a dark recess, with an LED above: the appliance's mains switch.

- Structure: `<div class="ap-ctl">` with `<span class="ap-led">`, `<input type="checkbox" class="ap-rocker" role="switch" aria-label>` and `<span class="ap-cap">`.
- The pressed half (`signal-deep`, with an inner highlight) is at the bottom; when checked it rises 5px without flipping, because the light does not rotate with the part. It covers the top highlight and uncovers a strip of the face at the bottom. The pink rims and the top highlight come from the reference; the checked state and the motion are additions.
- Motion: it jumps in 80 ms; on press it gives 1px in 50 ms, only with `hover`; the LED changes at 50 ms. With reduced motion, no transitions.
- The LED lights up only when the switch is checked. No JavaScript: read `checked`.
- One per appliance, for the power supply or the function that wakes it.
- Don't: use several rockers in a row (use Lever for that), or rockers in another colour.
