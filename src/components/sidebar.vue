<template>
  <div id = "sidebar" :class = "{hidden: sidebarHidden}">
    <button id = "sidebar-toggler" type = "button" @click = "toggleSidebar">
      <img :src = "'/src/assets/icons/keyboard_double_arrow_left_black_24dp.svg'" />
    </button>
    <div id = "sidebar-menu" class = "sidebar-list">
      <ul>
        <li>
          <div class = "sidebar-list-item">
            <button 
              class = "sidebar-list-icon"
              type = "button"
              @click = "openSearch"
            ><img :src = "'/src/assets/icons/search_black_24dp.svg'" /></button>

            <div class = "sidebar-list-text">Search</div> 
          </div>
        </li>

        <li>
          <div class = "sidebar-list-item">
            <button 
              class = "sidebar-list-icon"
              type = "button"
              @click = "openTrash"
            ><img :src = "'/src/assets/icons/folder_delete_black_24dp.svg'" /></button>
  
            <div class = "sidebar-list-text">Trash</div> 
          </div>
        </li>
      </ul>
    </div>

    <div id = "sidebar-folders" class = "sidebar-list">
      <Node :tree = "folderTree" :parentPath = "[]" />
      <!-- <ul>
        <li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li>
        <li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li><li>Dummy</li>
      </ul> -->
    </div>

    <div id = "sidebar-storage">
      <label>Storage: 438 MB / 5 GB</label>
      <progress value = "30" max = "100"></progress>
    </div>
  </div>
</template>

<script>
  import Node from './sidebar-node.vue';
  import { useFoldersStore, useSidebarCompStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';



	export default {
    components: {
      'Node': Node,
    },
		data() {
			return {
        
			}
		},
    computed: {
    ...mapState(useFoldersStore, ['activeFolder', 'folderTree', 'loading']),
    ...mapState(useSidebarCompStore, ['sidebarHidden']),
    },
    methods: {
      ...mapActions(useSidebarCompStore, ['toggleSidebar']),
      openSearch(){
        console.log("Open Search");
      },
      openTrash(){
        console.log("Open Trash");
      }
    }
  }
</script>