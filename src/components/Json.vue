<script setup lang="ts">
defineProps<{ title: string, body: object }>()
</script>

<template>
    <div class="flex-none">
        <pre class="border border-slate-600 p-4 text-xs">{{ $props.title }}: {{ $props.body }}</pre>
    </div>
</template>