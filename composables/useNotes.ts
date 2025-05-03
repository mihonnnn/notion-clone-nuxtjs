import { ref } from 'vue';
import { 
  collection, query, where, orderBy, onSnapshot, 
  doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp 
} from 'firebase/firestore';
import { useAuth } from './useAuth';
import { useNuxtApp } from 'nuxt/app';

export const useNotes = () => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db as any;
  const { user } = useAuth();
  
  const notes = ref<any[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  const fetchNotes = () => {
    if (!user.value) {
      notes.value = [];
      loading.value = false;
      return;
    }
    
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', user.value.uid),
      orderBy('updatedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      notes.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      loading.value = false;
    }, (err) => {
      console.error('Error fetching notes:', err);
      error.value = err.message;
      loading.value = false;
    });
    
    return unsubscribe;
  };
  
  const getNote = async (id: string) => {
    try {
      const docRef = doc(db, 'notes', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        return null;
      }
    } catch (err: any) {
      console.error('Error getting note:', err);
      error.value = err.message;
      return null;
    }
  };
  
  const createNote = async (title: string) => {
    if (!user.value) return null;
    
    try {
      const docRef = await addDoc(collection(db, 'notes'), {
        title,
        content: '',
        userId: user.value.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (err: any) {
      console.error('Error creating note:', err);
      error.value = err.message;
      return null;
    }
  };
  
  const updateNote = async (id: string, data: any) => {
    try {
      const docRef = doc(db, 'notes', id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (err: any) {
      console.error('Error updating note:', err);
      error.value = err.message;
      return false;
    }
  };
  
  const deleteNote = async (id: string) => {
    try {
      const docRef = doc(db, 'notes', id);
      await deleteDoc(docRef);
      return true;
    } catch (err: any) {
      console.error('Error deleting note:', err);
      error.value = err.message;
      return false;
    }
  };
  
  return {
    notes,
    loading,
    error,
    fetchNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
  };
};
