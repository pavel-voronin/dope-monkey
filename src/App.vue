<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePlayerStore } from './stores/player.store'
import { storeToRefs } from 'pinia'
import { useParseMe } from './composables/useParseMe'
import { useGameStore } from './stores/game.store';
import { useNavigationStore } from './stores/navigation.store';
import Json from './components/Json.vue'

const props = defineProps<{ oldBody: string }>()

const playerStore = usePlayerStore()
const { id, name, hp, max_hp, money } = storeToRefs(playerStore)

const gameStore = useGameStore()
const { time, online } = storeToRefs(gameStore)

const navigationStore = useNavigationStore()
const { custom } = storeToRefs(navigationStore)

onMounted(() => {
  useParseMe(props.oldBody)
})
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center gap-6">
    <div class="text-4xl mt-8">
      Hello,
      <a class="selection:bg-green-600 underline selection:text-white decoration-green-600 decoration-8"
        href="https://www.gwars.io">GWars.io</a>
    </div>
    <div class="h-full flex flex-col justify-center">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl">Some parsed information:</h1>
        <div class="flex gap-2">
          <Json title="player" :body="{ id, name, hp, max_hp, money }" />
          <Json title="game" :body="{ time, online }" />
          <Json title="navigation" :body="{ custom }" />
        </div>
      </div>
    </div>
  </div>
</template>
