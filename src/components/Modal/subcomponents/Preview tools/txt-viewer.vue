<template>
  <div class = "preview-tool txt-viewer">
    <pre>{{ txtContent }}</pre>
  </div>
</template>

<script>
	export default {
    props: ['url'],
		data() {
			return {
        txtContent: "Loading...",
			}
		},
    mounted(){
      this.fetchText(this.url);
    },
    methods: {
      async fetchText(url){
        try {
          const response = await fetch(url);
          this.txtContent = await response.text();
        } catch (error) {
          this.txtContent = "An error has occured while preparing the file for preview.";
          console.log(error);
        }
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>