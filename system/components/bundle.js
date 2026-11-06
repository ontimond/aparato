/* Aparato: PushButton and Knob behaviour, driven by the markup. Every change fires a bubbling 'change'. */
window.Aparato = (function () {
  function notify(el) { el.dispatchEvent(new Event('change', { bubbles: true })); }
  function val(el) { return +el.getAttribute('aria-valuenow'); }
  function keys(el, step, set) {
    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { set(val(el) + step); e.preventDefault(); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { set(val(el) - step); e.preventDefault(); }
    });
  }
  function push(b) {
    b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); notify(b); });
  }
  // selector: 3 positions; bundle.css sets the turn from aria-valuenow. aria-valuetext comes from data-labels="uv off ir"
  function selector(k) {
    var labels = (k.dataset.labels || '').split(' ');
    function set(n) {
      n = Math.max(0, Math.min(2, n));
      k.setAttribute('aria-valuenow', n);
      if (labels[n]) k.setAttribute('aria-valuetext', labels[n]);
      notify(k);
    }
    k.addEventListener('click', function () { set((val(k) + 1) % 3); });
    keys(k, 1, set);
  }
  // knurled: 0–100 over 270°, --turn from −135° to 135°
  function knurl(k) {
    var raw = val(k), a0;
    function set(n, silent) { raw = Math.max(0, Math.min(100, n)); var v = Math.round(raw); k.style.setProperty('--turn', (v * 2.7 - 135) + 'deg'); k.setAttribute('aria-valuenow', v); if (!silent) notify(k); }
    // ponytail: within 8px of the axis the angle is unreliable, so it does not turn; the radius is by eye
    function angle(e) {
      var r = k.getBoundingClientRect(), x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
      return Math.hypot(x, y) < 8 ? null : Math.atan2(y, x) * 180 / Math.PI;
    }
    k.addEventListener('pointerdown', function (e) { a0 = angle(e); k.setPointerCapture(e.pointerId); });
    k.addEventListener('pointermove', function (e) {
      if (!k.hasPointerCapture(e.pointerId)) return;
      var a = angle(e);
      if (a !== null && a0 !== null) set(raw + ((a - a0 + 540) % 360 - 180) / 2.7); // 270° of turn = 0–100
      a0 = a;
    });
    k.addEventListener('wheel', function (e) { set(val(k) - e.deltaY / 20); e.preventDefault(); }, { passive: false });
    keys(k, 5, set); set(raw, true);
  }
  // attaches whatever is under root (the whole document by default); call it again only for markup added later
  function attach(root) {
    root = root || document;
    root.querySelectorAll('.ap-push[aria-pressed]').forEach(push);
    root.querySelectorAll('.ap-knob[role=slider]').forEach(selector);
    root.querySelectorAll('.ap-knurl[role=slider]').forEach(knurl);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { attach(); }); else attach();
  return { attach: attach };
})();
