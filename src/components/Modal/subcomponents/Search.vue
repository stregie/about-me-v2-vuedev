<template>
  <div id = "modal-search" class = "modal-child modal-large">
    <div id = "search-bar">
      <img :src = "searchIcon" />
      <input
        v-model = "searchString"
        type = "text" 
        placeholder = "Search for files"
        @input = "handleInput" />
      <button
        type = "button"
        @click = "closeModal">
        <img :src = "closeIcon" />
      </button>
    </div>

    <div id = "search-results">
      <ul>
        <li v-for = "file in searchResults" class = "result" @click = "jumpToFile(file.path)">
          <div class = "result-filename">{{ file.filename }}</div>
          <div class = "result-path">{{ file.path }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import { useFilesStore } from '/src/stores/use-files-store.js';
  import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';
  import { pathToArray } from '/src/utils/foldertree.js';
   import closeIcon from '/src/assets/icons/close_black_24dp.svg';
  import searchIcon from '/src/assets/icons/search_black_24dp.svg';


	export default {
		data() {
			return {
        closeIcon: closeIcon,
        searchString: "",
        searchIcon: searchIcon,
			}
		},
    computed: {
      ...mapState(useFilesAndFoldersStore, ['searchBy', 'searchResults']),
    },
    methods: {
      ...mapActions(useFilesAndFoldersStore, ['changeActiveFolder', 'changeSearchBy']),
      ...mapActions(useComponentDisplayStore, ['closeSidebar', 'closeModal']),
      handleInput() {
        this.changeSearchBy(this.searchString);
      },
      jumpToFile(pathString) {
        this.changeActiveFolder(pathToArray(pathString));
        this.closeModal();
        this.closeSidebar();
        this.changeSearchBy("");
      },
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>