<template>
  <div class="pl-[54px] group relative">
    <textarea
      v-model="title"
      class="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] resize-none w-full"
      placeholder="Untitled"
      @input="onInput"
      ref="textareaRef"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import autosize from 'autosize';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ title: '' })
  }
});

const emit = defineEmits(['titleChange']);

const title = ref(props.initialData.title || '');
const textareaRef = ref(null);

onMounted(() => {
  if (textareaRef.value) {
    autosize(textareaRef.value);
  }
});

const onInput = () => {
  emit('titleChange', title.value);
};

watch(() => props.initialData.title, (newTitle) => {
  if (newTitle !== undefined && newTitle !== title.value) {
    title.value = newTitle;
  }
});
</script>

<style scoped>
textarea {
  overflow: hidden;
  min-height: 60px;
}
</style>
