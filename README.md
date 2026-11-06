# Aparato

A skeuomorphic design system in plain CSS: a precision appliance in the Braun tradition, with a light panel, dished keys, knobs, graphite levers and a single orange signal.

## Contents

| Path | What it is |
|---|---|
| `system/tokens.json` | Source of every value (color, type, spacing, radius, shadow). |
| `system/tokens.css` | The tokens as CSS custom properties, generated with `python3 system/tokens_css.py system/tokens.json > system/tokens.css`. |
| `system/components/bundle.css` | All component CSS, prefixed `ap-`. |
| `system/components/bundle.js` | Behavior for PushButton (toggle) and Knob (turning), wired from the markup. |
| `system/components/<Component>/` | Usage notes (`README.md`) and a preview for each component. |
| `index.html` | Example page with every component working, published with GitHub Pages. |

Components: KeyBank, PushButton, Knob (selector and knurled), ChannelSwitch, Lever and Rocker.

## Run locally

```sh
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.

## Credits

- Original design: ["Braun UI"](https://dribbble.com/shots/597337-Braun-UI) by Adrien Olczak, on Dribbble.
- Values were measured from ["Free Website UI .PSD"](https://www.deviantart.com/yesimadesigner/art/Free-Website-UI-.PSD-425937630), posted by YesIMaDesigner on DeviantArt. The PSD is not included in this repository. The arrow path of the ChannelSwitch (`.ap-chan`) is taken from it.

Braun is a registered trademark of its owner. This project is not affiliated with or endorsed by Braun.

## License

The code is released under the [MIT License](LICENSE). It does not cover the original design or the ChannelSwitch arrow path, which belong to their authors.
