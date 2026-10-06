# dashpadrones

Dashboard interno de padrones (PPB, Fertilizantes, PEUA) — https://dashpadrones.sembrandodatos.com

## Flujo de despliegue
1. Cambios en local -> `git push origin main`
2. En el VPS: `deploy-dashpadrones` (hace `git pull` y copia `index.html` al sitio)

## Seguridad
- Este repo es PÚBLICO: nunca subir API keys, tokens ni contraseñas.
- La API Key de SREP vive solo en el VPS (`/etc/nginx/suri_apikey.conf`, permisos 600).
  El navegador consulta `/suri/...` y nginx reenvía a la API de SREP agregando la llave.
