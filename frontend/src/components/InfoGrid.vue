<script setup>
import Icon from './Icon.vue'
// items: [{ icon | n, titulo, texto?, lista?[] }]
defineProps({ items: { type: Array, required: true }, min: { type: Number, default: 230 } })
</script>

<template>
  <div class="info-grid" :style="{ gridTemplateColumns: `repeat(auto-fit,minmax(${min}px,1fr))` }">
    <div v-for="it in items" :key="it.titulo" class="info-item">
      <h4>
        <svg v-if="it.n" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><text x="12" y="16" font-size="10" text-anchor="middle" fill="currentColor" stroke="none">{{ it.n }}</text></svg>
        <Icon v-else :name="it.icon" />
        {{ it.titulo }}
      </h4>
      <p v-if="it.texto" v-html="it.texto"></p>
      <ul v-if="it.lista"><li v-for="l in it.lista" :key="l">{{ l }}</li></ul>
    </div>
  </div>
</template>

<style>
  /* Info accordion */
  .info-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:12px; margin-top:4px; }
  .info-item{
    background:var(--bg-1); border:1px solid var(--border-soft); border-radius:var(--radius-sm);
    padding:13px 15px; transition: background .3s ease, border-color .3s ease;
  }
  .info-item:hover{ background:#fbeef2; border-color:rgba(159,29,70,0.18); }
  .info-item h4{ font-size:12px; font-weight:700; margin-bottom:5px; color:var(--text-0); display:flex; align-items:center; gap:7px; }
  .info-item h4 svg{ width:13px; height:13px; color:var(--guinda); flex-shrink:0; }
  .info-item p, .info-item li{ font-size:11.5px; color:var(--text-1); line-height:1.55; }
  .info-item ul{ padding-left:16px; margin-top:3px; }
</style>
