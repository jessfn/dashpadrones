import { reactive } from 'vue'

// Datos en vivo (se llena una sola vez por sesión). Cada campo es null hasta
// que la API responde; así los componentes caen a los datos de respaldo.
const live = reactive({
  ppb: { poblacion_objetivo: null, poblacion_dispersada: null, monto_dispersado: null },
  fert: { poblacion_dispersada: null },
  cargado: false,
  ok: false, // true si al menos un dato real llegó
})

let promesa = null

async function pedir(ruta) {
  try {
    const r = await fetch(ruta, { cache: 'no-store' })
    return r.ok ? await r.json() : null
  } catch {
    return null
  }
}

export function useSrep() {
  if (!promesa) {
    promesa = Promise.all([pedir('/api/ppb'), pedir('/api/fertilizantes')]).then(([ppb, fert]) => {
      if (ppb) Object.assign(live.ppb, {
        poblacion_objetivo: ppb.poblacion_objetivo,
        poblacion_dispersada: ppb.poblacion_dispersada,
        monto_dispersado: ppb.monto_dispersado,
      })
      if (fert) live.fert.poblacion_dispersada = fert.poblacion_dispersada
      live.ok = [ppb?.poblacion_objetivo, ppb?.poblacion_dispersada, fert?.poblacion_dispersada].some(v => v != null)
      live.cargado = true
    })
  }
  return live
}

// Devuelve el valor en vivo si existe; si no, el de respaldo.
export const vivoOr = (vivo, respaldo) => (vivo == null ? respaldo : vivo)
