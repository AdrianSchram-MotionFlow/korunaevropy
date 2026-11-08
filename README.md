# Koruna Evropy · Projekt 25

Veřejný tracker nejvyšších vrcholů evropských zemí. Statická stránka pro GitHub Pages.

- `index.html` – stránka (mapa, počítadlo, karty vrcholů, logistika)
- `data.json` – všechna data: stav vrcholů, logistika, plán dalších výstupů, vrcholy mimo výzvu
- `photos/` – fotky z vrcholů (zmenšené, max. ~1600 px)

## Jak přidat vrchol
V `data.json` do `peaks` pod id země (např. `"slovakia"`) přidej záznam se `status` (`done`, `planned`, `attempt`),
`date`, `photo`, `stats` (`km`, `up`, `time`), `diff` (1–5), `terrain` (1–5), `weather` (`sun`, `cloud`, `rain`, `snow`, `storm`),
`rating` (1–5), `tldr`, `post` a volitelně `logistics`.
