<template>
  <div id = "commandbar-upload">
    <form id = "upload-form">
      <label for = "commandbar-fileinput">Browse files...</label>
      <input
        id = "commandbar-fileinput"
        type = "file"
        multiple = "true"
        @change = "handleChange"/>
    </form>

    <div v-if = "processing" id = "progress-indicator">
      <div class = "progress-bar processing"></div>
    </div>
  </div>
</template>

<script>
  import { useUploadStore } from '/src/stores/use-upload-store.js';
  import { mapState, mapActions } from 'pinia';

	export default {
    computed: {
      ...mapState(useUploadStore, ['processing']),
    },
    methods: {
      ...mapActions(useUploadStore, ['handleUpload']),
      handleChange(event){
        this.handleUpload(event.target.files);
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/commandbar.scss";
</style>