<template>
  <div
    class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
    <div
      class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto"
      :class="iconBgColor">
      <svg
        class="w-6 h-6"
        :class="iconColor"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="iconPath" />
      </svg>
    </div>
    <h4 class="text-lg font-semibold mb-2 text-gray-800">{{ title }}</h4>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  iconPath: string;
  iconBgColor: string;
  iconColor: string;
}>();
</script>
