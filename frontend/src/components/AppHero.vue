<script setup>
import { CORTE_TEXTO } from '../data/programas'
</script>

<template>
  <header class="hero">
    <div class="eyebrow"><span class="dot"></span> Dashboard</div>
    <h1 class="title">Cifras de control de los programas <span>Producción para el Bienestar</span>, <span>Fertilizantes para el Bienestar</span> y <span>PEUA</span>.</h1>
    <p class="subtitle">Corte al <b>{{ CORTE_TEXTO }}</b></p>
  </header>
</template>

<style>
  /* Header */
  header.hero{ padding:40px 0 26px; text-align:center; }
  .eyebrow{
    display:inline-flex; align-items:center; gap:7px;
    font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
    color:var(--guinda); background:rgba(159,29,70,0.06); border:1px solid rgba(159,29,70,0.22);
    padding:5px 13px; border-radius:999px; margin-bottom:16px;
    animation: fadeUp .7s ease both;
  }
  .eyebrow .dot{ width:5px; height:5px; border-radius:50%; background:var(--guinda); box-shadow:0 0 10px rgba(159,29,70,0.5); animation:pulse 1.8s infinite; }
  @keyframes pulse{ 0%,100%{opacity:1} 50%{opacity:.35} }

  h1.title{
    font-size:clamp(18px, 2.3vw, 25px); font-weight:700; line-height:1.35;
    color:var(--text-0); max-width:700px; margin:0 auto 10px;
    animation: fadeUp .8s .05s ease both;
  }
  h1.title span{ color:var(--guinda); font-weight:800; }
  p.subtitle{ color:var(--text-2); font-size:11.5px; font-weight:600; letter-spacing:.03em; text-transform:uppercase; max-width:640px; margin:0 auto; animation: fadeUp .8s .1s ease both; }
  p.subtitle b{ color:var(--text-1); font-weight:700; }
  @keyframes fadeUp{ from{ opacity:0; transform:translateY(18px);} to{ opacity:1; transform:translateY(0);} }
</style>
