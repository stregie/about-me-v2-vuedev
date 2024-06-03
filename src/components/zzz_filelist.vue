<template>
  <div id = "file-list">
    <!-- <pre>{{ fileListView }}</pre>
    <pre>{{ subFoldersInActiveFolder }}</pre>
    <pre>{{ filesInActiveFolder }}</pre> -->
    <!-- <pre>{{ fileMetaDataList }}</pre> -->
    <component :is = "fileListView"></component>
    
  </div>
</template>

<script>
  import { useFilesStore, useFoldersStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  import ListView from './filelist-listview.vue';
  import DetailedView from './filelist-detailedview.vue';

  
	export default {
    components: {
      'ListView': ListView,
      'DetailedView': DetailedView
    },
    props: ['fileListView'],
    data() {
      return {
        
      }
    },
    computed: {
    ...mapState(useFilesStore, ['fileMetaDataList']),
    ...mapState(useFoldersStore, ['activeFolder', 'folderTree', 'subFoldersInActiveFolder', 'filesInActiveFolder']),
    // foldersInActiveFolder(){
    //   return sub
    //   // readNode(activeFolder)
    //   // array: children.name;

    // },

    },
    methods: {
      ...mapActions(useFoldersStore, ['createTree']),
      startCreateTree(){
        this.createTree();
      }
    }
  };
</script>

<style scoped>

</style>