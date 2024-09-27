<template>
  <div id = "DetailedView">
    <h2>DetailedView</h2>
    <p>Under construction</p>
  </div>
</template>

<script>
	import { defineComponent } from 'vue';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import { useFilesStore } from '/src/stores/use-files-store.js';
  import { useFoldersStore } from '/src/stores/use-folders-store.js';
  import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';

  import { mapState } from 'pinia';

	export default {
    computed: {
      ...mapState(useFoldersStore, ['subFoldersInActiveFolder']),
      ...mapState(useFilesAndFoldersStore, ['foldersToDisplay', 'trashActive']),
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/filelist-listview.scss";
</style>