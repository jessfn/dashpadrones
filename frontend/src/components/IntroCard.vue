<script setup>
defineProps({ intro: { type: Object, required: true } })
</script>

<template>
  <div class="intro-card" :style="{ '--accent-glow': intro.glow }">
    <h2>{{ intro.titulo }} <span class="badge">Programa</span></h2>
    <p v-for="(p, i) in intro.parrafos" :key="i" v-html="p"></p>
  </div>
</template>

<style>
  /* Program intro card */
  .intro-card{
    background:#ffffff; border:1px solid var(--border); border-radius:var(--radius-lg);
    padding:20px 22px; margin-bottom:20px; box-shadow:var(--shadow-lg);
    position:relative; overflow:hidden; border-top:3px solid var(--guinda);
  }
  .intro-card::before{
    content:''; position:absolute; top:-40%; right:-10%; width:280px; height:280px; border-radius:50%;
    background:radial-gradient(circle, var(--accent-glow, rgba(159,29,70,0.07)), transparent 70%); pointer-events:none;
  }
  .intro-card h2{ font-size:16.5px; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:9px; color:var(--text-0); }
  .intro-card .badge{
    font-size:10px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
    padding:3px 9px; border-radius:7px; background:rgba(159,29,70,0.08); color:var(--guinda);
  }
  .intro-card p{ color:var(--text-1); font-size:12.5px; line-height:1.6; max-width:840px; }
  .intro-card p + p{ margin-top:6px; }
  .intro-card strong{ color:var(--text-0); }
</style>
