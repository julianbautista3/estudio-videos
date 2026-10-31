# Instrucciones para Claude

Repositorio de videos de marca con Remotion 4. El dueño habla español y no es programador: respóndele en español y en lenguaje de negocio.

## Flujo para un video nuevo
1. Agrega una entrada en `src/videos.ts`. El id es `<marca>-<tema>-<formato>`; el render filtra por marca usando ese prefijo.
2. Revisa los tipos con `npm run typecheck`.
3. Genera fotogramas de muestra de cada escena y míralos antes de subir:
   `npx remotion still <id> out/prueba.png --frame=<n> --scale=0.4`
   Escenas de `AnuncioProducto` (30 fps): gancho 0–74, detalle 75–(75+max(150, 45+45·puntos)), cierre 120 frames.
4. Haz commit y push a `main`. El workflow `Generar videos` publica los MP4 como artifact.

## Reglas
- No inventes afirmaciones de producto, precios ni promociones. Usa lo que diga el usuario o la web de la marca. Si algo es borrador, márcalo con un comentario en `videos.ts`.
- Las fuentes son locales (`public/fuentes/`, subset latin): no uses `@remotion/google-fonts`, que no carga en entornos con proxy.
- Las plantillas escalan con `useU()` (1 = 1px en 1080 de ancho). Toda medida nueva se multiplica por `u`.
- Assets de cada marca en `public/marcas/<marca>/`. De Fruit Santé hay más fotos en la tienda de Shopify (fruitsante.co/cdn/shop/files/…).
