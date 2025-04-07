<!-- pages/index.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- ノート作成フォーム -->
    <div class="max-w-2xl mx-auto mb-8">
      <h2 class="text-xl font-semibold mb-4">新しいノートを作成</h2>
      <form @submit.prevent="createNote" class="space-y-4">
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-1"
            >タイトル</label
          >
          <input
            id="title"
            v-model="newNoteTitle"
            type="text"
            required
            placeholder="ノートのタイトルを入力"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900" />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">
          ノートを作成
        </button>
      </form>
    </div>

    <!-- ノート一覧 -->
    <div class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">あなたのノート</h2>
      <div v-if="loading" class="text-center py-4">読み込み中...</div>
      <div
        v-else-if="notes.length === 0"
        class="text-center py-4 text-gray-800">
        ノートがありません。新しいノートを作成しましょう。
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="note in notes"
          :key="note.noteId"
          class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <NuxtLink :to="`/notes/${note.noteId}`" class="block">
            <h3 class="text-lg font-medium text-gray-900">{{ note.title }}</h3>
            <p class="text-sm text-gray-500">
              作成日: {{ formatDate(note.createdAt) }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

interface Note {
  noteId: string;
  title: string;
  createdAt: string;
}

const { user } = useAuth();
const { $note } = useNuxtApp();

const newNoteTitle = ref("");
const notes = ref<Note[]>([]);
const loading = ref(true);

// ノートの作成
const createNote = async () => {
  if (!user.value) return;

  try {
    const noteId = await $note.createNote(
      user.value.uid,
      {
        title: newNoteTitle.value,
      }
    );
    newNoteTitle.value = ""; // フォームをクリア
    console.log(noteId);
    await fetchNotes(); // 一覧を更新
  } catch (error) {
    console.error("ノートの作成に失敗しました:", error);
  }
};

// ノート一覧の取得
const fetchNotes = async () => {
  if (!user.value) return;

  try {
    loading.value = true;
    notes.value = await $note.getUserNotes(user.value.uid);
  } catch (error) {
    console.error("ノート一覧の取得に失敗しました:", error);
  } finally {
    loading.value = false;
  }
};

// 日付のフォーマット
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// コンポーネントマウント時にノート一覧を取得
onMounted(async () => {
  await fetchNotes();
});
</script>
