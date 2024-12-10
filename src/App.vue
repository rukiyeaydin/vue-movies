<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Movies from './components/Movies.vue';

const searchQuery = ref('Life') 

</script>

<template>
  <Navbar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event" />
  <Movies :searchQuery="searchQuery" />
</template>

<style scoped>

</style>