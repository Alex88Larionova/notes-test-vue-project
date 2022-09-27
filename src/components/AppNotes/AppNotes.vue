<script setup>
const props = defineProps({
  filteredNoted: Array,
  notes: Array,
  showNoteEditor: Boolean
})

const emit = defineEmits(['showNoteEditor'])

function deleteNoteButton (noteId) {
  deleteNote(noteId)
}


function deleteNote (noteId) {
  const noteIndex = notes.value.findIndex(note => note.id === noteId)
  notes.value.splice(noteIndex, 1)
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
      @click="emit('showNoteEditor')"
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
  cursor: pointer;
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
  background-color: var(--app-buttons-main-color);
  border: 3px solid var(--app-buttons-main-color);
  border-radius: 50%;
  color: rgb(228, 227, 227);
  box-shadow: 2px 2px 5px var(--app-buttons-shadow-color);
}
</style>







