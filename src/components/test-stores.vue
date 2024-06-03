<template>
	<div id = "test-stores">
		<h2>Testing Stores</h2>
		<p>Active Folder</p>
		<pre>{{ activeFolder }}</pre>
		<p>storevalue</p>
		<!-- <button @click = "">Button</button> -->
		<pre>{{ foldersToDisplay }}</pre>
	</div>
</template>

<script >
  import { mapState, mapActions } from 'pinia';
	import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
	import { useFilesStore } from '../stores/use-files-store.js';
	import { useFoldersStore } from '../stores/use-folders-store.js';
	import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';
 

	export default {
		components: {
     
    },
		data(){
			return {
				
			}
		},
		async created(){
			this.fetchFileListAll();
		},
		computed: {
			...mapState(useComponentDisplayStore, ['modalVisible', 'fileListView']),
			// ...mapState(useFilesStore, ['subFoldersInActiveFolder']),
			// ...mapState(useFoldersStore, ['folderTree']),
			...mapState(useFilesAndFoldersStore, ['activeFolder', 'foldersToDisplay']),
		},
		methods: {
			...mapActions(useFilesStore, ['fetchFileListAll']),
		}
  };
</script>

<style lang = "scss" scoped>
  #test-stores {
  	margin-left: 30px;
  	pre {
  		font-size: 0.7rem;
  	}
  }
</style>