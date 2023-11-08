<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
increment()
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-4">
    <div class="text-4xl">Hello, <a
        class="selection:bg-green-600 underline selection:text-white decoration-green-600 decoration-8"
        href="https://www.gwars.io">GWars.io</a></div>
    <div
      class="border px-4 py-2 select-none bg-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all text-white rounded-md text-xl"
      @click="increment">Counter: {{ count }}</div>
</div></template>
