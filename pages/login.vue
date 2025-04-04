<!-- pages/login.vue -->
<template>
  <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
    <h1 class="text-2xl font-bold text-center mb-8">ログイン</h1>

    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
          >メールアドレス</label
        >
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="example@example.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="mb-4">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-1"
          >パスワード</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="パスワード"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div v-if="error.login" class="mb-4 text-sm text-red-600">
        {{ error.login }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:bg-blue-300">
        {{ loading ? "ログイン中..." : "ログイン" }}
      </button>
    </form>

    <div class="my-6 relative flex items-center">
      <div class="flex-grow border-t border-gray-300"></div>
      <span class="flex-shrink mx-4 text-gray-600 text-sm">または</span>
      <div class="flex-grow border-t border-gray-300"></div>
    </div>

    <button
      @click="googleLogin"
      :disabled="loading"
      class="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center text-gray-700 font-medium hover:bg-gray-50 disabled:bg-gray-100">
      <span class="mr-2 text-blue-600 font-bold">G</span>
      Googleでログイン
    </button>

    <div class="mt-6 text-center text-gray-600 text-sm">
      アカウントをお持ちでない方は
      <NuxtLink to="/register" class="text-blue-600 hover:underline"
        >こちらから登録</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { loginWithEmail, loginWithGoogle, error, loading } = useAuth();

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    await loginWithEmail(email.value, password.value);
    router.push("/");
  } catch (err) {
    console.error("ログインエラー:", err);
  }
};

const googleLogin = async () => {
  try {
    await loginWithGoogle();
    router.push("/");
  } catch (err) {
    console.error("Googleログインエラー:", err);
  }
};
</script>
