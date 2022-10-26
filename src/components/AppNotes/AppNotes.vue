<script setup>
const props = defineProps({
  filteredNoted: Array,
  notes: Array,
  showNoteEditor: Boolean
})

const emit = defineEmits(['noteClick', 'cloneNote'])

function deleteNoteButton (noteId) {
  deleteNote(noteId)
  emit('saveNotes')
}

function deleteNote (noteId) {
  const noteIndex = props.notes.findIndex(note => note.id === noteId)
  props.notes.splice(noteIndex, 1)
}
</script>

<template>
  <div id="app__notes">
    <div
      v-for="(note, index) in filteredNoted"
      :key="'note-' + index"
      class="app__note"
      :style="{
        'background-color': note.backgroundColor,
        'color': note.textColor
      }"
      @click="emit('noteClick', note)"
    >
      <div class="app__note-content">
        <button
          class="app__note-delete-button"
          @click.stop="deleteNoteButton(note.id)"
        >
          &#215
        </button>
        <!-- <button
          class="app__note-delete-button"
          @click.stop="emit('cloneNote', note)"
        >
          clone
        </button> -->
        {{ note.date }}
        <div class="app__note-title">
          {{ note.title }}
        </div>
        <div
          class="app__note-content"
          v-html="note.content"
        />
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
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  margin-left: 20px;
}

.app__note {
  cursor: pointer;
  width: 200px;
  min-height: 200px;
  max-height: auto;
  margin: 10px 0px;
  padding: 20px;
  border: 0;
  border-radius: 15px;
  box-shadow: 3px 3px 5px var(--app-notes-shadow-color);
}

.app__note-content {
   display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction:column;
}

.app__note-content p{
margin: 0;
}

.app__note-delete-button {
  align-self: flex-end;
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

.app__note-title{
font-size: 18px;
margin-bottom: 15px;
margin-top: 0;
}
</style>







