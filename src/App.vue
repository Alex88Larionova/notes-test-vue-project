<script setup>
import { rewriteDefault } from "@vue/compiler-sfc";
import { ref, computed } from "vue";



const colorCollection = [{name: 'blue', color: 'rgb(51, 105, 255)'},
{name: 'yellow', color: 'rgb(255, 218, 71)'},
{name: 'white', color: 'rgb(247, 245, 245)'},
{name: 'plum', color: 'rgb(174, 59, 118)'},
{name: 'azure', color: 'rgb(10, 235, 175)'},
{name: 'peach', color: 'rgb(255, 119, 70)'},
{name: 'black', color: 'rgb(14, 18, 27)'}]

const search = ref("");
const notes = ref([]);
const noteEditor = ref({ title: "", content: "", backgroundColor: ""});
const filteredNoted = computed(() =>
  notes.value.filter((note) => noteFilter(note))
);

function noteFilter(note) {
  const isEmpty = search.value === "";
  const titleMatch = note.title.includes(search.value);
  const contentMatch = note.content.includes(search.value);
  return isEmpty || titleMatch || contentMatch;
}

function addNoteButton() {
  addNote();
  clearEditor();
}

function addNote() {
  notes.value.push({
    title: noteEditor.value.title,
    content: noteEditor.value.content,
    backgroundColor: noteEditor.value.backgroundColor
  });
  console.log(notes.value.length)
  console.log(notes.value)
}

function addColorButton(i){
  noteEditor.value.backgroundColor =  colorCollection[i].color
  console.log(noteEditor.value.backgroundColor)
}


function deleteNoteButton(i) {
  deleteNote(i)
}

function deleteNote(i) {
  notes.value.splice(i,1)
}

function clearEditor() {
  noteEditor.value.title = "";
  noteEditor.value.content = "";
}
</script>

<template>
  <!-- Search -->
  <input v-model="search" id="app__search" type="text" placeholder="search" />

  <!-- Editor -->
  <div id="app__editor">
    <h1>Редактор заметок</h1>
    <div class="app__colors">  
    <input
    class="app__editor-color"
    id="app__editor-color-blue"
    type = 'button'
    :style="{'background-color': 'rgb(51, 105, 255)'}"
    @click="addColorButton(0)">
    <input
    class="app__editor-color"
    id="app__editor-color-yellow"
    type = 'button'
    :style="{'background-color': 'rgb(255, 218, 71)'}"
    @click="addColorButton(1)">
    <input
    class="app__editor-color"
    id="app__editor-color-white"
    type = 'button'
    @click="addColorButton(2)">
    <input
    v-model="noteEditor.color"
    class="app__editor-color"
    id="app__editor-color-plum"
    type = 'button'
    @click="addColorButton(3)">
    <input
    class="app__editor-color"
    id="app__editor-color-azure"
    type = 'button'
    @click="addColorButton(4)">
    <input
    class="app__editor-color"
    id="app__editor-color-peach"
    type = 'button'
    @click="addColorButton(5)">
    <input
     class="app__editor-color"
    id="app__editor-color-black"
    type = 'button'
    @click="addColorButton(6)">
    
  </div>
  <input
      v-model="noteEditor.title"
      id="app__editor-title"
      type="text"
      placeholder="search"/>
    <input
      v-model="noteEditor.content"
      id="app__editor-content"
      type="text"
      placeholder="search"
    />
    <button id="app__add-note-button" @click="addNoteButton">
      Создать заметку
    </button>
  </div>
  
  <!-- Notes -->
  <div id="app__editor">
    <div class="app__note" 
    v-for="(note, i) in filteredNoted"
    :style = "{'background-color':noteEditor.backgroundColor}"
    >
      <div class="app__note-content">
        <button class="app__note-delete-button" @click="deleteNoteButton(i)">&#215</button>
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

#app__editor h1{
  font-size: 16px;
  text-align: center;
}

#app__editor  {
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