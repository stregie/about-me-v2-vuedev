<template>
  <div class = "filelist-menu">
    <button 
      type = "button"
      class = "dropdown-toggler"
      @focus = "openDropdown"
      @blur = "closeDropdown">
      <img :src = "'/src/assets/icons/more_vert_black_24dp.svg'"/>
    </button>
    
    <div
      class = "filelist-menu-dropdown menu-dropdown"
      v-show = "dropdownDisplay">
      <!-- <button @click = "testServer">test</button> -->
      <ul>
        <template v-if = "entryType === 'folder'">
          <!-- <li>Folder</li> -->
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "console.log('rf')">
              <img :src = "'/src/assets/icons/drive_file_rename_outline_black_24dp.svg'"/>
              <label>Rename</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "moveFolder">
              <img :src = "'/src/assets/icons/drive_file_move_black_24dp.svg'"/>
              <label>Move</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "deleteFolderToTrash">
              <img :src = "'/src/assets/icons/delete_black_24dp.svg'"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>

        <template v-if = "entryType === 'file' && fileMetaData.status === 'available'">
          <!-- <li>File available</li> -->
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "downloadFile">
              <img :src = "'/src/assets/icons/file_download_black_24dp.svg'"/>
              <label>Download</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "renameFile">
              <img :src = "'/src/assets/icons/drive_file_rename_outline_black_24dp.svg'"/>
              <label>Rename</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "moveFile">
              <img :src = "'/src/assets/icons/drive_file_move_black_24dp.svg'"/>
              <label>Move</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "deleteFileToTrash">
              <img :src = "'/src/assets/icons/delete_black_24dp.svg'"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>

        <template v-if = "entryType === 'file' && fileMetaData.status === 'trash'">
          <!-- <li>File trash</li>  -->
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "restoreFile">
              <img :src = "'/src/assets/icons/delete_black_24dp.svg'"/>
              <label>Restore</label>
            </button>
          </li>
          <li>
            <button type = "button" class = "dropdown-menu-item" @click = "deleteFilePermanently">
              <img :src = "'/src/assets/icons/delete_forever_black_24dp.svg'"/>
              <label>Delete to Trash</label>
            </button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  // import { useFoldersStore, useFilesStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  

	export default {
    props: ['entryType', 'folderName', 'fileMetaData', 'path'],
		data() {
			return {
        dropdownDisplay: false,
        ex01data: "",

        // 'dropdownDisplay': 'hidden'
			}
		},
    computed: {
      // ...mapState(useFoldersStore, ['activeFolder']),
    },
    methods: {
      // ...mapActions(useFilesStore, ['moveFileToTrash']),
      openDropdown(){
        this.dropdownDisplay = true;
      },
      closeDropdown(){
        setTimeout(()=> {
          this.dropdownDisplay = false;
        }, 300);
      },
      async testServer(){
        const response = await fetch('/vueapi/fetchtest/');
        this.ex01data = await response.text();
        console.log(this.ex01data);
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
      downloadFile(){
        console.log("Download file", this.fileMetaData.filename);
        // window.location.href = '/vueapi/file?id=c5eb0903-ce68-4e97-8d67-4123cce0b0e8';
      },
      renameFile(){
        console.log("Rename file", this.fileMetaData.filename);
      },
      moveFile(){
        console.log("Move file", this.fileMetaData.filename);
      },
      async deleteFileToTrash(){
        console.log("Move file", this.fileMetaData.filename);
        // this.moveFileToTrash(this.fileid);
      },
      restoreFromTrash(){
        console.log("RestoreFromTrash", this.fileMetaData.filename);
      },
      deleteFilePermanently(){
        console.log("deleteFilePermanently", this.fileMetaData.filename);
      }
    }
  }
</script>

<style scoped>
  .hidden {
    background: red;
  }
</style>