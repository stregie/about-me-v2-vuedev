<template>
  <div id = "commandbar-filter">
    <form class = "name-filter">
      <input 
        type = "text"
        class = "commandbar-input"
        placeholder = "Name"
        v-model = "filterOptions.filename"
        @input = "handleFilterInput" />
    </form>
    <form class = "extension-filter">
      <input 
        type = "text"
        class = "commandbar-input"
        v-model = "filterOptions.extension"
        placeholder = "Extension"
        @input = "handleFilterInput" />
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'pinia';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';
  import '../assets/css/commandbar.scss';

	export default {
		data() {
			return {
        filterOptions: {
          filename: "",
          extension: ""
        }
			}
		},
    methods: {
      ...mapActions(useFilesAndFoldersStore, ['changeFilter']),
      handleFilterInput(){
        this.changeFilter(this.filterOptions);
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

  #commandbar-filter {
    margin: 10px 0px;
  }

  @media (min-width: 769px) {
    #commandbar-filter {
      column-gap: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 470px;
    }
  }

  @media (max-width: 768px) {
    #commandbar-filter {
      display: block;
    }
  }
</style>