<template>
  <div id = "sidebar" :class = "{hidden: !sidebarVisible}">
    <button id = "sidebar-toggler" type = "button" @click = "toggleSidebarVisibility">
      <img :src = "'/src/assets/icons/keyboard_double_arrow_left_black_24dp.svg'" />
    </button>
    <div id = "sidebar-menu">
      <div class = "sidebar-list">
        <ul>
          <li>
            <div class = "sidebar-list-item" @click = "home">
              <button 
                class = "sidebar-list-icon"
                type = "button"
              ><img :src = "homeIcon" />
            </button>

              <div class = "sidebar-list-text">Home</div> 
            </div>
          </li>
          <li>
            <div class = "sidebar-list-item" @click = "openSearch">
              <button 
                class = "sidebar-list-icon"
                type = "button"
              ><img :src = "searchIcon" /></button>

              <div class = "sidebar-list-text">Search</div> 
            </div>
          </li>

          <li>
            <div class = "sidebar-list-item" @click = "openTrash">
              <button 
                class = "sidebar-list-icon"
                type = "button"
              ><img :src = "trashIcon" /></button>
    
              <div class = "sidebar-list-text">Trash</div> 
            </div>
          </li>
        </ul>
      </div>

      <div id = "sidebar-folders" class = "sidebar-list">
        <Node :tree = "folderTree" :parentPath = "[]" />
        <ul>
          <li v-for = "n in 30" :key = "n">Dummy {{ n }}</li>
        </ul>
      </div>
    </div>


    <div id = "sidebar-storage">
      <label>Storage: {{ usedSpace }} MB / 250 MB</label>
      <progress :value = "usedSpace" max = "250"></progress>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
  import { useFoldersStore } from '../stores/use-folders-store.js';
  import { useFilesAndFoldersStore } from '../stores/use-files-and-folders-store.js';
  import Node from './sidebar-node.vue';

  import homeIcon from '/src/assets/icons/home_black_24dp.svg';
  import searchIcon from '/src/assets/icons/search_black_24dp.svg';
  import trashIcon from '/src/assets/icons/folder_delete_black_24dp.svg';

	export default {
    components: {
      'Node': Node,
    },
    data(){
      return {
        homeIcon: homeIcon,
        searchIcon: searchIcon,
        trashIcon: trashIcon
      }
    },
    computed: {
    ...mapState(useComponentDisplayStore, ['sidebarVisible']),
    ...mapState(useFoldersStore, ['activeFolder', 'folderTree', 'loading']),
    ...mapState(useFilesAndFoldersStore, ['usedSpace'])
    },
    methods: {
      ...mapActions(useComponentDisplayStore, ['changeActiveModal', 'toggleModalVisibility', 'toggleSidebarVisibility']),
      ...mapActions(useFilesAndFoldersStore, ['changeActiveFolder', 'openTrash', 'closeTrash']),
      home(){
        this.changeActiveFolder([]);
        this.closeTrash();
      },
      openSearch(){
        this.toggleModalVisibility();
        this.changeActiveModal("ModalSearch");
      },
    }
  }
</script>

<style lang = "scss">
  @import "../assets/css/sidebar.scss";
</style>