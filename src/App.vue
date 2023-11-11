<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from './stores/app.store';
import MePage from './components/pages/MePage.vue'

const props = defineProps<{ oldBody: string, entryUrl: URL }>()

const appStore = useAppStore()
const { isMePage } = storeToRefs(appStore)
appStore.oldBody = props.oldBody
appStore.entryUrl = props.entryUrl
</script>

<template>
  <div class="">
    <div v-if="isMePage" class="">
      <MePage :oldBody="$props.oldBody" />
    </div>
    <div v-else class="text-xl">
      I don't know what to do with this page
    </div>
  </div>
</template>
