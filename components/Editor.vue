<template>
  <div>
    <div v-if="editor" class="editor-container">
      <editor-content :editor="editor" />
    </div>
    <div v-else class="p-4 text-gray-500">
      Loading editor...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const props = defineProps({
  initialContent: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['change']);

const editor = ref(null);

onMounted(() => {
  // Initialize the editor
  editor.value = new Editor({
    content: props.initialContent ? JSON.parse(props.initialContent) : undefined,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'ここに内容を入力...',
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = JSON.stringify(editor.getJSON());
      emit('change', content);
    },
  });
});

watch(() => props.initialContent, (newContent) => {
  if (newContent && editor.value) {
    editor.value.commands.setContent(JSON.parse(newContent));
  }
});

// Clean up on unmount
onUnmounted(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<style>
.editor-container {
  min-height: 300px;
  padding: 1rem;
}

/* Basic editor styles */
.tiptap {
  outline: none;
}

.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
