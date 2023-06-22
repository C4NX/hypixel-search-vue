<script setup>
  import {ref} from "vue";

  defineEmits(["search"])

  const value = ref("")
</script>

<template>
  <div class="search-text">
    <input type="text" v-model="value" @keydown="x => x.key === 'Enter' && $emit('search', value)" />
    <button @click="$emit('search', value)">Search</button>
  </div>
</template>

<style scoped>
  .search-text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
</style>