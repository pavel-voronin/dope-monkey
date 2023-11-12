<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '../../stores/game.store';
import Json from '../../components/Json.vue'
import { useRouter } from '../../composables/useRouter';

const gameStore = useGameStore()
const { time, online, player, location, customNavigation } = storeToRefs(gameStore)

const goToInfoPage = () => {
  useRouter('/info.php', { id: player.value!.id })
}
</script>

<template>
  "me.php" page
  <div class="border p-2 border-slate-700 w-fit m-2 cursor-pointer" @click="goToInfoPage">Info Page &rarr;</div>
  <Json title="game" :body="{ time, online, player, location, customNavigation }" />
</template>