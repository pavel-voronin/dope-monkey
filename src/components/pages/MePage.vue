<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useParseMe } from '../../composables/useParseMe'
import { usePlayerStore } from '../../stores/player.store'
import { useGameStore } from '../../stores/game.store';
import { useNavigationStore } from '../../stores/navigation.store';
import { useLocationStore } from '../../stores/location.store';
import Json from '../../components/Json.vue'

const props = defineProps<{ oldBody: string }>()

const playerStore = usePlayerStore()
const { id, name, hp, max_hp, money, hp_speed } = storeToRefs(playerStore)

const gameStore = useGameStore()
const { time, online } = storeToRefs(gameStore)

const navigationStore = useNavigationStore()
const { custom } = storeToRefs(navigationStore)

const locationStore = useLocationStore()
const { current } = storeToRefs(locationStore)

onMounted(() => {
  useParseMe(props.oldBody)
})
</script>

<template>
  "me.php" page
  <Json title="player" :body="{ id, name, hp, max_hp, hp_speed, money }" />
  <Json title="game" :body="{ time, online }" />
  <Json title="navigation" :body="{ custom }" />
  <Json title="location" :body="{ current }" />
</template>