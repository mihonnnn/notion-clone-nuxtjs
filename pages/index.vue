<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 w-1/2 m-auto">
      <h2 class="text-lg font-medium mb-4">
        新しいノートを作成してみましょう
      </h2>
      <div class="flex gap-2">
        <input
          v-model="noteTitle"
          placeholder="ノートのタイトルを入力"
          class="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          @click="createNote" 
          :disabled="!noteTitle"
          class="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon class="h-4 w-4 mr-1" />
          ノート作成
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Plus as PlusIcon } from 'lucide-vue-next';
import { useAuth } from '~/composables/useAuth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase setup
const { $firebase } = useNuxtApp();
const db = $firebase.db;

const { user } = useAuth();
const router = useRouter();
const noteTitle = ref('');

// This page requires authentication
definePageMeta({
  middleware: 'auth',
  requiresAuth: true,
});

const createNote = async () => {
  if (!noteTitle.value || !user.value) return;
  
  try {
    const docRef = await addDoc(collection(db, 'notes'), {
      title: noteTitle.value,
      content: '',
      userId: user.value.uid,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    router.push(`/notes/${docRef.id}`);
  } catch (error) {
    console.error('Error creating note:', error);
  }
};
</script>
