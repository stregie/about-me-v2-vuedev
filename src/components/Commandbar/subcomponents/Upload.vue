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

    <div 
      v-if = "uploading"
      id = "progress-indicator">
      <div
        class = "progress-bar"
        :class = "[uploadProgress < 100 ? 'uploading' : 'processing']">
      </div>
    </div>
  </div>
</template>

<script>
  import { useUploadStore } from '/src/stores/use-upload-store.js';
  import { mapState, mapActions } from 'pinia';

	export default {
    computed: {
      ...mapState(useUploadStore, ['uploading', 'uploadProgress', 'uploadPercent']),
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

  .uploading {
    background-image: conic-gradient(at v-bind(uploadPercent) 100%, $background-1, $background-4);
  }
</style>