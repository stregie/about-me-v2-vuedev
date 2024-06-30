<template>
  <div id = "modal-move" class = "modal-child">
    <ul>
      <li v-for = "folder in foldersToDisplay">{{ folder }}</li>
    </ul>
    
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  // import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
  // import { useFilesStore } from '../stores/use-files-store.js';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';
  // import { pathToArray } from '../utils/foldertree.js';

	export default {
    data(){
      return {
        
      }
    },		
    computed: {
      // ...mapState(useFilesStore, ['fileListAvailable']),
      ...mapState(useFilesAndFoldersStore, ['foldersToDisplay']),
      
    },
    methods: {

    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/modal.scss";
  ul {
    list-style-type: none;
  }


</style>