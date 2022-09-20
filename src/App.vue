<script setup>
import { ref, computed } from 'vue';

const colorCollection = [
  { id: 1, name: 'blue', textColor: 'black', color: 'rgb(51, 105, 255)' },
  { id: 2, name: 'yellow', textColor: 'black', color: 'rgb(255, 218, 71)' },
  { id: 3, name: 'white', textColor: 'black', color: 'rgb(247, 245, 245)' },
  { id: 4, name: 'plum', textColor: 'black', color: 'rgb(174, 59, 118)' },
  { id: 5, name: 'azure', textColor: 'black', color: 'rgb(10, 235, 175)' },
  { id: 6, name: 'peach', textColor: 'black', color: 'rgb(255, 119, 70)' },
  { id: 7, name: 'black', textColor: 'white', color: 'rgb(14, 18, 27)' }
];

const search = ref('');
const notes = ref([]);
const noteEditor = ref({ title: '', content: '', backgroundColor: '' });
const filteredNoted = computed(() =>
  notes.value.filter(note => noteFilter(note))
);

function noteFilter (note) {
  const isEmpty = search.value === '';
  const titleMatch = note.title.includes(search.value);
  const contentMatch = note.content.includes(search.value);
  return isEmpty || titleMatch || contentMatch;
}

function addNoteButton () {
  addNote();
  clearEditor();
}

function addNote () {
  notes.value.push({
    id: notes.value.length + 1,
    title: noteEditor.value.title,
    content: noteEditor.value.content,
    backgroundColor: noteEditor.value.backgroundColor
  });
  console.log(notes.value.length);
  console.log(notes.value);
}

function addColorButton (colorName) {
  noteEditor.value.backgroundColor = colorCollection.find(color => color.name === colorName).color;
}


function deleteNoteButton (noteId) {
  deleteNote(noteId);
}

function deleteNote (noteId) {
  const noteIndex = notes.value.findIndex(note => note.id === noteId);
  notes.value.splice(noteIndex, 1);
}

function clearEditor () {
  noteEditor.value.title = '';
  noteEditor.value.content = '';
}
</script>
  
<template>
  <!-- Search -->
  <input
    id="app__search"
    v-model="search"
    type="text"
    placeholder="search"
  >

  <!-- Editor -->
  <div id="app__editor">
    <h1>Редактор заметок</h1>
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
          'app__editor-color--active': noteEditor.backgroundColor === item.color
        }"
        @click="addColorButton(item.name)"
      >
    </div>
    <input
      id="app__editor-title"
      v-model="noteEditor.title"
      type="text"
      placeholder="search"
    >
    <input
      id="app__editor-content"
      v-model="noteEditor.content"
      type="text"
      placeholder="search"
    >
    <button
      id="app__add-note-button"
      @click="addNoteButton"
    >
      Создать заметку
    </button>
  </div>

  <!-- Notes -->
  <div id="app__editor">
    <div
      v-for="(note, i) in filteredNoted"
      class="app__note"
      :style="{
        'background-color': note.backgroundColor,
        'color': 'black'
      }"
    >
      <div class="app__note-content">
        <button
          class="app__note-delete-button"
          @click="deleteNoteButton(note.id)"
        >
          &#215
        </button>
        <div class="app__note-title">
          {{ note.title }}
        </div>
        <div class="app__note-content">
          {{ note.content }}
        </div>
      </div>
    </div>
  </div>
</template>
  
<style>
#app__search {
  width: 200px;
  margin: 0;
  padding: 0;
}

#app__editor {
  margin-top: 20px;
}

#app__editor h1 {
  font-size: 16px;
  text-align: center;
}

#app__editor {
  display: flex;
  flex-direction: column;
  width: 200px;
}

.app__note {
  width: 200px;
  height: 200px;
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
}

.app__note-delete-button {
  cursor: pointer;
  z-index: 1;
  font-size: 14px;
  margin: 0;
  padding: 0px 5px;
  position: absolute;
  top: 0px;
  right: 0px;
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
}

.app__editor-color:hover {
  border: solid 2px rgb(65, 64, 64)
}

.app__editor-color:active {
  transform: scale(0.9);
}

.app__editor-color--active {
  border: 2px solid black;
}

#app__editor-color-blue {
  background-color: rgb(51, 105, 255);
}

#app__editor-color-yellow {
  background-color: rgb(255, 218, 71);
}

#app__editor-color-white {
  background-color: rgb(247, 245, 245);
}

#app__editor-color-plum {
  background-color: rgb(174, 59, 118);
}

#app__editor-color-azure {
  background-color: rgb(10, 235, 175);
}

#app__editor-color-peach {
  background-color: rgb(255, 119, 70);
}

#app__editor-color-black {
  background-color: rgb(14, 18, 27);
}
</style>

<!-- :style = "{'background-color':backgroundColor.value}" -->