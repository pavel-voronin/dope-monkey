<script setup lang="ts">
import Json from '../../components/Json.vue'
import { usePlayersStore } from '../../stores/players.store';

const props = defineProps<{ id: any }>()

const playersStore = usePlayersStore()
</script>

<template>
  "info.php" page, id={{ props.id }}
  <Json title="players" :body="playersStore.get(props.id) ?? {}" />
</template>
