<script setup>
  import {defineProps} from 'vue'

  const props = defineProps({
    modelValue: String
  })
</script>

<template>
  <input
    id="app__search"
    v-model="modelValue"
    type="text"
    placeholder="Search..."
  >
</template>

<style>
  #app__search {
    width: 200px;
    margin: 0;
    padding: 0;
    background-color:var(--app-input-background-color);
    border:0;
    padding: 5px;
    border-radius: 15px;
  }
</style>