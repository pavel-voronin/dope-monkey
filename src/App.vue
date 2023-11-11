<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from './stores/app.store';
import { onMounted } from 'vue';
import { useParse } from './composables/useParse';

const props = defineProps<{ src: string, entryUrl: URL }>()

const appStore = useAppStore()
appStore.entryUrl = props.entryUrl

const { currentPage, currentPageProps } = storeToRefs(appStore)

onMounted(() => {
  useParse(props.src)
})
</script>

<template>
  <div class="">
    <component v-if="currentPage" :is="currentPage" v-bind="currentPageProps" />
    <div v-else class="text-xl">
      I don't know what to do with this page
    </div>
  </div>
</template>
