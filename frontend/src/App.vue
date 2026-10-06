<script setup>
import { ref } from 'vue'
import { CORTE_TEXTO } from './data/programas'
import { useSrep } from './composables/useSrep'
import AppHero from './components/AppHero.vue'
import TabsNav from './components/TabsNav.vue'
import PpbPanel from './views/PpbPanel.vue'
import FertPanel from './views/FertPanel.vue'
import PeuaPanel from './views/PeuaPanel.vue'

const tab = ref('ppb')
const paneles = { ppb: PpbPanel, fert: FertPanel, peua: PeuaPanel }
const live = useSrep() // arranca la consulta a la API una sola vez
</script>

<template>
  <div class="bg-orbs">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <div class="wrap">
    <AppHero />
    <TabsNav v-model="tab" />

    <!-- Cada pestaña se monta al abrirla (las gráficas miden su tamaño real) y se conserva -->
    <KeepAlive>
      <component :is="paneles[tab]" :key="tab" />
    </KeepAlive>

    <footer>
      Dashboard interno de padrones · Producción para el Bienestar · Fertilizantes · PEUA — datos con corte al <b>{{ CORTE_TEXTO }}</b>
      <span v-if="live.cargado" class="estado" :class="{ vivo: live.ok }">
        {{ live.ok ? '● Datos en vivo (API SREP)' : '● Datos de respaldo' }}
      </span>
    </footer>
  </div>
</template>

<style>
  footer{ text-align:center; padding:28px 0 8px; color:var(--text-2); font-size:11px; border-top:1px solid var(--border-soft); margin-top:8px; padding-top:20px; }
  footer b{ color:var(--guinda); }
footer .estado { display: block; margin-top: 6px; font-size: 10.5px; color: var(--text-2); }
footer .estado.vivo { color: #15803d; }
</style>
