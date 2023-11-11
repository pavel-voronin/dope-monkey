<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGameStore } from '../../stores/game.store';
import Json from '../../components/Json.vue'

const gameStore = useGameStore()
const { time, online, player, location, customNavigation } = storeToRefs(gameStore)
</script>

<template>
  "me.php" page
  <Json title="game" :body="{ time, online, player, location, customNavigation }" />
</template>