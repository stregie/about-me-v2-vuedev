<template>
  <div
    class = "preview-tool img-viewer"
    :class = "[zoomIn ? 'img-viewer-zoom-in' : 'img-viewer-zoom-out']"
    @click = "zoomIn = !zoomIn">
    <img :src = "url" />
  </div>
</template>

<script>
	export default {
    props: ['url'],
    data() {
      return {
        zoomIn: false
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>