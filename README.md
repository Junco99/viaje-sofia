# Sofía, 7–9 de noviembre de 2026

Nuestro plan para Sofía en una web para el móvil: ruta día a día con mapa, reservas pendientes, precios, comida que probar, búlgaro básico y cómo no quedar como guiris.

Es una web estática (HTML, CSS y JavaScript, sin servidor), así que se puede publicar gratis en GitHub Pages.

## Cambiar el plan

Todo el contenido está en [`js/data.js`](js/data.js): paradas, horas, precios, reservas, frases… Editad ese archivo y volved a subirlo.

Si cambiáis algo y en el móvil no se ve, subid el número de `?v=2` en `index.html` (en las líneas de `styles.css`, `data.js` y `app.js`).

## Verla en local

```bash
python -m http.server 8000
```

Y abrid http://localhost:8000

## Publicarla en GitHub Pages

1. Cread un repositorio vacío en GitHub, por ejemplo `viaje-sofia`.
2. Desde esta carpeta:

```bash
git init
git add .
git commit -m "Plan de Sofía"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/viaje-sofia.git
git push -u origin main
```

3. En GitHub: **Settings → Pages → Branch: main, carpeta / (root) → Save**.
4. En un minuto estará en `https://TU_USUARIO.github.io/viaje-sofia/`. Ese es el enlace para el grupo.

Los checks de reservas y comidas se guardan en cada móvil, no se comparten entre vosotros.

Precios y horarios aproximados: comprobadlos antes de ir. Mapa © colaboradores de OpenStreetMap.
