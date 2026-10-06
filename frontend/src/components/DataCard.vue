<script setup>
defineProps({ title: String, sub: String })
</script>

<template>
  <div class="card">
    <h3>{{ title }}</h3>
    <div v-if="sub" class="card-sub">{{ sub }}</div>
    <slot />
  </div>
</template>

<style>
  /* Chart + table row */
  .grid-2{ display:grid; grid-template-columns:1.15fr 1fr; gap:16px; margin-bottom:20px; }
  @media (max-width: 880px){ .grid-2{ grid-template-columns:1fr; } }

  .card{
    background:#ffffff; border:1px solid var(--border); border-radius:var(--radius-lg);
    padding:18px 20px; box-shadow:var(--shadow-lg);
  }
  .card h3{ font-size:13.5px; font-weight:700; margin-bottom:3px; color:var(--text-0); }
  .card .card-sub{ font-size:11px; color:var(--text-2); margin-bottom:14px; }
  .chart-holder{ position:relative; height:220px; }

  table.data-table{ width:100%; border-collapse:collapse; font-size:12px; }
  table.data-table th{
    text-align:left; color:var(--text-2); font-weight:600; font-size:10px; text-transform:uppercase;
    letter-spacing:.04em; padding:0 8px 8px; border-bottom:1px solid var(--border-soft);
  }
  table.data-table td{ padding:9px 8px; border-bottom:1px solid var(--border-soft); color:var(--text-1); }
  table.data-table tr:last-child td{ border-bottom:none; }
  table.data-table td.num{ text-align:right; font-family:'Montserrat',sans-serif; font-weight:700; color:var(--text-0); font-variant-numeric:tabular-nums; }
  table.data-table tr.total td{ color:var(--guinda); font-weight:800; border-top:1px solid var(--border); }
  .swatch{ display:inline-block; width:8px; height:8px; border-radius:3px; margin-right:7px; }
</style>
