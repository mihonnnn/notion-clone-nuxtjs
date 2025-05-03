<template>
  <div 
    class="flex items-center px-4 py-2 cursor-pointer hover:bg-neutral-200 transition-colors"
    :style="{ paddingLeft: `${(layer || 0) * 12 + 12}px` }"
    @click="navigateToNote"
  >
    <component :is="FileIcon" class="w-4 h-4 mr-2" />
    <span class="text-sm truncate">{{ note.title || 'Untitled' }}</span>
  </div>
</template>

<script setup lang="ts">
import { File as FileIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const props = defineProps({
  note: {
    type: Object,
    default: () => ({})
  },
  layer: {
    type: Number,
    default: 0
  }
});

const router = useRouter();

const navigateToNote = () => {
  if (props.note.id) {
    router.push(`/notes/${props.note.id}`);
  }
};
</script>
