<script setup>
  import {ref} from "vue";

  defineProps({
    onSearch: {
      type: Function,
      required: true
    }
  })

  const value = ref("")
</script>

<template>
  <div class="search-text">
    <input type="text" v-model="value" @keydown="x => x.key === 'Enter' && this.onSearch(value)" />
    <button @click="this.onSearch(value)">Search</button>
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