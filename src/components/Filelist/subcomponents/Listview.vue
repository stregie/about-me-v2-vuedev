<template>
  <div id = "list-view">    
    <div id = "list-view-table">
      <template v-if = "isFolderEmpty">
        <div
          class = "grid-item grid-folder folder-action"
          :style = "{'order': columnOrder.action + 5}">
        </div>
        <div
          class = "grid-item grid-folder folder-name empty-folder"
          :style = "{'order': columnOrder.name + 5}">
          Empty folder
        </div>
        <div
          class = "grid-item grid-folder folder-ext"
          :style = "{'order': columnOrder.ext + 5}">
        </div>
        <div
          class = "grid-item grid-folder folder-size"
          :style = "{'order': columnOrder.size + 5}"
          @click = "changeFolder(folder)">
        </div>
        <div
          class = "grid-item grid-folder folder-date"
          :style = "{'order': columnOrder.date + 5}">
        </div>
      </template>

      <template v-for = "(folder, index) in foldersToDisplay">
        <div
          class = "grid-item grid-folder folder-action"
          :style = "{'order': 5 * index + columnOrder.action + 5}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          <Listview-Menu 
            :entryType = "'folder'"
            :folderName = "folder"
            :path = "activeFolder" />
        </div>
        <div
          class = "grid-item grid-folder folder-name"
          :style = "{'order': 5 * index + columnOrder.name + 5}"
          @click = "changeFolder(folder)"
          @mouseover = "highlightRow"
          @mouseleave = "removeHighlight">
          {{ folder }}
        </div>
        <div
          class = "grid-item grid-folder folder-ext"
          :style = "{'order': 5 * index + columnOrder.ext + 5}"
          @click = "changeFolder(folder)"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
        </div>
        <div
          class = "grid-item grid-folder folder-size"
          :style = "{'order': 5 * index + columnOrder.size + 5}"
          @click = "changeFolder(folder)"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
        </div>
        <div
          class = "grid-item grid-folder folder-date"
          :style = "{'order': 5 * index + columnOrder.date + 5}"
          @click = "changeFolder(folder)"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
        </div>
      </template>

      <template v-for = "(file, index) in filesToDisplay">
        <div
          class = "grid-item grid-file file-action"
          :style = "{'order': 5 * index + columnOrder.action + 3000}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          <Listview-Menu
            :entryType = "'file'"
            :fileMetaData = "file" />
        </div>
        <div 
          class = "grid-item grid-file file-name"
          :style = "{'order': 5 * index + columnOrder.name + 3000}"
          @mouseover = "highlightRow"
          @mouseleave = "removeHighlight"
          @click = "primaryAction(file.fileid, file.filename, file.extension)">
          {{ file.filename }}
        </div>
        <div
          class = "grid-item grid-file file-ext"
          :style = "{'order': 5 * index + columnOrder.ext + 3000}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          {{ file.extension }}
        </div>
        <div
          class = "grid-item grid-file file-size"
          :style = "{'order': 5 * index + columnOrder.size + 3000}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          {{ formatSize(file.size) }}
        </div>
        <div
          class = "grid-item grid-file file-date"
          :style = "{'order': 5 * index + columnOrder.date + 3000}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          {{ formatDate(file.uploaddate) }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import { useFilesStore } from '/src/stores/use-files-store.js';
  import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';
  import { formatSize, formatDate, highlightRow, removeHighlight } from '/src/utils/utils.js';
  import FilelistMenu from './Listview-menu.vue';

	export default {
    components: {
      'Listview-Menu': FilelistMenu,
    },
    computed: {
      ...mapState(useComponentDisplayStore, ['mobileView']),
      ...mapState(useFilesStore, ['previewSupportedExtensions']),
      ...mapState(useFilesAndFoldersStore, ['activeFolder', 'foldersToDisplay', 'filesToDisplay']),
      isFolderEmpty(){    
        if (!this.foldersToDisplay || !this.filesToDisplay) { 
          return true;
        } else {
          if (this.foldersToDisplay.length === 0 && this.filesToDisplay.length === 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      columnOrder() {
        if(this.mobileView) {
          return {
            action: 1,
            name: 2,
            ext: 5,
            size: 4,
            date: 3 
          }
        } else {
          return {
            action: 1,
            name: 2,
            ext: 3,
            size: 4,
            date: 5 
          }
        }
      }
    },
    methods: {
      ...mapActions(useFilesStore, ['downloadFile', 'previewFile']),
      changeFolder(folder){
        this.activeFolder.push(folder);
      },
      primaryAction(fileid, filename, extension){
        if(this.previewSupportedExtensions.includes(extension.toLowerCase())){
          this.previewFile(fileid, filename, extension);
        } else {
          this.downloadFile(fileid);
        }
      },
      formatSize(bytes){
        return formatSize(bytes);
      },
      formatDate(date){
        return formatDate(date);
      },
      highlightRow(event){
        highlightRow(event.target);
      },
      removeHighlight(event){
        removeHighlight(event.target);
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/filelist-listview.scss";
</style>