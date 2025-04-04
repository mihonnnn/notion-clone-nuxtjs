<!-- pages/index.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <h1>表示成功</h1>
    <!-- <div v-if="user" class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-6">ホームページ</h1>
      <div class="bg-white rounded-lg shadow-md p-6">
        <p class="text-lg mb-4">ようこそ</p>
        <p class="text-gray-600 mb-6">
          ログインに成功しました。このページは認証済みユーザーのみが閲覧できます。
        </p>
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          ログアウト
        </button>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
// import { useAuth } from "~/composables/useAuth";

// const { user, logout } = useAuth();
// const router = useRouter();

// // このページには認証が必要であることを指定
// definePageMeta({
//   middleware: "auth",
//   requiresAuth: true,
// });

// const handleLogout = async () => {
//   try {
//     await logout();
//     router.push("/login");
//   } catch (err) {
//     console.error("ログアウトエラー:", err);
//   }
// };
</script>
