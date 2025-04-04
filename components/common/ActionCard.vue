<template>
  <div
    class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
    <div class="flex items-center mb-4">
      <div
        class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
        <svg
          class="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="icon" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
    </div>
    <p class="text-gray-600 mb-6 whitespace-pre-line">
      {{ description }}
    </p>
    <NuxtLink
      :to="to"
      class="inline-block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-center">
      {{ buttonText }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  to: string;
  buttonText: string;
  icon: string;
}>();
</script>
