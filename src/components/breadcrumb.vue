<template>
  <div id = "breadcrumb">
    <ol v-if = "!trashActive" class = "breadcrumb mb-1">
      <li class = "breadcrumb-item">
        <label @click = "jumpToFolder(0)">Root</label>
      </li>
      <li class = "breadcrumb-item" v-for = "(folder, index) in activeFolder">
        <label @click = "jumpToFolder(index + 1)">{{ folder }}</label>
      </li>
    </ol>
    <ol v-else class = "breadcrumb mb-1">
      <li class = "breadcrumb-item">
        <label>Trash</label>
      </li>
    </ol>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';

	export default {
    computed: {
      ...mapState(useFilesAndFoldersStore, ['activeFolder', 'trashActive']),
    },
    methods: {
      ...mapActions(useFilesAndFoldersStore, ['changeActiveFolder']),
      jumpToFolder(index){
        const newActiveFolder = this.activeFolder.slice(0, index);
        this.changeActiveFolder(newActiveFolder);
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

  #breadcrumb {
    margin-bottom: 20px;
    ol {
      li {
        color: $font-dark;
        font-size: 0.8rem;      
      }

      li:last-child{
        color: Maroon;
        font-weight: bold;
      }
    }

    label:hover{
      text-decoration: underline;
      cursor: pointer;
    }

    .breadcrumb-item:before {
      font-weight: bold;
    }
  }
</style>