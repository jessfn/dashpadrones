<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js'
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip)

const props = defineProps({ labels: Array, data: Array, colors: Array })
const canvas = ref(null)
let chart
const fmt = (n) => n.toLocaleString('es-MX')

onMounted(() => {
  Chart.defaults.color = '#8b8290'
  Chart.defaults.font.family = "'Source Sans 3', sans-serif"
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: { labels: props.labels, datasets: [{ data: props.data, backgroundColor: props.colors, borderRadius: 10, maxBarThickness: 54 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => fmt(c.raw) } } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: 'rgba(36,24,32,0.07)' }, ticks: { callback: fmt } },
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
