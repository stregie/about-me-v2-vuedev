<template>
  <div id = "modal-rename" class = "modal-child modal-small">
    <h3 class = "modal-title">Rename file</h3>

    <form>
      <input class = "commandbar-input" type = "text" v-model = "renameFileTo.newFileName" ref = "modalRenameFilenameInput">
      <input class = "commandbar-input" type = "text" v-model = "renameFileTo.newExtension">
    </form>

    <div class = "modal-small-buttons">
      <button class = "button-A button-A-color" @click = "renameFile">Rename</button>  
      <button class = "button-A" @click = "closeModal">Cancel</button>  
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import { useFilesStore } from '/src/stores/use-files-store.js';
  // import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';

	export default {
    data(){
      return {
        filename: "testname",
        extension: "txt"
      }
    },		
    computed: {
      ...mapState(useFilesStore, ['renameFileTo'])
    },
    methods: {
      ...mapActions(useComponentDisplayStore, ['closeModal']),
      ...mapActions(useFilesStore, ['renameFile']),
    },
    mounted() {
      this.$refs.modalRenameFilenameInput.focus();
      this.$refs.modalRenameFilenameInput.select();
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>