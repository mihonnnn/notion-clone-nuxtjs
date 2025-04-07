import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const { $firebase } = useNuxtApp();
  const db = $firebase.db;

  return {
    provide: {
      note: {
        // ノートの作成
        async createNote(
          userId: string,
          params: { title?: string; parentId?: string }
        ) {
          const now = new Date();
          const noteRef = doc(collection(db, "notes"));
          const noteId = noteRef.id;

          // noteコレクションに保存
          await setDoc(noteRef, {
            id: noteId,
            title: params.title,
            parentId: params.parentId,
            createdAt: now,
            updatedAt: now,
            isActive: true,
          });

          // user-notesコレクションに追加
          const userNotesRef = doc(db, "user-notes", userId);
          const userNotesDoc = await getDoc(userNotesRef);

          if (userNotesDoc.exists()) {
            await updateDoc(userNotesRef, {
              notes: arrayUnion({
                noteId,
                title: params.title,
                isActive: true,
                createdAt: now,
              }),
            });
          } else {
            await setDoc(userNotesRef, {
              userId,
              notes: [
                {
                  noteId,
                  title: params.title,
                  isActive: true,
                  createdAt: now,
                },
              ],
            });
          }

          return noteId;
        },

        // ユーザーのノート一覧取得
        async getUserNotes(userId: string) {
          const userNotesRef = doc(db, "user-notes", userId);
          const userNotesDoc = await getDoc(userNotesRef);

          if (!userNotesDoc.exists()) {
            return [];
          }

          const { notes } = userNotesDoc.data();
          return notes;
        },

        // ノートの詳細取得
        async getNote(noteId: string) {
          const noteRef = doc(db, "notes", noteId);
          const noteDoc = await getDoc(noteRef);

          if (!noteDoc.exists()) {
            return null;
          }

          return noteDoc.data();
        },
      },
    },
  };
});
