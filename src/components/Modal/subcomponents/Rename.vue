<template>
  <div id = "modal-rename" class = "modal-child modal-small">
    <h3 class = "modal-title">Rename file</h3>

    <form>
      <input class = "commandbar-input" type = "text" v-model = "filename" ref = "modalRenameFilenameInput">
      <input class = "commandbar-input" type = "text" v-model = "extension"> 
    </form>

    <div class = "modal-small-buttons">
      <button class = "button-A button-A-color">Rename</button>  
      <button class = "button-A" @click = "closeModal">Cancel</button>  
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  // import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';

	export default {
    data(){
      return {
        filename: "testname",
        extension: "txt"
      }
    },		
    computed: {
      
    },
    methods: {
      ...mapActions(useComponentDisplayStore, ['closeModal']),
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