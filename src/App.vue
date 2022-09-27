<script setup>
import { ref, computed } from 'vue'
import AppSearch from './components/AppSearch/AppSearch.vue'
import AppNotes from './components/AppNotes/AppNotes.vue'
import AppNoteEditor from './components/AppNoteEditor/AppNoteEditor.vue'

const editorType = ref('new-note')
const showNoteEditor = ref(false)
const selectedNote = ref({})
const search = ref('')
const notes = ref([])
/* const notes = ref(JSON.parse(localStorage.getItem("notes"))) || ref([]); */
const filteredNoted = computed(() =>
  notes.value.filter(note => noteFilter(note))
)

function noteFilter (note) {
  const isEmpty = search.value === ''
  const titleMatch = note.title.includes(search.value)
  const contentMatch = note.content.includes(search.value)
  const colorMatch = note.nameColor.includes(search.value)
  return isEmpty || titleMatch || contentMatch || colorMatch
}

function noteClick (event) {
  selectedNote.value = event
  editorType.value = 'edit-note'
  showNoteEditor.value = true
}

function openNewNoteEdtior () {
  editorType.value = 'new-note'
  showNoteEditor.value = true
}

function loadNotes () {
  console.log(getNotes())
  // notes.value = (getNotes())
}

function closeNoteEditor () {
  showNoteEditor.value = false
  updateNotes()
}

function getNotes () {
  console.log(localStorage.getItem('notes'))
  return JSON.parse(localStorage.getItem('notes'))
}

function saveNotes () {
  console.log(notes.value)
  localStorage.setItem('notes', notes.value)
}

function updateNotes () {
  // saveNotes()
}

// loadNotes()
</script>

<template>
  <div class="app__title">
    Notes
  </div>
  <AppSearch v-model="search" />
  <AppNotes
    :filtered-noted="filteredNoted"
    :notes="notes"
    :show-note-editor="showNoteEditor"
    @noteClick="noteClick"
    @deleteNote="updateNotes()"
  />
  <AppNoteEditor
    v-if="showNoteEditor"
    :notes="notes"
    :show-note-editor="showNoteEditor"
    :editor-type="editorType"
    :selected-note="selectedNote"
    @closeNoteEditor="closeNoteEditor()"
  />
  <button
    class="app__note-editor-button"
    @click="openNewNoteEdtior()"
  >
    +
  </button>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

:root {
  --app-background-color: rgb(14, 18, 27);
  --app-buttons-main-color: rgb(51, 105, 255);
  --app-buttons-shadow-color: rgb(81, 88, 184);
  --app-notes-shadow-color: rgb(37, 40, 78);
  --app-input-background-color: rgb(23, 28, 38);
  --app-text-color: rgb(228, 227, 227);
}

* {
  font-family: "Roboto", sans-serif;
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
  text-align: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  margin-right: 0;
  background-color: var(--app-buttons-main-color);
  color: var(--app-text-color);
  font-size: 24px;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 5px 5px 15px var(--app-notes-shadow-color);
}

.app__note-delete-button:hover {
  transform: scale(0.9);
}
</style>
