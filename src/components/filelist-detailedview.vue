<template>
  <div id = "DetailedView">
    <h2>DetailedView</h2>
    <pre>Trash: {{ trashActive }}</pre>
    <pre>{{ subFoldersInActiveFolder }}</pre>
    <!-- <pre>{{ filesInActiveFolder }}</pre> -->
  </div>
</template>

<script>
	import { defineComponent } from 'vue';
  import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
  import { useFilesStore } from '../stores/use-files-store.js';
  import { useFoldersStore } from '../stores/use-folders-store.js';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';

  import { mapState } from 'pinia';

	export default defineComponent({
    computed: {
      ...mapState(useFoldersStore, ['subFoldersInActiveFolder']),
      ...mapState(useFilesAndFoldersStore, ['foldersToDisplay', 'trashActive']),
    },
  })
</script>