# LuciLinkWorld

Electronics wholesale site. Shenzhen and nearby; stock from Huaqiang North. Brand name only: **LuciLinkWorld**. No company name.

| Item | Value |
| --- | --- |
| Brand | LuciLinkWorld |
| Email | LuciLinkWorld@gmail.com |
| WeChat / WhatsApp | LuciLinkWorld |
| Place | Huaqiang North, Shenzhen, China |
| Languages | Chinese, English |

## Locked color (web / 3C)

Huaqiangbei electric cyan on a bright page. Do not go back to gold, Facebook blue, or a full black background.

| Token | Hex | Use |
| --- | --- | --- |
| Accent / cyan | `#3AD0FF` | Logo, primary buttons |
| Cyan deep | `#00A8C7` | Nav active, kicker, links |
| Cyan hover | `#0089A3` | Hover |
| Accent ink | `#0A1520` | Text on cyan buttons |
| Accent soft | `rgba(58, 208, 255, 0.18)` | Focus ring, selected filter |
| Ink | `#12303C` | Headings, body |
| Muted | `#5A7582` | Secondary text |
| Page | `#F4FBFE` | Site background |
| Surface | `#FFFFFF` | Header, cards, footer, form |
| Line | `#C5E4EE` | Borders |
| Sky mid | `#E7F6FB` | Soft bands |
| WeChat | `#31A24C` | Float button only |
| WhatsApp | `#25D366` | Float button only |
| Danger | `#E24B63` | Form errors |

CSS lives in `css/site.css` (`:root`). Matching wordmarks: `../brandlogo/logo/lucilink-cyan.svg`, `lucilink-ink.svg`. Rebuild the kit with `python ../brandlogo/scripts/render_lucilink_kit.py cyan`.

## Facebook cover

Personal profile cover (1640 × 624, upload this to Facebook):

`assets/social/facebook-cover.png`

Logo + intro copy + WeChat / WhatsApp QR. Same locked cyan palette. Rebuild: `python ../brandlogo/scripts/render_lucilink_kit.py facebook`.

## Local preview

```bash
python -m http.server 5173
```

Then open `http://127.0.0.1:5173/index.html`.
