<template>
  <div 
    id = "modal-preview"
    class = "modal-child modal-flexible">

    <div
      class = "modal-preview-title">
      <h3>Preview</h3><br>
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
  import { useFilesStore } from '/src/stores/use-files-store.js';
  import EpubViewer from './Preview Tools/epub-viewer.vue';
  import ImgViewer from './Preview Tools/img-viewer.vue';
  import PdfViewer from './Preview Tools/pdf-viewer.vue';
  import TxtViewer from './Preview Tools/txt-viewer.vue';

	export default {
    components: {
      EpubViewer,
      ImgViewer,
      PdfViewer,
      TxtViewer,
    },
    unmounted(){
      this.resetPreviewInfo();
    },
    computed: {
      ...mapState(useFilesStore, ['previewInfo', 'previewFileType']),
    },
    methods: {
      ...mapActions(useFilesStore, ['resetPreviewInfo']),
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>