<script setup>
import { defineProps } from "vue";

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

function input(event) {
  emit("update:modelValue", event.target.value);
}
</script>

<template>
  <input
    id="app__search"
    :value="props.modelValue"
    type="text"
    placeholder="Search..."
    @input="input"
  />
</template>

<style>
#app__search {
  width: 200px;
  margin-left: 20px;
  padding: 0;
  background-color: var(--app-input-background-color);
  border: 0;
  padding: 5px;
  border-radius: 15px;
}
</style>
