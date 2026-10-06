<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  label: String,
  value: { type: Number, required: true },
  money: Boolean,
  decimals: { type: Number, default: 0 },
  unit: String,
  foot: String,
  icon: String,
  iconBg: String,
  iconColor: String,
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const visible = ref(false)
const shown = ref(0)
let raf = 0
let io

const format = (n) => {
  const txt = props.decimals
    ? n.toFixed(props.decimals)
    : Math.floor(n).toLocaleString('es-MX')
  return props.money ? '$' + txt : txt
}

// Anima desde lo que se muestra ahora hasta el valor final (easeOutCubic)
function animar(hasta, ms = 1400) {
  cancelAnimationFrame(raf)
  const desde = shown.value
  const t0 = performance.now()
  const paso = (now) => {
    const p = Math.min((now - t0) / ms, 1)
    shown.value = desde + (hasta - desde) * (1 - Math.pow(1 - p, 3))
    if (p < 1) raf = requestAnimationFrame(paso)
    else shown.value = hasta
  }
  raf = requestAnimationFrame(paso)
}

onMounted(() => {
  io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      visible.value = true
      animar(props.value)
      io.disconnect()
    }
  }, { threshold: 0.2 })
  io.observe(el.value)
})
// Si llega un valor nuevo (datos en vivo), vuelve a animar
watch(() => props.value, (v) => visible.value && animar(v, 900))
onBeforeUnmount(() => { cancelAnimationFrame(raf); io?.disconnect() })
</script>

<template>
  <div ref="el" class="kpi-card" :class="{ reveal: visible }"
       :style="{ '--icon-bg': iconBg, '--icon-color': iconColor, animationDelay: delay + 'ms' }">
    <div class="glow"></div>
    <div class="icon-wrap"><Icon :name="icon" /></div>
    <div class="label">{{ label }}</div>
    <div class="value"><span>{{ format(shown) }}</span><span v-if="unit" class="unit">{{ unit }}</span></div>
    <div v-if="foot" class="foot">{{ foot }}</div>
  </div>
</template>

<style>
  /* KPI grid */
  .kpi-grid{
    display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));
    gap:12px; margin-bottom:20px;
  }
  .kpi-card{
    position:relative; background:#ffffff; border:1px solid var(--border);
    border-radius:var(--radius-md); padding:16px 16px 14px; overflow:hidden;
    box-shadow: 0 10px 26px -18px rgba(36,24,32,0.25);
    transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease;
    opacity:0; transform:translateY(16px); min-width:0;
  }
  .kpi-card.reveal{ animation: kpiIn .6s cubic-bezier(.25,.8,.35,1) forwards; }
  @keyframes kpiIn{ to{ opacity:1; transform:translateY(0);} }
  .kpi-card:hover{ transform:translateY(-3px); border-color:rgba(159,29,70,0.25); box-shadow:0 16px 30px -18px rgba(159,29,70,0.28); }
  .kpi-card .icon-wrap{
    width:32px; height:32px; border-radius:9px; display:flex; align-items:center; justify-content:center;
    margin-bottom:11px; background:var(--icon-bg); color:var(--icon-color);
  }
  .kpi-card .icon-wrap svg{ width:16px; height:16px; }
  .kpi-card .label{ font-size:10.5px; color:var(--text-2); font-weight:600; text-transform:uppercase; letter-spacing:.03em; margin-bottom:5px; }
  .kpi-card .value{ font-family:'Montserrat',sans-serif; font-size:clamp(15px,1.8vw,19px); font-weight:800; color:var(--text-0); line-height:1.15; word-break:break-word; }
  .kpi-card .value .unit{ font-size:12px; font-weight:600; color:var(--text-2); margin-left:3px; }
  .kpi-card .foot{ margin-top:7px; font-size:10.5px; color:var(--text-2); line-height:1.4; }
  .kpi-card .glow{ position:absolute; inset:auto -30% -50% auto; width:160px; height:160px; border-radius:50%;
    background:radial-gradient(circle, var(--icon-color), transparent 70%); opacity:.06; pointer-events:none; }
</style>
