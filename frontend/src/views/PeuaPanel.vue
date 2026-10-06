<script setup>
import { computed } from 'vue'
import { PEUA, CORTE_CORTO, CORTE_TEXTO } from '../data/programas'
import IntroCard from '../components/IntroCard.vue'
import KpiCard from '../components/KpiCard.vue'
import DataCard from '../components/DataCard.vue'
import DoughnutChart from '../components/DoughnutChart.vue'
import InfoGrid from '../components/InfoGrid.vue'

const fmt = (n) => n.toLocaleString('es-MX')
const total = PEUA.estatus.reduce((s, e) => s + e.valor, 0)
const valor = (nombre) => PEUA.estatus.find((e) => e.nombre === nombre).valor

const kpis = computed(() => [
  { label: 'Total general', value: total, foot: `Confronta RENAPO · Corte al ${CORTE_CORTO}`, icon: 'bolt', iconBg: 'rgba(110,21,51,0.10)', iconColor: '#6e1533' },
  { label: 'Activo', value: valor('Activo'), foot: `${((valor('Activo') / total) * 100).toFixed(1)}% del total · Corte al ${CORTE_CORTO}`, icon: 'check', iconBg: 'rgba(159,29,70,0.10)', iconColor: '#9f1d46' },
  { label: 'Difunto', value: valor('Difunto'), foot: `Estatus RENAPO · Corte al ${CORTE_CORTO}`, icon: 'users', iconBg: 'rgba(217,138,159,0.20)', iconColor: '#d98a9f' },
  { label: 'No registrado en BD', value: valor('No registrado en BD'), foot: `Estatus RENAPO · Corte al ${CORTE_CORTO}`, icon: 'target', iconBg: 'rgba(182,175,184,0.22)', iconColor: '#b6afb8' },
])

const requisitos = [
  { icon: 'circleCheck', titulo: 'Requisitos principales', lista: PEUA.requisitos },
  { icon: 'arrows', titulo: 'Dónde tramitarlo', texto: PEUA.tramite },
]
</script>

<template>
  <section class="panel">
    <IntroCard :intro="PEUA.intro" />

    <div class="kpi-grid">
      <KpiCard v-for="(k, i) in kpis" :key="k.label" v-bind="k" :delay="i * 80" />
    </div>

    <div class="grid-2">
      <DataCard title="Confronta RENAPO" :sub="`Distribución por estatus · Total general ${fmt(total)}`">
        <DoughnutChart
          :labels="PEUA.estatus.map((e) => e.nombre)" :data="PEUA.estatus.map((e) => e.valor)"
          :colors="PEUA.estatus.map((e) => e.color)" cutout="68%" :legend-font="11.5" :legend-padding="14" label-in-tooltip
        />
      </DataCard>

      <DataCard title="Detalle por estatus" :sub="`Cifras de control · PEUA · Corte al ${CORTE_TEXTO}`">
        <table class="data-table">
          <thead><tr><th>Estatus RENAPO</th><th style="text-align:right">Registros</th></tr></thead>
          <tbody>
            <tr v-for="e in PEUA.estatus" :key="e.nombre">
              <td><span class="swatch" :style="{ background: e.color }"></span>{{ e.nombre }}</td>
              <td class="num">{{ fmt(e.valor) }}</td>
            </tr>
            <tr class="total"><td>Total general</td><td class="num">{{ fmt(total) }}</td></tr>
          </tbody>
        </table>
      </DataCard>
    </div>

    <DataCard title="Requisitos y trámite" sub="Qué se necesita y dónde tramitarlo">
      <InfoGrid :items="requisitos" />
    </DataCard>
  </section>
</template>
