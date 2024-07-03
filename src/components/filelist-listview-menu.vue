<template>
  <div class = "filelist-menu">
    <button 
      type = "button"
      class = "dropdown-toggler"
      @focus = "openDropdown"
      @blur = "closeDropdown">
      <img :src = "moreIcon"/>
    </button>
    
    <div
      class = "filelist-menu-dropdown menu-dropdown"
      v-show = "dropdownDisplay">
      <ul>
        <template v-if = "entryType === 'folder'">
          <!-- <li>Folder</li> -->
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "renameFolder" disabled>
              <img :src = "renameIcon"/>
              <label>Rename</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "moveFolder" disabled>
              <img :src = "moveIcon"/>
              <label>Move</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "deleteFolderToTrash">
              <img :src = "deleteIcon"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>

        <template v-if = "entryType === 'file' && fileMetaData.status === 'available'">
          <!-- <li>File available</li> -->
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "downloadFile(fileMetaData.fileid)">
              <img :src = "downloadIcon"/>
              <label>Download</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "renameFile" disabled>
              <img :src = "renameIcon"/>
              <label>Rename</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "moveFile" disabled>
              <img :src = "moveIcon"/>
              <label>Move</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "moveFileToTrash(fileMetaData.fileid)">
              <img :src = "deleteIcon"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>

        <template v-if = "entryType === 'file' && fileMetaData.status === 'trash'">
          <!-- <li>File trash</li>  -->
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "restoreFileFromTrash(fileMetaData.fileid)">
              <img :src = "restoreIcon"/>
              <label>Restore</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "deleteFilePermanently(fileMetaData.fileid)">
              <img :src = "permanentDeleteIcon"/>
              <label>Delete permanently</label>
            </button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import { useFilesStore } from '../stores/use-files-store.js';
  import { mapState, mapActions } from 'pinia';

  import moreIcon from '/src/assets/icons/more_vert_black_24dp.svg';
  import renameIcon from '/src/assets/icons/drive_file_rename_outline_black_24dp.svg';
  import moveIcon from '/src/assets/icons/drive_file_move_black_24dp.svg';
  import deleteIcon from '/src/assets/icons/delete_black_24dp.svg';
  import downloadIcon from '/src/assets/icons/file_download_black_24dp.svg';
  import restoreIcon from '/src/assets/icons/restore_page_black_24dp.svg';
  import permanentDeleteIcon from '/src/assets/icons/delete_forever_black_24dp.svg';


	export default {
    props: ['entryType', 'folderName', 'fileMetaData', 'path'],
		data() {
			return {
        dropdownDisplay: false,
        moreIcon: moreIcon, 
        renameIcon: renameIcon,
        moveIcon: moveIcon,
        deleteIcon: deleteIcon,
        downloadIcon: downloadIcon,
        permanentDeleteIcon: permanentDeleteIcon,
        restoreIcon: restoreIcon,
			}
		},
    methods: {
      ...mapActions(useFilesStore, ['downloadFile', 'moveFileToTrash', 'restoreFileFromTrash', 'deleteFilePermanently']),
      openDropdown(){
        this.dropdownDisplay = true;
      },
      closeDropdown(){
        setTimeout(()=> {
          this.dropdownDisplay = false;
        }, 300);
      },
      renameFolder(){
        // if folderName is not null etc etc
        console.log("rename folder", this.folderName);
      },
      moveFolder(){
        console.log("move folder", this.folderName);
      },
      deleteFolderToTrash(){
        console.log("delete folder to trash", this.folderName);
      },
      renameFile(){
        console.log("Rename file", this.fileMetaData.filename);
      },
      moveFile(){
        console.log("Move file", this.fileMetaData.filename);
      },
    }
  }
</script>

<style scoped>
  @import "../assets/css/main.scss";

  .hidden {
    background: red;
  }
  .dropdown-menu-item {
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
</style>