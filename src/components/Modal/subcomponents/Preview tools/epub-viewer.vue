<template>
  <div class = "preview-tool epub-viewer">
    <div class = "epub-display">
      <div 
        id = "epub-render-area"
        class = "epub-render-area"
        ref = "epubArea">    
      </div>
    </div>

    <div class = "epub-nav-bar">
      <button 
        type = "button"
        id = "epub-nav-prev"
        class = "epub-nav-btn"
        @click = "rendition.prev()">
        <img :src = "nextIcon">
      </button>
      <button
        type = "button"
        id = "epub-nav-next"
        class = "epub-nav-btn"
        @click = "rendition.next()">
        <img :src = "nextIcon">
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import ePub from 'epubjs';
  import nextIcon from '/src/assets/icons/navigate_next_black_24dp.svg';

	export default {
    props: ['url', 'filename'],
    data() {
      return {
        nextIcon: nextIcon,
        book: null,
        rendition: null
      }
    },
    mounted() {
      this.loadEpub();
    },
    beforeUnmount(){
      if(this.rendition) {
        this.rendition.destroy();
      }
    },
    computed: {
       ...mapState(useComponentDisplayStore, ['mobileView']),
      epubUrl(){
        return this.url + `&filename=${this.filename}`;
      },
      epubAreaWidth(){
        if (this.mobileView) {
          return 250;
        } else {
          return 650;
        }
      },
      epubViewerWidth(){
        return this.epubAreaWidth + 50 + "px";
      }
    },
    methods: {
      loadEpub(){
        this.book = ePub(this.epubUrl);
        this.rendition = this.book.renderTo(this.$refs.epubArea, {
          method: "continuous",
          flow: "scrolled-doc",
          width: this.epubAreaWidth,
        });
        this.rendition.display();
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";

  .epub-display {
    width: v-bind(epubViewerWidth);
  }
</style>