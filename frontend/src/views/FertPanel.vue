<script setup>
import { computed } from 'vue'
import { FERT, CORTE_TEXTO } from '../data/programas'
import { useSrep, vivoOr } from '../composables/useSrep'
import IntroCard from '../components/IntroCard.vue'
import KpiCard from '../components/KpiCard.vue'
import DataCard from '../components/DataCard.vue'
import DoughnutChart from '../components/DoughnutChart.vue'
import InfoGrid from '../components/InfoGrid.vue'

const live = useSrep()
const objetivo = FERT.fallback.poblacion_objetivo
const dispersada = computed(() => vivoOr(live.fert.poblacion_dispersada, FERT.fallback.poblacion_dispersada))
const avance = computed(() => (dispersada.value / objetivo) * 100)

const kpis = computed(() => [
  { label: 'Población objetivo', value: objetivo, foot: 'Prog. 105 · Nacional de Fertilizantes', icon: 'target', iconBg: 'rgba(201,152,46,0.14)', iconColor: '#c9982e' },
  { label: 'Población dispersada', value: dispersada.value, foot: `Corte al ${CORTE_TEXTO}`, icon: 'package', iconBg: 'rgba(159,29,70,0.10)', iconColor: '#9f1d46' },
  { label: 'Avance de dispersión', value: avance.value, decimals: 1, unit: '%', foot: `Sobre población objetivo · Corte al ${CORTE_TEXTO}`, icon: 'trend', iconBg: 'rgba(110,21,51,0.10)', iconColor: '#6e1533' },
])
const serie = computed(() => [dispersada.value, Math.max(objetivo - dispersada.value, 0)])
</script>

<template>
  <section class="panel">
    <IntroCard :intro="FERT.intro" />

    <div class="kpi-grid">
      <KpiCard v-for="(k, i) in kpis" :key="k.label" v-bind="k" :delay="i * 80" />
    </div>

    <div class="grid-2">
      <DataCard title="Objetivo vs. dispersión" :sub="`Población objetivo frente a población dispersada · Corte al ${CORTE_TEXTO}`">
        <DoughnutChart :labels="['Dispersada', 'Restante de objetivo']" :data="serie" :colors="['#9f1d46', '#eee8ea']" cutout="72%" />
      </DataCard>

      <DataCard title="Módulos del sistema (SIGAP)" sub="Sistema Informático de Gestión y Administración de Programas">
        <table class="data-table" style="font-size:13px">
          <tbody>
            <tr v-for="[nombre, detalle] in FERT.modulos" :key="nombre">
              <td>{{ nombre }}</td>
              <td class="num" style="font-weight:500;color:var(--text-2)">{{ detalle }}</td>
            </tr>
          </tbody>
        </table>
      </DataCard>
    </div>

    <DataCard title="Proceso de distribución de fertilizantes" sub="De la solicitud al derechohabiente">
      <InfoGrid :items="FERT.proceso" :min="220" />
    </DataCard>
  </section>
</template>
