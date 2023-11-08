<script setup lang="ts">
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
increment()
</script>

<template>
  <div class="text-red-500" @click="increment">{{ count }}</div>
</template>
