<template>
  <aside class="group/sidebar h-full bg-neutral-100 overflow-y-auto relative flex flex-col w-60">
    <div>
      <div>
        <UserItem
          :user="user"
          :signout="logout"
        />
        <Item label="検索" :icon="SearchIcon" @click="onSearchButtonClicked" />
      </div>
      <div class="mt-4">
        <NoteList />
        <Item label="ノートを作成" :icon="PlusIcon" @click="createNote" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/useAuth";
import { Search as SearchIcon, Plus as PlusIcon } from "lucide-vue-next";

const { user, logout } = useAuth();

const emit = defineEmits(['searchButtonClicked']);

const onSearchButtonClicked = () => {
  emit('searchButtonClicked');
};

const createNote = () => {
  // Will implement this later
};
</script>
