"""API del dashboard de padrones.

Hace de intermediario entre el navegador y la API SREP de la Secretaría de
Agricultura: la API Key vive solo aquí (variable de entorno), nunca llega al
frontend. Cada respuesta se guarda en caché unos minutos y, si SREP falla,
se sirve el último dato bueno (stale-if-error).
"""
import asyncio
import os
import time
from contextlib import asynccontextmanager

import httpx
from fastapi import FastAPI

SREP_BASE_URL = os.getenv("SREP_BASE_URL", "https://www.suri.agricultura.gob.mx:8009/api/indicadores")
SREP_API_KEY = os.getenv("SREP_API_KEY", "")
FECHA_CORTE = os.getenv("SREP_FECHA_CORTE", "2026-06-30")
CACHE_TTL = int(os.getenv("CACHE_TTL_SECONDS", "300"))
TIMEOUT = float(os.getenv("SREP_TIMEOUT_SECONDS", "20"))

_cache: dict[str, tuple[float, object]] = {}
_client: httpx.AsyncClient | None = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    global _client
    _client = httpx.AsyncClient(timeout=TIMEOUT, headers={"X-API-KEY": SREP_API_KEY})
    yield
    await _client.aclose()


app = FastAPI(title="Dashpadrones API", docs_url="/api/docs", openapi_url="/api/openapi.json", lifespan=lifespan)


async def srep(path: str, params: dict | None = None):
    """Consulta un endpoint de SREP. Devuelve `data` o None si falla."""
    key = path + repr(sorted((params or {}).items()))
    hit = _cache.get(key)
    if hit and time.time() - hit[0] < CACHE_TTL:
        return hit[1]
    try:
        r = await _client.get(f"{SREP_BASE_URL}/{path}", params=params)
        body = r.json()
        if r.status_code == 200 and body.get("success"):
            _cache[key] = (time.time(), body["data"])
            return body["data"]
    except (httpx.HTTPError, ValueError):
        pass
    return hit[1] if hit else None  # dato viejo si existe


@app.get("/api/health")
async def health():
    return {"ok": True, "api_key_configurada": bool(SREP_API_KEY), "fecha_corte": FECHA_CORTE}


@app.get("/api/ppb")
async def ppb():
    general, dispersion = await asyncio.gather(
        srep("ppb"), srep("ppb/dispersion", {"fechaCorte": FECHA_CORTE})
    )
    return {
        "fecha_corte": FECHA_CORTE,
        "poblacion_objetivo": (general or {}).get("poblacion_objetivo"),
        "poblacion_dispersada": (dispersion or {}).get("poblacion_dispersada"),
        "monto_dispersado": (dispersion or {}).get("monto_dispersado"),
    }


@app.get("/api/fertilizantes")
async def fertilizantes():
    dispersion = await srep("fertilizantes/dispersion", {"fechaCorte": FECHA_CORTE})
    return {
        "fecha_corte": FECHA_CORTE,
        "poblacion_dispersada": (dispersion or {}).get("poblacion_dispersada"),
    }


@app.get("/api/tortillerias")
async def tortillerias():
    """Aún no se usa en el frontend; queda listo para una futura pestaña."""
    estatus, por_entidad, por_tipo = await asyncio.gather(
        srep("tortillerias/estatus"),
        srep("tortillerias/estatus/entidades"),
        srep("tortillerias/estatus/tipos"),
    )
    return {"estatus": estatus, "por_entidad": por_entidad, "por_tipo": por_tipo}
