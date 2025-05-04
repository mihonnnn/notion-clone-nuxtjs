<template>
  <div>
    <p
      v-if="notes.length === 0"
      class="text-sm font-medium text-muted-foreground/80 hidden"
      :style="{ paddingLeft: layer ? `${layer * 12 + 25}px` : undefined }"
    >
      ページがありません
    </p>
    <div v-for="note in notes" :key="note.id">
      <NoteItem :layer="layer" :note="note" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  layer: {
    type: Number,
    default: 0
  },
  parentId: {
    type: String,
    default: undefined
  }
});

// Will be replaced with Firestore data
const notes = ref([]);

// Load notes from Firestore (implement later)
</script>
