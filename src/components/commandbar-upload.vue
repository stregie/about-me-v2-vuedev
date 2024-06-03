<template>
  <div id = "commandbar-upload">
    <label for = "commandbar-fileinput">Browse files...</label>
    <input
      id = "commandbar-fileinput"
      type = "file"
      multiple = "true"
      @change = "handleChange" />
  </div>
  <!-- <p>Server Response: {{ serverResponse }}</p> -->
  <!-- <ul>
    <li v-for = "x in fileInput">{{ x.name }}, Size: {{ formatSize(x.size) }}</li>
  </ul> -->
</template>

<script>
  import { useUploadStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  import { formatSize } from '../utils/utils.js';

	export default {
    computed: {
      ...mapState(useUploadStore, ['fileInput', 'serverResponse']),
    },
    methods: {
      ...mapActions(useUploadStore, ['uploadFiles']),
      handleChange(event){
        this.uploadFiles(event.target.files);
      },
      formatSize(size){
        return formatSize(size);
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

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
  }
</style>