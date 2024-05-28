<template>
  <div class = "filelist-menu">
    <button type = "button" class = "dropdown-toggler" @focus = "openDropdown" @blur = "closeDropdown">
      <img :src = "'/src/assets/icons/more_vert_black_24dp.svg'"/>
    </button>
    
    <div class = "filelist-menu-dropdown menu-dropdown" v-show = "dropdownDisplay">
      <ul>
        <li v-show = "type === 'file'">
          <button type = "button" class = "dropdown-menu-item" @click = "downloadFile">
            <img :src = "'/src/assets/icons/file_download_black_24dp.svg'"/>
            <label>Download</label>
          </button>
        </li>
        <li>
          <button type = "button" class = "dropdown-menu-item" @click = "moveFile">
            <img :src = "'/src/assets/icons/drive_file_move_black_24dp.svg'"/>
            <label>Move</label>
          </button>
        </li>
        <li>
          <button type = "button" class = "dropdown-menu-item" @click = "deleteFile">
            <img :src = "'/src/assets/icons/delete_black_24dp.svg'"/>
            <label>Delete to Trash</label>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { useFoldersStore, useFilesStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  

	export default {
    props: ['type', 'fileid'],
		data() {
			return {
        'dropdownDisplay': false
        // 'dropdownDisplay': 'hidden'
			}
		},
    computed: {
      ...mapState(useFoldersStore, ['activeFolder']),
    },
    methods: {
      ...mapActions(useFoldersStore, ['changeActiveFolder']),
      ...mapActions(useFilesStore, ['moveFileToTrash']),
      jumpToFolder(index){
        const newActiveFolder = this.activeFolder.slice(0, index);
        this.changeActiveFolder(newActiveFolder);
      },
      openDropdown(){
        this.dropdownDisplay = true;
      },
      closeDropdown(){
        setTimeout(()=> {
          this.dropdownDisplay = false;
        }, 200);
      },
      downloadFile(){
        console.log("Download", this.fileid);
        // window.location.href = '/vueapi/file?id=c5eb0903-ce68-4e97-8d67-4123cce0b0e8';
      },
      moveFile(){
        console.log("Move", this.fileid);
      },
      async deleteFile(){
        this.moveFileToTrash(this.fileid);
      }
    }
  }
</script>