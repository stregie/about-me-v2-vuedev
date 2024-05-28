<template>
  <div id = "list-view">
    <!-- <p>WindowWidth: {{ windowWidth }} mobileView: {{ mobileView }} ColumnOrder a: {{ columnOrder.action }} n: {{ columnOrder.name }} e: {{ columnOrder.ext }} s: {{ columnOrder.size }} d: {{columnOrder.date }}</p> -->

    <div id = "list-view-table">
      <template v-for = "(folder, index) in subFoldersInActiveFolder">
        <div
          class = "grid-item grid-folder folder-action"
          :style = "{'order': 5 * index + columnOrder.action + 5}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          <Listview-Menu :type = "'folder'" :folder = "folder" />
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

      <template v-for = "(file, index) in filesInActiveFolder">
        <div
          class = "grid-item grid-file file-action"
          :style = "{'order': 5 * index + columnOrder.action + 3000}"
          @mouseenter = "highlightRow"
          @mouseleave = "removeHighlight">
          <Listview-Menu :type = "'file'" :fileid = "file.fileid" />
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
  import { useFilesStore, useFoldersStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
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
      ...mapState(useFilesStore, ['fileMetaDataList']),
      ...mapState(useFoldersStore, ['activeFolder', 'subFoldersInActiveFolder', 'filesInActiveFolder']),
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
      // ...mapActions(useFoldersStore, ['changeActiveFolder']),
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



     <!--  <template class = "grid-row folder-row" v-for = "folder in subFoldersInActiveFolder">
        <div class = "grid-item action-column">
          <Listview-Menu :type = "'folder'" :folder = "folder" />
        </div>
        <div class = "grid-item name-column">
          <button type = "button" @click = "changeFolder(folder)">{{ folder }}</button>
        </div>
        <div class = "grid-item ext-column"></div>
        <div class = "grid-item size-column"></div>
        <div class = "grid-item date-column"></div>
      </template>
  
      <template class = "grid-row file-row" v-for = "file in filesInActiveFolder" :key = "file.fileid">
        <div class = "grid-item action-column">
          <Listview-Menu :type = "'file'" :fileid = "file.fileid" />
        </div>
        <div class = "grid-item name-column">
          <button type = "button" @click = "console.log('download', file.fileid)">{{ file.filename }}</button>
        </div>
        <div class = "grid-item ext-column">{{ file.extension }}</div>
        <div class = "grid-item size-column">436 GB</div>
        <div class = "grid-item date-column">2024-02-17</div>
      </template> -->