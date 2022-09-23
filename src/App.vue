<script setup>
  import { ref, computed } from 'vue';
  import AppSearch from './components/AppSearch/AppSearch.vue';
  
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
  const noteEditor = ref({ title: '', content: '', backgroundColor: '', textColor: '', nameColor: '' });
  const filteredNoted = computed(() =>
    notes.value.filter(note => noteFilter(note))
  );
  
  function noteFilter (note) {
    const isEmpty = search.value === '';
    const titleMatch = note.title.includes(search.value);
    const contentMatch = note.content.includes(search.value);
    const colorMatch = note.nameColor.includes(search.value);
    return isEmpty || titleMatch || contentMatch || colorMatch;
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
      backgroundColor: noteEditor.value.backgroundColor,
      textColor: noteEditor.value.textColor,
      nameColor: noteEditor.value.nameColor,
    });
    console.log(notes.value.length);
    console.log(notes.value);
  }
  
  function addColorButton (colorName) {
    noteEditor.value.backgroundColor = colorCollection.find(color => color.name === colorName).color;
    noteEditor.value.textColor = colorCollection.find(color => color.name === colorName).textColor;
    noteEditor.value.nameColor = colorCollection.find(color => color.name === colorName).name;
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
  
  <div class="app__title">Notes</div>
    <AppSearch :test="search" />

    <div id="app__editor">
  
    <!-- Editor -->
    <button class="app__note-editor-button">+</button>
      <h1>Редактор заметок</h1>
      <div class="app__colors">
        <input
          v-for="item in colorCollection"
          id="app__editor-color-blue"
          class="app__editor-color"
          type="button"
          :style="{
            'background-color': item.color,
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
        placeholder="Title..."
      >
      <input
        id="app__editor-content"
        v-model="noteEditor.content"
        type="text"
        placeholder="Content..."
      >
      <button
        id="app__add-note-button"
        @click="addNoteButton"
      >
        Создать заметку
      </button>
    </div>
  
    <!-- Notes -->
    <div id="app__notes">
      <div
        v-for="(note, i) in filteredNoted"
        class="app__note"
        :style="{
          'background-color': note.backgroundColor,
          'color': note.textColor
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
  
  :root{
    --app-background-color:rgb(14, 18, 27);
    --app-buttons-main-color:rgb(51, 105, 255);
    --app-buttons-shadow-color:rgb(81, 88, 184);
    --app-notes-shadow-color:rgb(37, 40, 78);
    --app-input-background-color:rgb(23, 28, 38);
    --app-text-color:rgb(228, 227, 227);
  }

  body{
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
    color:var(--app-text-color);
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
  box-shadow:5px 5px 15px var(--app-notes-shadow-color);
}

.app__title {
  font-size: 24px;
  font-weight: 600;
  margin: 0px 10px;
}

   
  #app__editor-title{
    background-color: var(--app-input-background-color);
    border:0;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 15px;
  }

  #app__editor-content{
    background-color: var(--app-input-background-color);
    border:0;
    padding: 5px;
    border-radius: 15px;
  }
  
  
  #app__editor h1 {
    font-size: 16px;
    text-align: center;
  }
  
  #app__editor {
    margin-left: 10px;
    background-color: var(--app-background-color);
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    
  }
  
  #app__notes {
    
    display: flex;
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  
  }
  
  .app__note {
    width: 200px;
    height: 200px;
    margin: 10px 0px;
    padding: 20px;
    border: 0;
    border-radius: 15px;
    box-shadow: 3px 3px 5px var(--app-notes-shadow-color);
  }
  
  .app__note-delete-button {
    cursor: pointer;
    z-index: 1;
    font-size: 14px;
    margin: 0;
    padding: 0px 5px;
    background-color:var(--app-buttons-main-color);
    border:3px solid var(--app-buttons-main-color);
    border-radius: 50%;
    color:rgb(228, 227, 227);
    box-shadow: 2px 2px 5px var(--app-buttons-shadow-color);
  }

  .app__note-delete-button:hover {
    transform: scale(0.9);
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
    border: solid 2px var(--app-buttons-shadow-color)
  }
  
  .app__editor-color:active {
    transform: scale(0.9);
  }
  
  .app__editor-color--active {
    border: 2px solid var(--app-buttons-main-color);
  }
  
  #app__add-note-button {
    background-color: var(--app-buttons-main-color);
    border:0;
    padding: 5px 15px;
    color: rgb(228, 227, 227);
    box-shadow: 2px 2px 5px var(--app-notes-shadow-color);
    margin-top:10px;
    border-radius:10px;
  }
  
  </style>
  
  