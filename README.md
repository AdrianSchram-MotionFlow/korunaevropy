# Koruna Evropy — nasazení na Netlify (s Netlify Blobs)

## Co je v projektu
- `index.html` — celá appka (frontend)
- `netlify/functions/data.mjs` — serverless funkce, přes kterou appka čte/zapisuje data do Netlify Blobs
- `netlify.toml` — konfigurace Netlify (kde jsou funkce, co se publikuje)
- `package.json` — závislosti pro funkci

## Krok 1 — příprava projektu lokálně
1. Rozbal tuto složku a otevři ji v PHPStormu jako projekt.
2. V terminálu v kořeni projektu spusť:
   ```
   npm install @netlify/blobs
   ```
   Tím se vytvoří `node_modules`, `package-lock.json` a doplní se závislost do `package.json`.

## Krok 2 — GitHub (stejně jako u ostatních projektů)
```
git init
git add .
git commit -m "Koruna Evropy - init"
```
Vytvoř nový repozitář na GitHubu a napushuj:
```
git remote add origin <URL tvého repa>
git branch -M main
git push -u origin main
```

## Krok 3 — Netlify
1. V Netlify: **Add new site → Import an existing project → GitHub** → vyber repozitář.
2. Build settings:
   - **Build command:** nech prázdné (nic se nebuildí, je to statický HTML)
   - **Publish directory:** `.`
3. Deploy site.

Netlify si funkci v `netlify/functions/data.mjs` a `netlify.toml` najde automaticky. **Netlify Blobs nevyžaduje žádné API klíče ani ruční nastavení** — funguje automaticky pro každý nasazený site.

## Krok 4 — ověření
1. Otevři vygenerovanou Netlify URL (něco jako `https://tvuj-projekt.netlify.app`).
2. Zaškrtni si nějakou položku (např. návštěvu Česka).
3. Obnov stránku (F5) — mělo by to zůstat uložené. Pokud ano, Blobs fungují správně.
4. Zkus appku otevřít z jiného zařízení/prohlížeče na stejné URL — data by měla být stejná (jsou uložená na serveru, ne v prohlížeči).

## Krok 5 — vlastní doména (volitelné)
Stejně jako u předchozích projektů: v Netlify **Domain settings → Add a domain**, pak v administraci Seznamu nastav DNS (CNAME/A záznam) podle instrukcí, které ti Netlify zobrazí.

## Poznámky
- Fotky se před uložením zmenší a zkomprimují v prohlížeči (menší přenos, rychlejší appka).
- Data jsou globálně sdílená v rámci tvého site (žádné přihlašování) — pokud appku sdílíš s někým dalším, uvidí/upraví stejná data. Pro čistě osobní použití je to v pořádku.
- Pokud se ti nezobrazí uložená data hned po refreshi, zkontroluj v Netlify **Functions** logu, jestli funkce `data` nehází chybu (obvykle chybějící `@netlify/blobs` v `node_modules` při buildu — zkontroluj že je v `package.json`).
