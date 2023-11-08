<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useCounterStore } from './stores/counter.store'
import { usePlayerStore } from './stores/player.store'
import { storeToRefs } from 'pinia'
import { useParseMe } from './composables/useParseMe'

const props = defineProps<{ oldBody: string }>()

const counterStore = useCounterStore()
const { count } = storeToRefs(counterStore)
const { increment } = counterStore

const playerStore = usePlayerStore()
const { id, name, hp, max_hp } = storeToRefs(playerStore)

onMounted(() => {
  useParseMe(props.oldBody)
})
</script>

<template>
  <div class="relative w-full h-full flex flex-col justify-center items-center gap-4">
    <div class="text-4xl">Hello, <a
        class="selection:bg-green-600 underline selection:text-white decoration-green-600 decoration-8"
        href="https://www.gwars.io">GWars.io</a></div>
    <div
      class="border px-4 py-2 select-none bg-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all text-white rounded-md text-xl"
      @click="increment">
      Counter: {{ count }}
    </div>
    <div class="absolute top-20 flex flex-col gap-2 border border-slate-600 p-4">
      <h1>Some parsed information:</h1>
      <pre>{{ { id, name, hp, max_hp } }}</pre>
    </div>
  </div>
</template>
