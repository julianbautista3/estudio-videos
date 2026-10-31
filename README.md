# Estudio de videos

Videos de marca hechos con código ([Remotion](https://www.remotion.dev)) para **ProDrivers**, **Fruit Santé** y cualquier otra marca que se agregue. Cada video se define con textos y fotos. Los MP4 se generan solos en GitHub.

## Cómo pedir un video nuevo

Abre una sesión de Claude Code con este repositorio y pide algo como:

> «Hazme un video vertical de Fruit Santé para San Valentín con las fotos de fresas, que diga…»

Claude agrega el video en `src/videos.ts`, lo sube, y GitHub genera el MP4.

## Dónde descargar los MP4

GitHub › pestaña **Actions** › la última ejecución de **Generar videos** › al final, **Artifacts › videos** (un .zip con los MP4). Se guardan 30 días.

Para generar a mano (por ejemplo, solo una marca): Actions › **Generar videos** › **Run workflow**, y escribe la marca o los ids.

## Qué hay aquí

| Carpeta / archivo | Qué es |
|---|---|
| `src/videos.ts` | **La lista de videos.** Cada entrada: id (nombre del MP4), marca, formato y textos. |
| `src/marcas/` | Una ficha por marca: colores, fuentes, logo y contacto. |
| `src/plantillas/` | Los formatos animados reutilizables. Hoy hay uno: `AnuncioProducto` (gancho → fotos y puntos → logo y llamado a la acción). |
| `public/marcas/<marca>/` | Logos y fotos de cada marca. |
| `public/fuentes/` | Las tipografías, guardadas aquí para que el video salga igual en cualquier equipo. |

**Formatos:** `vertical` 1080×1920 (Reels, TikTok, historias), `cuadrado` 1080×1080 (feed), `horizontal` 1920×1080.

## Agregar una marca

1. Crea `public/marcas/<marca>/` con el logo (PNG transparente) y las fotos.
2. Copia `src/marcas/fruit-sante.ts` como `src/marcas/<marca>.ts` y cambia colores, fuentes, logo y contacto. Si usa otra tipografía, pon el `.woff2` en `public/fuentes/`.
3. Regístrala en `src/marcas/index.ts`.

## En tu computador (opcional)

Con [Node.js](https://nodejs.org) 22 o más reciente:

```bash
npm install
npm run dev          # editor visual en el navegador: ves y ajustas cada video en vivo
npm run render       # genera todos los MP4 en out/
npm run render -- --marca=fruit-sante
```

## Licencia de Remotion

Remotion es gratis para personas y empresas de hasta 3 empleados. Una empresa más grande necesita la licencia de empresa: https://www.remotion.pro
