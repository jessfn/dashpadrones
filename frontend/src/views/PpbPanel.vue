<script setup>
import { computed } from 'vue'
import { PPB, ICONS, CORTE_CORTO, CORTE_TEXTO } from '../data/programas'
import { useSrep, vivoOr } from '../composables/useSrep'
import IntroCard from '../components/IntroCard.vue'
import KpiCard from '../components/KpiCard.vue'
import DataCard from '../components/DataCard.vue'
import BarChart from '../components/BarChart.vue'
import InfoGrid from '../components/InfoGrid.vue'

const live = useSrep()
const fb = PPB.fallback

const dispersada = computed(() => vivoOr(live.ppb.poblacion_dispersada, fb.poblacion_dispersada))
const objetivo = computed(() => vivoOr(live.ppb.poblacion_objetivo, fb.poblacion_objetivo))
const monto = computed(() => Math.round(vivoOr(live.ppb.monto_dispersado, fb.monto_dispersado)))
const potencial = fb.poblacion_potencial

const fmt = (n) => n.toLocaleString('es-MX')
const [cD, cO, cP] = PPB.colores

const kpis = computed(() => [
  { label: 'Población dispersada', value: dispersada.value, foot: `Corte al ${CORTE_CORTO} · Monto: $${fmt(monto.value)}`, icon: 'users', iconBg: 'rgba(159,29,70,0.10)', iconColor: '#9f1d46' },
  { label: 'Población objetivo', value: objetivo.value, foot: `Corte al ${CORTE_TEXTO}`, icon: 'target', iconBg: 'rgba(201,152,46,0.14)', iconColor: '#c9982e' },
  { label: 'Población potencial 2026', value: potencial, foot: 'Altas RENAPO · Oficio 222.0.-00193-2026', icon: 'check', iconBg: 'rgba(182,175,184,0.22)', iconColor: '#b6afb8' },
  { label: 'Monto dispersado', value: monto.value, money: true, foot: `Producción para el Bienestar · Corte al ${CORTE_CORTO}`, icon: 'coin', iconBg: 'rgba(159,29,70,0.10)', iconColor: '#9f1d46' },
])
const serie = computed(() => [dispersada.value, objetivo.value, potencial])
</script>

<template>
  <section class="panel">
    <IntroCard :intro="PPB.intro" />

    <div class="kpi-grid">
      <KpiCard v-for="(k, i) in kpis" :key="k.label" v-bind="k" :delay="i * 80" />
    </div>

    <div class="grid-2">
      <DataCard title="Población por corte" sub="Comparativo de registros — Producción para el Bienestar">
        <BarChart :labels="['Dispersada', 'Objetivo', 'Potencial 2026']" :data="serie" :colors="PPB.colores" />
      </DataCard>

      <DataCard title="Detalle de registros" :sub="`Cifras de control · PpB · Corte al ${CORTE_TEXTO}`">
        <table class="data-table">
          <thead><tr><th>Concepto</th><th style="text-align:right">Registros</th></tr></thead>
          <tbody>
            <tr><td><span class="swatch" :style="{ background: cD }"></span>Población dispersada</td><td class="num">{{ fmt(dispersada) }}</td></tr>
            <tr><td><span class="swatch" :style="{ background: cO }"></span>Población objetivo</td><td class="num">{{ fmt(objetivo) }}</td></tr>
            <tr><td><span class="swatch" :style="{ background: cP }"></span>Población potencial 2026</td><td class="num">{{ fmt(potencial) }}</td></tr>
          </tbody>
        </table>
        <p class="nota" v-html="PPB.notaTabla"></p>
      </DataCard>
    </div>

    <DataCard title="¿Cómo opera?" sub="Alcance del SURI y componentes del apoyo">
      <InfoGrid :items="PPB.info" />
    </DataCard>
  </section>
</template>

<style>
.panel .nota { margin-top: 14px; font-size: 12px; color: var(--text-2); line-height: 1.6; }
</style>
