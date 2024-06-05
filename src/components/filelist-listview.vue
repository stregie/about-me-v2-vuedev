<template>
  <div id = "list-view">
    <!-- <p>WindowWidth: {{ windowWidth }} mobileView: {{ mobileView }} ColumnOrder a: {{ columnOrder.action }} n: {{ columnOrder.name }} e: {{ columnOrder.ext }} s: {{ columnOrder.size }} d: {{columnOrder.date }}</p> -->

    
    <div id = "list-view-table">
      <template v-if = "isFolderEmpty">
        <div
          class = "grid-item grid-folder folder-action"
          :style = "{'order': columnOrder.action + 5}">
        </div>
        <div
          class = "grid-item grid-folder folder-name empty-folder"
          :style = "{'order': columnOrder.name + 5}">
          This folder is empty. Empty folders are not permanent.
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
          @mouseleave = "removeHighlight">
          {{ file.filename}}
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
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';
  import { formatSize, formatDate, highlightRow, removeHighlight } from '../utils/utils.js';
  import FilelistMenu from './filelist-listview-menu.vue';
  import '../assets/css/filelist-listview.scss';

	export default {
    components: {
      'Listview-Menu': FilelistMenu,
    },
    data() {
      return {
        windowWidth: window.innerWidth,
        mobileView: false,
      }
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize(); // initiate check
    },
    unmounted() {
      window.removeEventListener('resize', this.handleResize);
    },
    computed: {
      ...mapState(useFilesAndFoldersStore, ['activeFolder', 'foldersToDisplay', 'filesToDisplay']),
      isFolderEmpty(){
        if (!this.foldersToDisplay || !this.filesToDisplay) { // null -> false. [] -> true
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
      handleResize(){
        this.windowWidth = window.innerWidth;
        console.log("resize");
        if (window.innerWidth < 768) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      },
      changeFolder(folder){
        this.activeFolder.push(folder);
      },
      downloadFile(id){
        console.log("Download", this.fileid);
        window.location.href = '/vueapi/file?id=c5eb0903-ce68-4e97-8d67-4123cce0b0e8';
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
  .empty-folder {
    text-align: center;
    font-weight: 400;
    font-style: italic;
  }
</style>