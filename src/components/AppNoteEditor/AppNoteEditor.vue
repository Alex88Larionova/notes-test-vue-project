<script setup>
import { ref } from 'vue'

const props = defineProps({
  notes: Array,
  showNoteEditor: Boolean,
  selectedNote: Object,
  editorType: String // new-note | edit-note
})
const emit = defineEmits(['closeNoteEditor'])

const colorCollection = [
  { id: 1, name: 'blue', textColor: 'black', color: 'rgb(51, 105, 255)' },
  { id: 2, name: 'yellow', textColor: 'black', color: 'rgb(255, 218, 71)' },
  { id: 3, name: 'white', textColor: 'black', color: 'rgb(247, 245, 245)' },
  { id: 4, name: 'plum', textColor: 'black', color: 'rgb(174, 59, 118)' },
  { id: 5, name: 'azure', textColor: 'black', color: 'rgb(10, 235, 175)' },
  { id: 6, name: 'peach', textColor: 'black', color: 'rgb(255, 119, 70)' },
  { id: 7, name: 'black', textColor: 'white', color: 'rgb(14, 18, 27)' }
]

const noteEditor = ref({
  title: '',
  content: '',
  backgroundColor: '',
  textColor: '',
  nameColor: ''
})

function addNoteButton() {
  emit('closeNoteEditor')
  addNote()
  clearEditor()
}

function editNoteButton() {
  emit('closeNoteEditor')
  saveNote()
  clearEditor()
}

function closeNoteEditor() {
  emit('closeNoteEditor')
  clearEditor()
}

function addNote() {
  props.notes.push({
    id: props.notes.length + 1,
    title: noteEditor.value.title,
    content: noteEditor.value.content,
    backgroundColor: noteEditor.value.backgroundColor,
    textColor: noteEditor.value.textColor,
    nameColor: noteEditor.value.nameColor
  })
  console.log(props.notes.length)
  console.log(props.notes)
}

function saveNote() {
  props.selectedNote.title = noteEditor.value.title
  props.selectedNote.content = noteEditor.value.content
  props.selectedNote.backgroundColor = noteEditor.value.backgroundColor
}

function addColorButton(colorName) {
  noteEditor.value.backgroundColor = colorCollection.find(
    color => color.name === colorName
  ).color
  noteEditor.value.textColor = colorCollection.find(
    color => color.name === colorName
  ).textColor
  noteEditor.value.nameColor = colorCollection.find(
    color => color.name === colorName
  ).name
}

function clearEditor() {
  noteEditor.value.title = ''
  noteEditor.value.content = ''
}

function loadEditor () {
  if (props.editorType === 'new-note') {
    return
  }
  else if (props.editorType === 'edit-note') {
    noteEditor.value.title = props.selectedNote.title
    noteEditor.value.content = props.selectedNote.content
    noteEditor.value.backgroundColor = props.selectedNote.backgroundColor
  }
}

loadEditor()
</script>

<template>
  <div id="app__editor">
    <div
      class="app__close-editor-button"
      @click="closeNoteEditor"
    >
      &#215
    </div>
    <h1>Note editor ({{ editorType === 'new-note' ? 'New note' : 'Edit note' }})</h1>
    <p />
    <div class="app__colors">
      <input
        v-for="item in colorCollection"
        id="app__editor-color-blue"
        class="app__editor-color"
        type="button"
        :style="{
          'background-color': item.color
        }"
        :class="{
          'app__editor-color--active':
            noteEditor.backgroundColor === item.color
        }"
        @click="addColorButton(item.name)"
      >
    </div>
    <input
      id="app__editor-title"
      v-model="noteEditor.title"
      type="text"
      placeholder="Title..."
    >
    <textarea
      id="app__editor-content"
      v-model="noteEditor.content"
      type="text"
      placeholder="Content..."
    />

    <button
      v-if="props.editorType === 'new-note'"
      id="app__add-note-button"
      @click="addNoteButton"
    >
      Создать заметку
    </button>

    <button
      v-if="props.editorType === 'edit-note'"
      id="app__save-note-button"
      @click="editNoteButton"
    >
      Сохранить
    </button>
  </div>
</template>

<style>
.app__title {
  font-size: 24px;
  font-weight: 600;
  margin: 0px 10px;
}

#app__editor-title {
  background-color: var(--app-input-background-color);
  border: 0;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 15px;
  width: 50%;
  max-width: 400px;
  color: var(--app-text-color);
}

#app__editor-content {
  background-color: var(--app-input-background-color);
  border: 0;
  padding: 5px;
  border-radius: 15px;
  width: 50%;
  max-width: 400px;
  color: var(--app-text-color);
  word-wrap: break-word;
  min-height: 100px;
  max-height: auto;
}

#app__editor h1 {
  margin-bottom: 5px;
  font-size: 20px;
  text-align: center;
  width: 50%;
  max-width: 400px;
}

#app__editor p {
  margin-top: 0;
  margin-bottom: 10px;
  height: 2px;
  width: 50%;
  max-width: 400px;
  background-color:rgb(51, 105, 255, 0.5);
  box-shadow: 3px 3px 6px var(--app-notes-shadow-color);
}

#app__editor {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--app-text-color);
}

.app__colors {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 200px;
  margin: 0px;
  padding: 0px;
  margin-bottom: 10px;
}

.app__editor-color {
  cursor: pointer;
  margin-left: 2px;
  padding: 0px;
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  box-shadow: 3px 3px 6px var(--app-notes-shadow-color);
}

.app__editor-color:hover {
  border: solid 2px var(--app-buttons-shadow-color);
}

.app__editor-color:active {
  transform: scale(0.9);
}

.app__editor-color--active {
  border: 2px solid var(--app-buttons-main-color);
}

#app__add-note-button,
#app__save-note-button {
  background-color: var(--app-buttons-main-color);
  border: 0;
  padding: 5px 15px;
  color: rgb(228, 227, 227);
  box-shadow: 2px 2px 5px var(--app-notes-shadow-color);
  margin-top: 10px;
  border-radius: 10px;
}

.app__close-editor-button {
  display: flex;
  justify-content: center;
  align-items:center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  margin:0;
  background-color: var(--app-buttons-main-color);
  color: var(--app-text-color);
  font-size: 20px;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 5px 5px 15px var(--app-notes-shadow-color);
}
</style>
