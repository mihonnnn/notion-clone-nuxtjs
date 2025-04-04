<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <LayoutHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup lang="ts">
// デフォルトレイアウトの設定
</script>

<style scoped>
/* スタイルは必要に応じて追加 */
</style>
