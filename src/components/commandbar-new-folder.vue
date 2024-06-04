<template>
  <div id = "commandbar-new-folder">
    <form>
      <input 
          type = "text"
          class = "commandbar-input"
          placeholder = "Folder name"
          v-model = "folderName" />
      <button type = "button" @click = "createNewFolder(folderName)">Create</button>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useFoldersStore } from '../stores/use-folders-store.js';

	export default {
    data() {
      return {
        folderName: ""
      }
    },
    methods: {
      ...mapActions(useFoldersStore, ['createNewFolder'])
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

  #commandbar-new-folder {
    padding: 20px;
    
    form {
      display: flex;
      align-items: center;
    }
    
    .commandbar-input {
      display: block;
      margin-bottom: 0px;
      margin-right: 30px;
      width: 200px;
    }
    
    button {
      background: $background-3;
      border-radius: 8px;
      color: $font-dark;
      cursor: pointer;
      display: block;
      margin-right: 40px;
      padding: 5px 10px;
    }
    
    button:hover {
      background: $background-4;
    }
  }
</style>