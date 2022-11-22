<script setup>

</script>

<template>
  <RouterView />
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
