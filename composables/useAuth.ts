// composables/useAuth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { ref, reactive, onMounted } from "vue";

export const useAuth = () => {
  const { $firebase } = useNuxtApp();
  const auth = $firebase.auth;

  const user = ref<User | null>(null);
  const loading = ref(true);
  const error = reactive({
    login: null,
    register: null,
    logout: null,
  });

  // ユーザー状態の監視
  onMounted(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      loading.value = false;
    });

    // コンポーネントのアンマウント時にリスナーを解除
    return unsubscribe;
  });

  // メール/パスワードによる登録
  const registerWithEmail = async (email: string, password: string) => {
    error.register = null;
    loading.value = true;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      return userCredential;
    } catch (e: any) {
      error.register = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // メール/パスワードによるログイン
  const loginWithEmail = async (email: string, password: string) => {
    error.login = null;
    loading.value = true;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      return userCredential;
    } catch (e: any) {
      error.login = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Googleによるログイン
  const loginWithGoogle = async () => {
    error.login = null;
    loading.value = true;

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      user.value = userCredential.user;
      return userCredential;
    } catch (e: any) {
      error.login = e.message;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // ログアウト
  const logout = async () => {
    error.logout = null;

    try {
      await signOut(auth);
      user.value = null;
    } catch (e: any) {
      error.logout = e.message;
      throw e;
    }
  };

  return {
    user,
    loading,
    error,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };
};
