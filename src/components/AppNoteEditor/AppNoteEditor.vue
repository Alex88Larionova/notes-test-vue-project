<script setup>
import { EditorContent } from '@tiptap/vue-3'
import clone from 'lodash.clonedeep'
const props = defineProps({
  notes: Array,
  showNoteEditor: Boolean,
  selectedNote: Object,
  editorType: String, // new-note | edit-note
  editor: Object,
  colorCollection: Array
})
const emit = defineEmits(['closeNoteEditor', 'noteClick', 'addColorButton'])

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
    title: props.editor.title,
    content: props.editor.options.content,
    backgroundColor: props.editor.backgroundColor,
    textColor: props.editor.textColor,
    nameColor: props.editor.nameColor
  })

}

function saveNote() {
  props.selectedNote.title = props.editor.title
  props.selectedNote.content = props.editor.options.content
  props.selectedNote.backgroundColor = props.editor.backgroundColor

}

function clearEditor() {
  props.editor.title = ''
  props.editor.options.content = ''
}

function loadEditor () {
  if (props.editorType === 'new-note') {
    return
  }
  else if (props.editorType === 'edit-note') {
    const selectedNoteClone = clone(props.selectedNote)
    props.editor.title = props.selectedNote.title
    props.editor.commands.setContent(props.selectedNote.content)
    props.editor.backgroundColor = props.selectedNote.backgroundColor
  }
}

function addImage() {
  const url = window.prompt('URL')
  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run()
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
    <h1>Note editor ({{ editorType === 'new-note' ? 'New' : 'Edit' }})</h1>
    <p />
    <div class="app__colors">
      <input
        v-for="item in props.colorCollection"
        id="app__editor-color-blue"
        :key="item.color"
        class="app__editor-color"
        type="button"
        :style="{
          'background-color': item.color
        }"
        :class="{
          'app__editor-color--active':
            props.editor.backgroundColor === item.color
        }"
        @click="emit('addColorButton',item.name)"
      >
      test {{ props.editor }}
    </div>
    <input
      id="app__editor-title"
      v-model="props.editor.title"
      type="text"
      placeholder="Title..."
    >

    <div id="app__editor-toolbar">
      <button
        :class="{ 'is-active': props.editor.isActive('bold') }"
        @click="props.editor.chain().focus().toggleBold().run()"
      >
        Bold
      </button>
      <button
        :class="{ 'is-active': props.editor.isActive('OrderedList') }"
        @click="props.editor.chain().focus().toggleOrderedList().run()"
      >
        OrderedList
      </button>
      <div v-if="props.editor">
        <button @click="addImage">
          setImage
        </button>
      </div>
    </div>

    <EditorContent
      id="app__editor-content"
      :editor="props.editor"
      :value="props.editor.options.content"
      @input="emit('updateEditorContent', $event)"
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
.ProseMirror {
  height: 100%;
}

.ProseMirror li {
  height: 30px;
}

.is-active {
  background: blue;
}

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

#app__editor-toolbar{
  width: 50%;
  max-width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
