// Datos fijos (respaldo) y textos de cada programa.
// Los valores marcados como "en vivo" se reemplazan con la API cuando responde.
// Para actualizar cifras manualmente, edita SOLO este archivo.

export const CORTE_TEXTO = '30 de junio de 2026'
export const CORTE_CORTO = '30 jun 2026'

// Rutas SVG (viewBox 24x24) reutilizadas por las tarjetas
export const ICONS = {
  users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M9 9.5c0-1.1 1.3-2 3-2s3 .9 3 2-1.3 1.5-3 2-3 .9-3 2 1.3 2 3 2 3-.9 3-2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  trend: '<path d="M3 17l6-6 4 4 8-8M15 6h6v6"/>',
  package: '<path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3.3 7.5L12 12l8.7-4.5M12 22V12"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  bolt: '<path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>',
  plus: '<path d="M12 2v20M2 12h20"/>',
  hex: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/>',
  clock: '<path d="M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z"/>',
  circleCheck: '<path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.5 0 2.9.37 4.14 1.02"/>',
  dollar: '<path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>',
  arrows: '<path d="M3 21l18-18M9 3H3v6M15 21h6v-6"/>',
}

export const TABS = [
  { id: 'ppb', label: 'Producción para el Bienestar', icon: 'plus' },
  { id: 'fert', label: 'Fertilizantes', icon: 'hex' },
  { id: 'peua', label: 'PEUA', icon: 'bolt' },
]

const C = { guinda: '#9f1d46', oro: '#c9982e', gris: '#b6afb8', dark: '#6e1533', rosa: '#d98a9f', gris2: '#8b8290' }

export const PPB = {
  intro: {
    glow: 'rgba(159,29,70,0.10)',
    titulo: 'Producción para el Bienestar (PpB)',
    parrafos: [
      '<strong>Objetivo:</strong> incrementar los ingresos de las y los productores de pequeña y mediana escala mediante apoyo económico anual conforme al cultivo registrado, así como capacitación y acompañamiento técnico para prácticas agroecológicas sustentables.',
      '<strong>¿A quién apoya?</strong> productores de pequeña y mediana escala de cultivos prioritarios: maíz, frijol y café · caña de azúcar y cacao · nopal y miel · leche · cebolla, chile serrano y jitomate. Prioriza inclusión: al menos 28% mujeres y 45% en municipios con población indígena.',
    ],
  },
  // en vivo: poblacion_dispersada, poblacion_objetivo, monto_dispersado
  fallback: { poblacion_dispersada: 1577561, poblacion_objetivo: 1578594, monto_dispersado: 13098399600, poblacion_potencial: 1863585 },
  colores: [C.guinda, C.oro, C.gris],
  notaTabla: 'Dispersada y objetivo con corte al <strong style="color:var(--text-1)">30 de junio de 2026</strong>. La población potencial 2026 corresponde a las altas RENAPO derivadas del Oficio No. 222.0.-00193-2026.',
  info: [
    { icon: 'check', titulo: 'El SURI únicamente realiza', lista: ['Actualización de información de personas', 'Incorporación de personas al padrón', 'Registro de entrega de tarjetas'] },
    { icon: 'clock', titulo: 'Fuera del SURI', texto: 'La dispersión del apoyo, evaluación, autorización y pago se realizan fuera del sistema. Tampoco genera: listado de dispersión, validación de pago ni comprobante de depósito.' },
    { icon: 'circleCheck', titulo: 'Documentos que genera', lista: ['Acuse de actualización o incorporación', 'Acuse de entrega de tarjeta (o motivo de no entrega)'] },
    { icon: 'dollar', titulo: 'Apoyo económico', texto: 'Hasta 3 ha de cultivos prioritarios en temporal: <strong style="color:var(--guinda)">$7,300</strong>. Monto máximo: <strong style="color:var(--guinda)">$24,000</strong> por persona, más capacitación y acompañamiento técnico-organizativo.' },
  ],
}

export const FERT = {
  intro: {
    glow: 'rgba(201,152,46,0.14)',
    titulo: 'Padrón Fertilizantes para el Bienestar',
    parrafos: [
      '<strong>Objetivo general:</strong> contribuir a que la población productora agrícola incremente la producción de cultivos prioritarios a nivel nacional.',
      '<strong>Objetivo específico:</strong> entregar fertilizantes gratuitos a productores de cultivos prioritarios para la producción de alimentos.',
    ],
  },
  // en vivo: poblacion_dispersada
  fallback: { poblacion_objetivo: 2166043, poblacion_dispersada: 1869704 },
  modulos: [
    ['Configuración de beneficios / bultos', 'Reglas y topes'],
    ['Administrador de CEDAS', 'Alta / baja / actualización'],
    ['Gestión de trámite del programa', 'Solicitud → dictamen'],
    ['Gestión de suministros y fletes', 'Pedidos y traslados'],
    ['Recepción de flete (app móvil)', 'QR + inventario'],
    ['Entrega de fertilizante (app móvil)', 'QR + evidencia'],
    ['Reporte operativo / visor de evidencias', 'Consulta y seguimiento'],
  ],
  proceso: [
    { n: 1, titulo: 'Gestión y solicitud', texto: 'La oficina responsable genera las solicitudes y pide el fertilizante al proveedor (PEMEX).' },
    { n: 2, titulo: 'Suministro y transporte', texto: 'PEMEX surte el pedido y un flete lo transporta al centro de distribución (CEDA 1).' },
    { n: 3, titulo: 'Recepción en almacén', texto: 'El fertilizante ingresa al CEDA 1 para su almacenamiento y posterior distribución.' },
    { n: 4, titulo: 'Distribución al beneficiario', texto: 'Se entrega directamente al derechohabiente o se transfiere a un segundo almacén (CEDA 2).' },
  ],
}

export const PEUA = {
  intro: {
    glow: 'rgba(110,21,51,0.12)',
    titulo: 'Programa Especial de Energía para el Campo (PEUA)',
    parrafos: [
      'Subsidio de la Secretaría de Agricultura y Desarrollo Rural (antes SAGARPA) que otorga hasta un <strong style="color:#6e1533">95% de descuento</strong> en la tarifa de luz para el bombeo y rebombeo de agua para uso de riego agrícola. Participan la CFE y la CONAGUA.',
    ],
  },
  // Sin endpoint en la API SREP: datos fijos
  estatus: [
    { nombre: 'Activo', valor: 65228, color: C.guinda },
    { nombre: 'Baja RENAPO', valor: 203, color: C.oro },
    { nombre: 'Difunto', valor: 1865, color: C.rosa },
    { nombre: 'No localizado', valor: 50, color: C.dark },
    { nombre: 'No registrado en BD', valor: 2809, color: C.gris },
    { nombre: 'Otro', valor: 3, color: C.gris2 },
  ],
  requisitos: [
    'Identificación oficial vigente (INE o pasaporte)',
    'CURP',
    'Comprobante de domicilio reciente',
    'Último recibo de luz de la CFE',
    'Documento que acredite la posesión legal del predio o derecho al agua',
  ],
  tramite: 'Acudir a los Distritos de Desarrollo Rural (DDR) o Centros de Apoyo al Desarrollo Rural (CADER) más cercanos. Las y los participantes deben estar al corriente con la CFE y CONAGUA.',
}
