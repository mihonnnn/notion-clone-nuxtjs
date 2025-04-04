<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto text-center">
      <div class="mb-12">
        <h2
          class="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ようこそ
        </h2>
        <p class="text-xl text-gray-600">
          このアプリケーションを使用するには、ログインまたは新規登録が必要です。
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <CommonActionCard
          title="新規登録"
          description="まだアカウントをお持ちでない方は、&#10;新規登録を行ってください。"
          to="/register"
          buttonText="アカウント登録へ"
          icon="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        <CommonActionCard
          title="ログイン"
          description="すでにアカウントをお持ちの方は、&#10;ログインしてください。"
          to="/login"
          buttonText="ログインへ"
          icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </div>

      <div class="mt-16">
        <h3 class="text-2xl font-semibold mb-6 text-gray-800">主な機能</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2 text-gray-800">ノート作成</h4>
            <p class="text-gray-600">簡単にノートを作成・編集できます</p>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                class="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2 text-gray-800">
              エクスポート
            </h4>
            <p class="text-gray-600">データを簡単にエクスポートできます</p>
          </div>
          <div
            class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div
              class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2 text-gray-800">
              セキュリティ
            </h4>
            <p class="text-gray-600">安全にデータを管理できます</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>
