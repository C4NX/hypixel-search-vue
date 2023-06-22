<script setup>
import {ref} from "vue";
import SearchText from "./components/SearchInput.vue";
import HypixelPlayerCard from "./components/HypixelPlayerCard.vue";

const search = ref("")
const setSearch = (x) => search.value = x
</script>

<template>
  <h1>Hypixel Player Search</h1>
  <SearchText @search="setSearch" />
  <HypixelPlayerCard :username="search" />
</template>