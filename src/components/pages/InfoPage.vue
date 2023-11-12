<script setup lang="ts">
import Json from '../../components/Json.vue'
import { useRouter } from '../../composables/useRouter';
import { usePlayersStore } from '../../stores/players.store';

const props = defineProps<{ id: any }>()

const playersStore = usePlayersStore()
const goToMainPage = () => {
  useRouter('/me.php')
}
</script>

<template>
  <div>
    "info.php" page, id={{ props.id }}
    <div class="border p-2 border-slate-700 w-fit m-2 cursor-pointer" @click="goToMainPage">&larr; Main Page</div>
    <Json title="player" :body="playersStore.get(props.id) ?? {}" />
  </div>
</template>
