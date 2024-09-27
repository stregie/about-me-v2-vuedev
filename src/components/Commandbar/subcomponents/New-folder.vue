<template>
  <div id = "commandbar-new-folder">
    <form>
      <input 
        type = "text"
        class = "commandbar-input"
        placeholder = "Folder name"
        v-model = "folderName" />

      <button 
        type = "button"
        class = "button-A"
        @click = "createNewFolder(folderName)">
        Create
      </button>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useFoldersStore } from '/src/stores/use-folders-store.js';

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
  @import "/src/assets/css/commandbar.scss";
</style>