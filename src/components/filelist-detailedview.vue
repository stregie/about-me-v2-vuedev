<template>
  <div id = "DetailedView">
    <h2>DetailedView</h2>
    <pre>{{ subFoldersInActiveFolder }}</pre>
    <pre>{{ filesInActiveFolder }}</pre>
  </div>
</template>

<script>
	import { defineComponent } from 'vue';
  import { useFilesStore, useFoldersStore } from '../stores/stores.js';
  import { mapState } from 'pinia';

	export default defineComponent({
    computed: {
      ...mapState(useFilesStore, ['fileMetaDataList']),
      ...mapState(useFoldersStore, ['subFoldersInActiveFolder', 'filesInActiveFolder']),
    },
  })
</script>

<style scoped>

</style>