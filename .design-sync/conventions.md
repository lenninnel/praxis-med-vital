# Konventionen — Praxis Med Vital (Warm Minimal)

Klassisches CSS-Klassen-System, kein Framework, kein Provider/Wrapper nötig. `styles.css` bringt Reset, Tokens (`:root`-Custom-Properties), selbst gehostete Fonts (Cormorant Garamond + Jost) und das komplette Klassen-Vokabular mit. Der `body` bekommt automatisch Jost 300 / 15px auf `--cream`-Grund; Headlines (`h1–h6`) sind automatisch Cormorant Garamond kursiv.

## Styling-Idiom

Vorhandene Klassen verwenden, eigenes Layout-Glue mit `var(--*)`-Tokens stylen. Keine neuen Farbwerte erfinden — nur Tokens:

- **Kern-Palette:** `--cream #f5f0e8` (Grund), `--ink #1a100a` / `--ink-mid` / `--ink-lt` (Text), `--sage #6b5c4a` (Warm Stone — dunkle Flächen; der Name ist historisch, der Wert ist Braun, nicht Grün), `--stone #5a4d42` (Footer), `--white`, `--cream-dk`, `--border` (Hairlines).
- **Akzent:** `--gold #c4a05a`, auf dunklen Flächen `--gold-lt`. Nur als feine Linie/Detail, nie als Fläche.
- **Nicht verwenden (Legacy):** `--g900`–`--g50`, `--amber`, `--amber-dk`, Klasse `.sec--g900`.

Klassen-Vokabular (Auszug — vollständig in `styles.css`):

| Familie | Klassen |
|---|---|
| Sektionen | `.sec` + Modifier `.sec--cream`, `.sec--cream-dk`, `.sec--white`, `.sec--sage`, `.sec--stone`, `.sec--sage-lt`, `.sec--stone-lt` (dunkle Modifier stylen `.section-title`/`.section-sub`/`.eyebrow` automatisch um) |
| Überschriften-Muster | `.eyebrow` (uppercase-Label mit Goldlinie), `.section-title`, `.section-sub`, `.text-center` |
| Buttons | `.btn-primary`, `.btn-ghost`, `.btn-outline` (+ `--dark`-Varianten) |
| Karten | `.team-card` (+ `__avatar`, `__name`, `__role`, `__bio`), `.leistung-card` (+ `__num`, `__title`, `__desc`, `__items`), `.standort-card`, `.feature` (für dunkle Sektionen) |
| Grids | `.team-grid`, `.leistung-grid`, `.card-grid`, `.features-grid`, `.two-col`, `.contact-grid`, `.container` |
| Formulare | `.contact-form`, `.form-group`, `.full`, `.contact-form-wrap` |
| Seiten-Bausteine | `.page-header`, `.hero` (+ `__content`, `__title`, `__sub`, `__actions`, `__tel`), `.trust-bar`, `.site-header`/`.nav`, `.site-footer`/`.footer-grid`, `.hours-table`, `.tag-list`/`.tag`, `.back-link`, `.coming-soon` |

## Formregeln

`border-radius: 0` überall (Ausnahme: runde Avatare). Rahmen als 0.5px-Hairlines in `--border`. Kartenraster mit `gap:1px` auf `--border`-Hintergrund. Headlines kursiv, einzelne Wörter per `<em>` (wird in `.hero__title` automatisch gold). Labels uppercase mit `letter-spacing: .1em–.22em`.

## Wahrheitsquelle

Vor dem Stylen `styles.css` lesen (vollständiges Vokabular + Tokens), `tokens/tokens.json` (Token-Referenz mit Verwendungszweck) und `guidelines/design-language.md` (Design-Sprache).

## Idiomatisches Beispiel

```html
<section class="sec sec--cream-dk">
  <div class="container">
    <span class="eyebrow">Unsere Leistungen</span>
    <h2 class="section-title">Therapie, die <em>wirkt</em></h2>
    <p class="section-sub">Individuell abgestimmte Behandlung an zwei Standorten.</p>
    <div class="leistung-grid" style="margin-top:48px">
      <div class="leistung-card">
        <div class="leistung-card__num">01</div>
        <h3 class="leistung-card__title">Manuelle Therapie</h3>
        <p class="leistung-card__desc">Gezielte Mobilisation von Gelenken und Wirbelsäule.</p>
        <a class="btn-ghost" href="#">Mehr erfahren →</a>
      </div>
    </div>
  </div>
</section>
```
