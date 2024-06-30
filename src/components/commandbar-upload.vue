<template>
  <div id = "commandbar-upload">
    <form id = "upload-form">
      <label for = "commandbar-fileinput">Browse files...</label>
      <input
        id = "commandbar-fileinput"
        type = "file"
        multiple = "true"
        @change = "handleChange" />
    </form>
    
    <div v-show = "uploadResponse" id = "upload-responses">
      <p>{{ uploadResponse }}</p>
    </div>
  </div>
</template>

<script>
  import { useUploadStore } from '../stores/use-upload-store.js';
  import { mapState, mapActions } from 'pinia';
  import { formatSize } from '../utils/utils.js';

	export default {
    data() {
      return{
        
      }
    },
    computed: {
      ...mapState(useUploadStore, ['fileInput', 'existingFiles', 'uploadResponse']),
    },
    methods: {
      ...mapActions(useUploadStore, ['handleUpload']),
      handleChange(event){
        this.handleUpload(event.target.files);
        // this.uploadFiles(event.target.files);
      },
      formatSize(size){
        return formatSize(size);
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

  
  #upload-responses{
    display: inline-block;
    font-size: 0.9rem;
    margin-top: 10px;
    margin-left: 10px;
    max-width: calc(100% - 200px);
    p {
      margin-bottom: 0px;
    }
  }

  #commandbar-upload {
    padding: 20px;
    label {
      background: $background-3;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 8px;
    }
    label:hover {
      background: $background-4;
    }
    input {
      display: none;
    }
    #upload-form {
      display: inline-block;
    }
  }

</style>