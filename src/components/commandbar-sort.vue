<template>
  <div id = "commandbar-sort">
    <button
      type = "button"
      @click = "changeSortOrder('filename')">
      Name
      <span v-show = "sortBy.column === 'filename' && sortBy.ascending">▲</span>
      <span v-show = "sortBy.column === 'filename' && !sortBy.ascending">▼</span>
    </button>
    <button
      type = "button"
      @click = "changeSortOrder('extension')">
      Extension
      <span v-show = "sortBy.column === 'extension' && sortBy.ascending">▲</span>
      <span v-show = "sortBy.column === 'extension' && !sortBy.ascending">▼</span>
    </button>
    <button
      type = "button"
      @click = "changeSortOrder('size')">
      Size
      <span v-show = "sortBy.column === 'size' && sortBy.ascending">▲</span>
      <span v-show = "sortBy.column === 'size' && !sortBy.ascending">▼</span>
    </button>
    <button
      type = "button"
      @click = "changeSortOrder('date')">
      Date
      <span v-show = "sortBy.column === 'date' && sortBy.ascending">▲</span>
      <span v-show = "sortBy.column === 'date' && !sortBy.ascending">▼</span>
    </button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';

	export default {
    computed: {
      ...mapState(useFilesAndFoldersStore, ['sortBy']),
    },
    methods: {
      ...mapActions(useFilesAndFoldersStore, ['changeSortOrder']),
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

  #commandbar-sort {
    margin: 10px 0px;
  }

  @media (min-width: 769px) {
    #commandbar-sort {
      column-gap: 1px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      
      button {
        margin-right: 0px;
      }
    }
  }


  @media (max-width: 768px) {
    #commandbar-sort {
      display: block;

      button {
        display: block;
        padding: 4px 20px;
        text-align: left;
        width: 100%;
      }
    }
  }
</style>