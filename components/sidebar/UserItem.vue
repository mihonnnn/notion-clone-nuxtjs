<template>
  <div class="flex items-center justify-between px-4 py-2">
    <div class="flex items-center">
      <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
        {{ userInitial }}
      </div>
      <div class="ml-2">
        <div class="text-sm font-medium">{{ userName }}</div>
        <div class="text-xs text-gray-500">{{ userEmail }}</div>
      </div>
    </div>
    <div class="relative">
      <button 
        @click="isDropdownOpen = !isDropdownOpen" 
        class="p-1 rounded-full hover:bg-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
      <div 
        v-if="isDropdownOpen" 
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
      >
        <div 
          class="py-1"
          @click="handleLogout"
        >
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            ログアウト
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { User } from 'firebase/auth';

const props = defineProps<{
  user: User | null;
  signout: () => Promise<void>;
}>();

const isDropdownOpen = ref(false);

const userName = computed(() => {
  if (!props.user) return 'ゲスト';
  return props.user.displayName || props.user.email?.split('@')[0] || 'ユーザー';
});

const userEmail = computed(() => {
  return props.user?.email || '';
});

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase();
});

const handleLogout = async () => {
  isDropdownOpen.value = false;
  await props.signout();
};
</script>
