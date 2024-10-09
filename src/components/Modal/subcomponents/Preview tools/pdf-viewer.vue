<template>
  <div class = "preview-tool pdf-viewer">
    <vue-pdf-embed :width = "pdfEmbedWidth" :source = "url" />
  </div>
</template>

<script>
  import { mapState } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import VuePdfEmbed from 'vue-pdf-embed';

	export default {
    props: ['url'],
    components: {
      VuePdfEmbed,
    },
    computed: {
       ...mapState(useComponentDisplayStore, ['mobileView']),
      pdfEmbedWidth(){
        if(this.mobileView) {
          return 250;
        } else {
          return 650;
        }
      },
      pdfViewerWidth(){
        return this.pdfEmbedWidth + 50 + "px";
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
  
  .pdf-viewer{
    width: v-bind(pdfViewerWidth);
  }
</style>