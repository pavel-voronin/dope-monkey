<script setup lang="ts">
defineProps<{ title: string, body: object }>()
</script>

<template>
    <pre class="p-4 text-xs">{{ $props.title }}: {{ $props.body }}</pre>
</template>