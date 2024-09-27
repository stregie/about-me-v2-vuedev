<template>
  <div id = "draganddrop-upload" @drag = "handleDrag">
    <h1>Drop files to upload</h1>
    <!-- <label for = "draganddrop-fileinput">Browse files...</label>
    <input
      id = "draganddrop-fileinput"
      type = "file"
      multiple = "true"
      @change = "handleChange" /> -->
  </div>
</template>

<script>
  // import { useUploadStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  import { formatSize } from '/src/utils/utils.js';

	export default {
		data() {
			return {
        
			}
		},
    computed: {
      // ...mapState(useUploadStore, ['fileInput', 'serverResponse']),
    },
    methods: {
      // ...mapActions(useUploadStore, ['uploadFiles']),
      handleChange(event){
        // this.uploadFiles(event.target.files);
      },
      formatSize(size){
        return formatSize(size);
      },
      handleDrag(event){
        

      }
    }
  }
</script>

<style lang = "scss" scoped>
  #draganddrop-upload {
    border: 10px dashed #CCC;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #CCC;
  }
</style>