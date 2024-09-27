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
  import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';

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
  @import "/src/assets/css/commandbar.scss";
</style>