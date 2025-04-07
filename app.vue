<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";

const { user, loading } = useAuth();

// アプリ全体のナビゲーションガード
onMounted(async () => {
  const router = useRouter();
  const route = useRoute();

  // 認証状態が読み込まれるまで待機
  while (loading.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // ユーザーがルートURLにアクセスした場合、認証状態に基づいてリダイレクト
  if (route.path === "/") {
    if (user.value) {
      // 認証済みユーザーはindexページへ
      router.push("/");
    } else {
      // 未認証ユーザーはウェルカムページへ
      router.push("/welcome");
    }
  }
});
</script>
