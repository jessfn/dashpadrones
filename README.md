# dashpadrones

Dashboard interno de padrones (PpB, Fertilizantes, PEUA) — https://dashpadrones.sembrandodatos.com

## Estructura

```
frontend/   Vue 3 + Vite + Chart.js  (la interfaz)
  src/components/   piezas reutilizables (KpiCard, DataCard, gráficas, ...)
  src/views/        un panel por programa (PpbPanel, FertPanel, PeuaPanel)
  src/data/         datos fijos de respaldo y textos  <- aquí se actualizan cifras
  src/composables/  useSrep.js: consulta la API y cae al respaldo si falla
  src/styles/       estilos globales (variables de color, fondo)
backend/    FastAPI (Python)
  app/main.py       intermediario con la API SREP (guarda la API Key, caché 5 min)
deploy/     deploy.sh, servicio systemd y ejemplo de nginx
```

Flujo de datos: `navegador → /api/... (nginx) → FastAPI → API SREP`.
La API Key vive solo en el backend (`backend/.env`), nunca en el navegador ni en git.

## Desarrollo local

```bash
# Backend (terminal 1)
cd backend
python -m venv venv && venv\Scripts\activate      # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
copy .env.example .env                            # y escribe la SREP_API_KEY real (opcional)
uvicorn app.main:app --port 8010 --reload

# Frontend (terminal 2)
cd frontend
npm install
npm run dev                                       # http://localhost:5173  (/api -> 8010)
```

Sin `SREP_API_KEY` el dashboard funciona igual con los datos de respaldo.

## Flujo de despliegue (siempre Git primero)

1. Cambios en local → `git push origin main`
2. En el VPS: `deploy-dashpadrones` (git pull + dependencias + build + reinicio de la API)

## Seguridad

- Este repo es PÚBLICO: nunca subir API keys, tokens ni contraseñas.
- `backend/.env` está en `.gitignore`; usa `backend/.env.example` como plantilla.
