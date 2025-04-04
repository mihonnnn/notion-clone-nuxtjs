<!-- pages/register.vue -->
<template>
  <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
    <h1 class="text-2xl font-bold text-center mb-8">アカウント登録</h1>

    <form @submit.prevent="register">
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
          placeholder="6文字以上のパスワード"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div class="mb-4">
        <label
          for="passwordConfirm"
          class="block text-sm font-medium text-gray-700 mb-1"
          >パスワード（確認）</label
        >
        <input
          id="passwordConfirm"
          v-model="passwordConfirm"
          type="password"
          required
          placeholder="もう一度パスワードを入力"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div v-if="!passwordsMatch" class="mb-4 text-sm text-red-600">
        パスワードが一致しません
      </div>

      <div v-if="error.register" class="mb-4 text-sm text-red-600">
        {{ error.register }}
      </div>

      <button
        type="submit"
        :disabled="loading || !passwordsMatch"
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:bg-blue-300 mt-2">
        {{ loading ? "登録中..." : "アカウント登録" }}
      </button>
    </form>

    <div class="mt-6 text-center text-gray-600 text-sm">
      すでにアカウントをお持ちの方は
      <NuxtLink to="/login" class="text-blue-600 hover:underline"
        >こちらからログイン</NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { registerWithEmail, error, loading } = useAuth();

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const router = useRouter();

// パスワードの一致確認
const passwordsMatch = computed(() => {
  return (
    password.value === passwordConfirm.value || passwordConfirm.value === ""
  );
});

const register = async () => {
  if (!passwordsMatch.value) {
    return;
  }

  try {
    await registerWithEmail(email.value, password.value);
    router.push("/");
  } catch (err) {
    console.error("登録エラー:", err);
  }
};
</script>
