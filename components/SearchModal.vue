<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium">検索</h3>
        <button @click="onClose" class="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <input 
        v-model="keyword" 
        placeholder="キーワードで検索" 
        @input="onKeywordChanged"
        class="w-full border rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div v-if="filteredNotes.length > 0" class="max-h-[60vh] overflow-y-auto">
        <div 
          v-for="note in filteredNotes" 
          :key="note.id" 
          class="p-3 hover:bg-gray-100 cursor-pointer rounded-md"
          @click="onItemSelect(note.id)"
        >
          <span>{{ note.title || 'Untitled' }}</span>
        </div>
      </div>
      <div v-else class="p-3 text-gray-500">
        条件に一致するノートがありません
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  notes: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['itemSelect', 'keywordChanged', 'close']);

const keyword = ref('');

const filteredNotes = computed(() => {
  if (!keyword.value) return props.notes;
  return props.notes.filter(note => 
    note.title?.toLowerCase().includes(keyword.value.toLowerCase())
  );
});

const onItemSelect = (noteId) => {
  emit('itemSelect', noteId);
};

const onKeywordChanged = () => {
  emit('keywordChanged', keyword.value);
};

const onClose = () => {
  emit('close');
};

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    keyword.value = '';
  }
});
</script>
