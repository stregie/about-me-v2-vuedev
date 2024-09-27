<template>
  <div id = "file-list">
    <component :is = "fileListView"></component>
  </div>
</template>

<script>
  import { mapState } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import ListView from './subcomponents/Listview.vue';
  import DetailedView from './subcomponents/Detailedview.vue';

	export default {
    components: {
      'ListView': ListView,
      'DetailedView': DetailedView,
    },
    computed: {
      ...mapState(useComponentDisplayStore, ['fileListView']),
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/filelist-listview.scss";
</style>