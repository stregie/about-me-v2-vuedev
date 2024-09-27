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
      @click = "changeSortOrder('uploaddate')">
      Date
      <span v-show = "sortBy.column === 'uploaddate' && sortBy.ascending">▲</span>
      <span v-show = "sortBy.column === 'uploaddate' && !sortBy.ascending">▼</span>
    </button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';

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
  @import "/src/assets/css/commandbar.scss";
</style>