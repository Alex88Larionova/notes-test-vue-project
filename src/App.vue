<script setup>
import { ref, computed } from "vue";
import AppSearch from "./components/AppSearch/AppSearch.vue";
import AppNotes from "./components/AppNotes/AppNotes.vue";
import AppNoteEditor from "./components/AppNoteEditor/AppNoteEditor.vue";

const showNoteEditor = ref(false);
const search = ref("");
const notes = ref([]);
const filteredNoted = computed(() =>
  notes.value.filter((note) => noteFilter(note))
);

function noteFilter(note) {
  const isEmpty = search.value === "";
  const titleMatch = note.title.includes(search.value);
  const contentMatch = note.content.includes(search.value);
  const colorMatch = note.nameColor.includes(search.value);
  return isEmpty || titleMatch || contentMatch || colorMatch;
}
</script>

<template>
  <div class="app__title">Notes</div>
  <AppSearch :test="search" />
  <AppNotes :filteredNoted="filteredNoted" :notes="notes" />
  <AppNoteEditor v-if="showNoteEditor" :notes="notes" :showNoteEditor="showNoteEditor" @closeNote="showNoteEditor = false"/>
  <button class="app__note-editor-button" @click="showNoteEditor = true">+</button>
</template>

<style>
:root {
  --app-background-color: rgb(14, 18, 27);
  --app-buttons-main-color: rgb(51, 105, 255);
  --app-buttons-shadow-color: rgb(81, 88, 184);
  --app-notes-shadow-color: rgb(37, 40, 78);
  --app-input-background-color: rgb(23, 28, 38);
  --app-text-color: rgb(228, 227, 227);
}

body {
  font-family: Ubuntu, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  background-color: var(--app-background-color);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: var(--app-text-color);
  padding: 10px;
  margin: 0;
  padding: 0;
}

.app__note-editor-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  margin-right: auto;
  margin-right: 20px;
  background-color: var(--app-buttons-main-color);
  color: var(--app-text-color);
  font-size: 24px;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 5px 5px 15px var(--app-notes-shadow-color);
}

.app__note-delete-button {
  cursor: pointer;
  z-index: 1;
  font-size: 14px;
  margin: 0;
  padding: 0px 5px;
  background-color: var(--app-buttons-main-color);
  border: 3px solid var(--app-buttons-main-color);
  border-radius: 50%;
  color: rgb(228, 227, 227);
  box-shadow: 2px 2px 5px var(--app-buttons-shadow-color);
}

.app__note-delete-button:hover {
  transform: scale(0.9);
}
</style>
