<template>
  <div 
    id = "modal-preview"
    class = "modal-child modal-flexible">

    <div class = "modal-preview-title">
      <h3>Preview</h3>
      <button 
        type = "button"
        @click = "closeModal">
        <img :src = "closeIcon" />
      </button>
      <label><i>{{ previewInfo.fileName }}</i></label>
    </div>

    <div
      v-if = "previewFileType === 'epub'"
      class = "preview-content">
      <EpubViewer :url = "`/vueapi/file?id=${previewInfo.fileId}`" :filename = "previewInfo.fileName" />
    </div>

    <div
      v-else-if = "previewFileType === 'image'"
      class = "preview-content">
      <ImgViewer :url = "`/vueapi/file?id=${previewInfo.fileId}`" />
    </div>

    <div
      v-else-if = "previewFileType === 'pdf'"
      class = "preview-content">
      <PdfViewer :url = "`/vueapi/file?id=${previewInfo.fileId}`" />
    </div>

    <div 
      v-else-if = "previewFileType === 'txt'"
      class = "preview-content">
      <TxtViewer :url = "`/vueapi/file?id=${previewInfo.fileId}`" />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import { useFilesStore } from '/src/stores/use-files-store.js';
  import EpubViewer from './Preview Tools/epub-viewer.vue';
  import ImgViewer from './Preview Tools/img-viewer.vue';
  import PdfViewer from './Preview Tools/pdf-viewer.vue';
  import TxtViewer from './Preview Tools/txt-viewer.vue';
   import closeIcon from '/src/assets/icons/close_black_24dp.svg';

	export default {
    components: {
      EpubViewer,
      ImgViewer,
      PdfViewer,
      TxtViewer,
    },
    data(){
      return {
        closeIcon: closeIcon
      }
    },
    unmounted(){
      this.resetPreviewInfo();
    },
    computed: {
      ...mapState(useFilesStore, ['previewInfo', 'previewFileType']),
    },
    methods: {
      ...mapActions(useComponentDisplayStore, ['closeModal']),
      ...mapActions(useFilesStore, ['resetPreviewInfo']),
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>