<template>
  <div class="pb-40 pt-20">
    <div class="md:max-w-3xl lg:md-max-w-4xl mx-auto">
      <TitleInput 
        :initialData="{ title: note.title }" 
        @titleChange="updateTitle" 
      />
      <div class="mt-4">
        <Editor 
          :initialContent="note.content" 
          @change="updateContent" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNuxtApp } from 'nuxt/app';
import { useNotes } from '~/composables/useNotes';

// Firebase setup
const { $firebase } = useNuxtApp();
const db = $firebase.db;

const route = useRoute();
const noteId = route.params.id;
const note = ref({ title: '', content: '' });

// This page requires authentication
definePageMeta({
  middleware: 'auth',
  requiresAuth: true,
});

onMounted(async () => {
  if (noteId) {
    try {
      const docRef = doc(db, 'notes', noteId.toString());
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        note.value = docSnap.data();
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  }
});

const updateTitle = async (title) => {
  if (!noteId) return;
  
  try {
    const docRef = doc(db, 'notes', noteId.toString());
    await updateDoc(docRef, {
      title,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating title:', error);
  }
};

const updateContent = async (content) => {
  if (!noteId) return;
  
  try {
    const docRef = doc(db, 'notes', noteId.toString());
    await updateDoc(docRef, {
      content,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating content:', error);
  }
};
</script>
