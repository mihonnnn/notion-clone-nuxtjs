<template>
  <div
    class="flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-200 transition-colors"
    @click="$emit('click')"
  >
    <component :is="icon" class="w-4 h-4 mr-2" />
    <span class="text-sm">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  icon: any;
}>();

defineEmits(['click']);
</script>
