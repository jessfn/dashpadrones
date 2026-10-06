<script setup>
import { TABS } from '../data/programas'
import Icon from './Icon.vue'
defineProps({ modelValue: { type: String, required: true } })
defineEmits(['update:modelValue'])
</script>

<template>
  <nav class="tabs" role="tablist">
    <button
      v-for="t in TABS" :key="t.id"
      class="tab-btn" :class="{ active: modelValue === t.id }"
      role="tab" :aria-selected="modelValue === t.id"
      @click="$emit('update:modelValue', t.id)"
    >
      <Icon :name="t.icon" />
      {{ t.label }}
    </button>
  </nav>
</template>

<style>
  /* Tabs */
  .tabs{
    display:flex; gap:4px; justify-content:center; flex-wrap:wrap;
    margin:26px 0 22px; padding:5px; background:#ffffff; border:1px solid var(--border);
    border-radius:999px; width:fit-content; margin-left:auto; margin-right:auto;
    box-shadow: 0 8px 24px -14px rgba(36,24,32,0.18); animation: fadeUp .8s .15s ease both;
  }
  .tab-btn{
    appearance:none; border:none; cursor:pointer; font-family:'Source Sans 3',sans-serif;
    font-weight:600; font-size:12.5px; color:var(--text-2); background:transparent;
    padding:9px 17px; border-radius:999px; transition: all .35s cubic-bezier(.4,0,.2,1);
    display:flex; align-items:center; gap:6px; white-space:nowrap;
  }
  .tab-btn svg{ width:14px; height:14px; opacity:.8; }
  .tab-btn:hover{ color:var(--guinda); }
  .tab-btn.active{
    color:#ffffff; background:linear-gradient(120deg, var(--guinda), var(--guinda-dark));
    box-shadow: 0 8px 22px -8px rgba(159,29,70,0.55);
  }

  .panel{ animation: panelIn .5s cubic-bezier(.25,.8,.35,1) both; }
  @keyframes panelIn{ from{ opacity:0; transform:translateY(14px) scale(.99);} to{ opacity:1; transform:translateY(0) scale(1);} }
</style>
