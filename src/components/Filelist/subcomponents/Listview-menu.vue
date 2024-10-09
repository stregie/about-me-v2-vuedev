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
          <li>
            <button 
              type = "button"
              class = "dropdown-menu-item"
              @click = "renameFolder"
              disabled>
              <img :src = "renameIcon"/>
              <label>Rename</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "moveFolder"
              disabled>
              <img :src = "moveIcon"/>
              <label>Move</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "deleteFolderToTrash"
              disabled>
              <img :src = "deleteIcon"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>

        <template v-if = "entryType === 'file' && fileMetaData.status === 'available'">
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "previewFile(fileMetaData.fileid, fileMetaData.filename, fileMetaData.extension)"
              :disabled = "previewDisabled">
              <img :src = "previewIcon"/>
              <label>Preview</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "downloadFile(fileMetaData.fileid)">
              <img :src = "downloadIcon"/>
              <label>Download</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "openRenameFileModal(fileMetaData.fileid, fileMetaData.filename, fileMetaData.extension)">
              <img :src = "renameIcon"/>
              <label>Rename</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "moveFile"
              disabled>
              <img :src = "moveIcon"/>
              <label>Move</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "moveFileToTrash(fileMetaData.fileid, fileMetaData.filename)">
              <img :src = "deleteIcon"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>

        <template v-if = "entryType === 'file' && fileMetaData.status === 'trash'">
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "restoreFileFromTrash(fileMetaData.fileid, fileMetaData.filename, fileMetaData.path)">
              <img :src = "restoreIcon"/>
              <label>Restore</label>
            </button>
          </li>
          <li>
            <button
              type = "button"
              class = "dropdown-menu-item"
              @click = "deleteFilePermanently(fileMetaData.fileid, fileMetaData.filename)">
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
  import { useFilesStore } from '/src/stores/use-files-store.js';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import { mapState, mapActions } from 'pinia';

  import deleteIcon from '/src/assets/icons/delete_black_24dp.svg';
  import downloadIcon from '/src/assets/icons/file_download_black_24dp.svg';
  import moreIcon from '/src/assets/icons/more_vert_black_24dp.svg';
  import moveIcon from '/src/assets/icons/drive_file_move_black_24dp.svg';
  import permanentDeleteIcon from '/src/assets/icons/delete_forever_black_24dp.svg';
  import previewIcon from '/src/assets/icons/preview_black_24dp.svg';
  import renameIcon from '/src/assets/icons/drive_file_rename_outline_black_24dp.svg';
  import restoreIcon from '/src/assets/icons/restore_page_black_24dp.svg';
  

	export default {
    props: ['entryType', 'folderName', 'fileMetaData', 'path'],
		data() {
			return {
        dropdownDisplay: false,
        deleteIcon: deleteIcon,
        downloadIcon: downloadIcon,
        moreIcon: moreIcon, 
        moveIcon: moveIcon,
        permanentDeleteIcon: permanentDeleteIcon,
        previewIcon: previewIcon, 
        renameIcon: renameIcon,
        restoreIcon: restoreIcon,
			}
		},
    computed: {
      ...mapState(useFilesStore, ['previewSupportedExtensions']),
      previewDisabled(){
        if(this.previewSupportedExtensions.includes(this.fileMetaData.extension.toLowerCase())){
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      ...mapActions(useFilesStore, ['downloadFile', 'previewFile', 'moveFileToTrash', 'restoreFileFromTrash', 'deleteFilePermanently', 'openRenameFileModal']),
      ...mapActions(useComponentDisplayStore, ['openModal']),
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
      moveFile(){
        console.log("Move file", this.fileMetaData.filename);
      },
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/filelist-listview.scss";

  .hidden {
    background: red;
  }
  .dropdown-menu-item {
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
</style>