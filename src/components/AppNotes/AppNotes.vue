<script setup>
    

    const props = defineProps({
    filteredNoted: Array,
    notes: Array
  })

function deleteNoteButton(noteId) {
  deleteNote(noteId);
}

function deleteNote(noteId) {
  const noteIndex = notes.value.findIndex((note) => note.id === noteId);
  notes.value.splice(noteIndex, 1);
}
</script>

<template> 
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
</style>







