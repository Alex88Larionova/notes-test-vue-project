<script setup>
import Search from '@/components/Search/Search.vue'
import { languages } from '@/localization/data.js'
import { i18n } from '@/localization/i18n.js'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/vue-3'
import clone from 'lodash.clonedeep'
import { computed, nextTick, ref } from 'vue'
import NoteEditor from './NoteEditor/NoteEditor.vue'
import Notes from './Notes/Notes.vue'

const locale = i18n.locale
console.log(i18n)

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
  nameColor: '',
  date: ''
})

function noteFilter(note) {
  const isEmpty = search.value === ''
  const titleMatch = note.title?.includes?.(search.value)
  const contentMatch = note.content?.includes?.(search.value)
  const colorMatch = note.nameColor?.includes(search.value)
  return isEmpty || titleMatch || contentMatch || colorMatch
}

function newNote() {
  notes.value.push({
    id: notes.value.length + 1,
    title: editor.value.title,
    content: editor.value.options.content,
    backgroundColor: editor.value.backgroundColor,
    textColor: editor.value.textColor,
    nameColor: editor.value.nameColor,
    date: getDate()
  })
  nextTick(() => {
    const notesElements = document.querySelectorAll('.app__note')
    const lastNoteElement = notesElements[notesElements.length - 1]
    lastNoteElement.classList.add('visible')
  })
}

function saveEditedNote() {
  selectedNote.value.title = editor.value.title
  selectedNote.value.content = editor.value.options.content
  selectedNote.value.backgroundColor = editor.value.backgroundColor
  selectedNote.value.textColor = editor.value.textColor
  console.log(editor.value.options.content)

}

function clearEditor() {
  editor.value.title = ''
  editor.value.options.content = ''
}

function loadSelectedNote(){
  editor.value.title = selectedNote.value.title
  editor.value.commands.setContent(selectedNote.value.content)
  editor.value.backgroundColor = selectedNote.value.backgroundColor
}

function addColorButton(colorName) {
  const colorCollectionItem = colorCollection.value.find(color => color.name === colorName)
  editor.value.backgroundColor = colorCollectionItem?.color
  editor.value.textColor = colorCollectionItem?.textColor
  editor.value.nameColor = colorCollectionItem?.name
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

function cloneNote(note) {
  notes.value.push(clone(note))
}

function getDate() {
  const currentDate = new Date()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  return `${hours}:${minutes}`
}





loadNotes()
</script>

<template>
  <div class="app__header">
    <div class="app__title">
      {{ $t("notes") }}
    </div>
    {{ locale }}

    <div id="selector">
      <select v-model="languages.name">
        <option
          v-for="item in languages"
          :value="item"
        >
          {{ item.name }}
          {{ item.locale }}
        </option>
        <!-- {{ item.locale }} -->
      </select>
    </div>
  </div>
  <Search v-model="search" />
  <Notes
    :filtered-noted="filteredNoted"
    :notes="notes"
    :editor="editor"
    :show-note-editor="showNoteEditor"
    @noteClick="noteClick"
    @saveNotes="saveNotes"
    @cloneNote="cloneNote"
  />
  <NoteEditor
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
    @newNote="newNote"
    @saveEditedNote="saveEditedNote"
    @clearEditor="clearEditor"
    @loadSelectedNote="loadSelectedNote"
    @setTitle="editor.title=$event.target.value"
  />
  <button
    class="app__note-editor-button"
    @click="openNewNoteEdtior()"
  >
    <span class="material-symbols-outlined">add</span>
  </button>
</template>

<style>
.app__header{
display: flex;
justify-content: space-between;
overflow: hidden;
}

#selector{
margin: 20px 70px 10px 20px;
}

.app__title{
margin: 20px 0px 10px 20px;
}
</style>
