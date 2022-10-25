<script setup>
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'
import { computed, nextTick, ref } from 'vue'
import AppNoteEditor from './components/AppNoteEditor/AppNoteEditor.vue'
import AppNotes from './components/AppNotes/AppNotes.vue'
import AppSearch from './components/AppSearch/AppSearch.vue'

const editorType = ref('new-note')
const showNoteEditor = ref(false)
const selectedNote = ref({})
const search = ref('')
const notes = ref([])

const colorCollection = ref([
  { id: 1, name: 'blue', textColor: 'black', color: 'rgb(51, 105, 255)' },
  { id: 2, name: 'yellow', textColor: 'black', color: 'rgb(255, 218, 71)' },
  { id: 3, name: 'white', textColor: 'black', color: 'rgb(247, 245, 245)' },
  { id: 4, name: 'plum', textColor: 'black', color: 'rgb(174, 59, 118)' },
  { id: 5, name: 'azure', textColor: 'black', color: 'rgb(10, 235, 175)' },
  { id: 6, name: 'peach', textColor: 'black', color: 'rgb(255, 119, 70)' },
  { id: 7, name: 'black', textColor: 'white', color: 'rgb(14, 18, 27)' }
])

/* const notes = ref(JSON.parse(localStorage.getItem("notes"))) || ref([]); */
const filteredNoted = computed(() =>
  notes.value.filter(note => noteFilter(note))
)

const editor = useEditor({
  content: '',
  extensions: [StarterKit, Image],
  title: '',
  backgroundColor: '',
  textColor: '',
  nameColor: ''
})

function noteFilter(note) {
  const isEmpty = search.value === ''
  const titleMatch = note.title?.includes(search.value)
  const contentMatch = note.content?.includes(search.value)
  const colorMatch = note.nameColor?.includes(search.value)
  return isEmpty || titleMatch || contentMatch || colorMatch
}


function addColorButton(colorName) {
  const colorCollectionItem = colorCollection.value.find(color => color.name === colorName)
  editor.backgroundColor = colorCollectionItem?.color
  editor.textColor = colorCollectionItem?.textColor
  editor.nameColor = colorCollectionItem?.name
}

function noteClick(event) {
  selectedNote.value = event
  editorType.value = 'edit-note'
  showNoteEditor.value = true
}

function openNewNoteEdtior() {
  editorType.value = 'new-note'
  showNoteEditor.value = true
}

function loadNotes() {
  notes.value = getNotes()
}

function closeNoteEditor() {
  showNoteEditor.value = false
  saveNotes()
}

function getNotes() {
  const notes = JSON.parse(localStorage.getItem('notes'))
  console.log(notes)
  if (notes?.length > 0) {
    return notes
  } else {
    return []
  }
}

function saveNotes() {
  nextTick(() => {
    localStorage.setItem('notes', JSON.stringify(notes.value))
  })
}

function updateEditorContent(event) {
  editor.value.options.content = event.target.innerHTML
}

loadNotes()
</script>

<template>
  <div class="app__title">
    Notes
  </div>
  <AppSearch v-model="search" />
  <AppNotes
    :filtered-noted="filteredNoted"
    :notes="notes"
    :editor="editor"
    :show-note-editor="showNoteEditor"
    @noteClick="noteClick"
    @saveNotes="saveNotes"
  />
  <AppNoteEditor
    v-if="showNoteEditor"
    :notes="notes"
    :show-note-editor="showNoteEditor"
    :editor-type="editorType"
    :selected-note="selectedNote"
    :editor="editor"
    :color-collection="colorCollection"
    @closeNoteEditor="closeNoteEditor()"
    @updateEditorContent="updateEditorContent"
    @addColorButton="addColorButton"
  />
  <button
    class="app__note-editor-button"
    @click="openNewNoteEdtior()"
  >
    <span class="material-symbols-outlined">add</span>
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
  background-color: var(--app-background-color);
  font-family: Ubuntu, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  background-color: var(--app-background-color);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--app-text-color);
  padding: 10px;
  margin: 0;
  padding: 0;
}

.app__note-editor-button {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
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

.app__title {
  margin: 20px 10px 10px 20px;
}
</style>
