<template>
  <div id = "search-modal" class = "modal-child" @click = "preventClosing">
    <div id = "search-bar">
      <div>
        <img :src = "'/src/assets/icons/search_black_24dp.svg'" />
      </div>
      <div>
        <input
          v-model = "searchString"
          type = "text" 
          placeholder = "Search for files"
          @input = "handleInput" />
      </div>
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
  import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
  import { useFilesStore } from '../stores/use-files-store.js';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';
  import { pathToArray } from '../utils/foldertree.js';

	export default {
		data() {
			return {
        searchString: ""
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
      preventClosing() {
        event.stopPropagation();
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/modal.scss";

  #search-bar {
    border-bottom: 1px solid $border-1;
    display: grid;
    grid-template-columns: 30px 1fr;
    padding: 10px;

    img {
      opacity: 0.5;
    }
    input {
      border: none;
      width: 100%;
      color: $font-light;
    }

    input:focus-visible {
      outline: none;
      box-shadow: none;
    }
  }

  #search-results {
    height: 100%;
    color: $font-dark;
    overflow-y: auto;
    scrollbar-width: thin;
    padding-bottom: 40px;

    ul {
      list-style-type: none;
      padding: 0;
    }

    .result {
      padding: 5px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .result:hover {
      background: $background-4;
    }

    .result-filename {
      font-weight: 600;
    }
    .result-path {
      font-weight: 200;
      color: $font-light;
      font-size: 0.8rem;
    }
  }
</style>