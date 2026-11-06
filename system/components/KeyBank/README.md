# KeyBank

Square 50px keys with a concave 44px dish, set together in a recess with a ring. The chosen one has an orange dot in the centre.

- Structure: `ap-bank` › `<div class="ap-keys" role="radiogroup" aria-label>` with 2 to 5 `<label class="ap-key"><input type="radio" name aria-label><span></span></label>`, and below it `<div class="ap-key-caps ap-scale" aria-hidden="true">` with one short label per key (the name that is read is each radio's `aria-label`).
- It goes without `ap-ctl`: `ap-bank` already acts as the container, with its recess and ring.
- The keys overlap by 1px: the 1px black stroke stays as a single line between them, as in the reference.
- On press (`:active`), the base gets `pressed`. Chosen = `dot` dot, not pressed in.
- It is a native radio group: arrow keys to move, read `checked`.
- Don't: have several keys active at once (use PushButton for that), or more than five keys.
