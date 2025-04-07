import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  type User,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

interface AuthState {
  user: User | null;
  loading: boolean;
  error: {
    register: string;
    login: string;
    logout: string;
  };
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    loading: true,
    error: {
      register: "",
      login: "",
      logout: "",
    },
  }),

  getters: {
    isAuthenticated: (state: AuthState) => !!state.user,
    currentUser: (state: AuthState) => state.user,
  },

  actions: {
    async registerWithEmail(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const newUser = userCredential.user;

        // user-notesコレクションに初期データを作成
        await setDoc(doc(db, "user-notes", newUser.uid), {
          userId: newUser.uid,
          email: newUser.email,
          notes: [],
        });

        return newUser;
      } catch (error: any) {
        let errorMessage = "登録に失敗しました。";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "このメールアドレスは既に使用されています。";
            break;
          case "auth/invalid-email":
            errorMessage = "メールアドレスの形式が正しくありません。";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "この認証方法は現在利用できません。";
            break;
          case "auth/weak-password":
            errorMessage =
              "パスワードが弱すぎます。より強いパスワードを設定してください。";
            break;
        }
        this.error.register = errorMessage;
        throw new Error(errorMessage);
      }
    },

    async loginWithEmail(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential.user;
      } catch (error: any) {
        let errorMessage = "ログインに失敗しました。";
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "メールアドレスの形式が正しくありません。";
            break;
          case "auth/user-disabled":
            errorMessage = "このアカウントは無効化されています。";
            break;
          case "auth/user-not-found":
            errorMessage = "このメールアドレスは登録されていません。";
            break;
          case "auth/wrong-password":
            errorMessage = "パスワードが間違っています。";
            break;
        }
        this.error.login = errorMessage;
        throw new Error(errorMessage);
      }
    },

    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error: any) {
        this.error.logout = error.message;
        throw error;
      }
    },

    initializeAuth() {
      onAuthStateChanged(auth, (newUser) => {
        this.user = newUser;
        this.loading = false;
      });
    },
  },
});
