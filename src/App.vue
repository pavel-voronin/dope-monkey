<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from './stores/app.store';
import { onMounted } from 'vue';
import { useRouter } from './composables/useRouter';

const props = defineProps<{ src: string, entryUrl: Location }>()

const appStore = useAppStore()
appStore.entryUrl = props.entryUrl

const { currentRoute } = storeToRefs(appStore)

onMounted(() => {
  useRouter(appStore.entryUrl as Location, props.src)
})
</script>

<template>
  <div>
    <component v-if="currentRoute" :is="currentRoute.component" v-bind="currentRoute.props" />
    <div v-else class="text-xl">
      I don't know what to do with this page
    </div>
  </div>
</template>
