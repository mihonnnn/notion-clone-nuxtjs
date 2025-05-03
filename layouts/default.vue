<template>
  <div class="h-screen flex flex-col">
    <LayoutHeader v-if="!isLoggedIn" />
    <div v-else class="flex flex-1 h-full overflow-hidden">
      <SideBar @searchButtonClicked="isSearchModalOpen = true" />
      <main class="flex-1 h-full overflow-y-auto">
        <slot />
      </main>
      <SearchModal
        :isOpen="isSearchModalOpen"
        :notes="notes"
        @itemSelect="onNoteSelect"
        @keywordChanged="onKeywordChanged"
        @close="isSearchModalOpen = false"
      />
    </div>
    <LayoutFooter v-if="!isLoggedIn" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import SideBar from '~/components/sidebar/SideBar.vue';

const { user } = useAuth();
const router = useRouter();

const isLoggedIn = computed(() => !!user.value);
const isSearchModalOpen = ref(false);
const notes = ref([]);

const onNoteSelect = (noteId) => {
  isSearchModalOpen.value = false;
  router.push(`/notes/${noteId}`);
};

const onKeywordChanged = (keyword) => {
  // Will implement search functionality later with Firestore
};
</script>

<style scoped>
/* スタイルは必要に応じて追加 */
</style>
