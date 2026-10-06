<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const props = defineProps({
  labels: Array, data: Array, colors: Array,
  cutout: { type: String, default: '70%' },
  legendFont: { type: Number, default: 12 },
  legendPadding: { type: Number, default: 16 },
  labelInTooltip: Boolean,
})
const canvas = ref(null)
let chart
const fmt = (n) => n.toLocaleString('es-MX')

onMounted(() => {
  Chart.defaults.color = '#8b8290'
  Chart.defaults.font.family = "'Source Sans 3', sans-serif"
  chart = new Chart(canvas.value, {
    type: 'doughnut',
    data: { labels: props.labels, datasets: [{ data: props.data, backgroundColor: props.colors, borderWidth: 0, cutout: props.cutout }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 10, boxHeight: 10, padding: props.legendPadding, font: { size: props.legendFont } } },
        tooltip: { callbacks: { label: (c) => (props.labelInTooltip ? `${c.label}: ${fmt(c.raw)}` : fmt(c.raw)) } },
      },
    },
  })
})
watch(() => props.data, (d) => { chart.data.datasets[0].data = d; chart.update() }, { deep: true })
onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <div class="chart-holder"><canvas ref="canvas"></canvas></div>
</template>
