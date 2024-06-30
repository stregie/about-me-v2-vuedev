<template>
  <div id = "command-bar">
    <div id = "command-bar-buttons">
      <button type = "button" @click = "toggleSidebarVisibility" id = "sidebar-toggler-command-bar">
        <img :src = "'/src/assets/icons/menu_black_24dp.svg'" />
        Sidebar
      </button>
      <button type = "button" @click = "selectCommandBarMenu('newfolder-bar')">
        <img :src = "'/src/assets/icons/create_new_folder_black_24dp.svg'" />
        New Folder
      </button>
      <button type = "button" @click = "selectCommandBarMenu('upload-bar')">
        <img :src = "'/src/assets/icons/file_upload_black_24dp.svg'" />
        Upload
      </button>
      <button type = "button" @click = "selectCommandBarMenu('filter-bar')">
        <img :src = "'/src/assets/icons/filter_alt_black_24dp.svg'" />
        Filter
      </button>
      <button type = "button" @click = "selectCommandBarMenu('sort-bar')">
        <img :src = "'/src/assets/icons/sort_by_alpha_black_24dp.svg'" />
        Sort by
      </button>
      <button type = "button" @click = "changeFileListView('ListView')">
        <img :src = "'/src/assets/icons/view_list_black_24dp.svg'" />
        List View
      </button>
      <button type = "button" @click = "changeFileListView('DetailedView')" disabled>
        <img :src = "'/src/assets/icons/grid_view_black_24dp.svg'" />
        Detailed View
      </button>
    </div>
    <div id = "commandbar-menu" :class = "{ hidden: isCommandbarMenuHidden }">
      <KeepAlive>
        <component :is = "activeCommandbarMenu"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
  
  import CommandbarNewFolder from './commandbar-new-folder.vue';
  import CommandbarFilter from './commandbar-filter.vue';
  import CommandbarSort from './commandbar-sort.vue';
  import CommandbarUpload from './commandbar-upload.vue';


	export default {
    components: {
      'newfolder-bar': CommandbarNewFolder,
      'filter-bar': CommandbarFilter,
      'sort-bar': CommandbarSort,
      'upload-bar': CommandbarUpload,
    },
		data() {
			return {
        activeCommandbarMenu: "upload-bar",
        isCommandbarMenuHidden: true
			}
		},
    methods: {
      ...mapActions(useComponentDisplayStore, ['changeFileListView', 'toggleSidebarVisibility']),
      selectCommandBarMenu(menuType) {
        if (menuType === this.activeCommandbarMenu) {
          this.isCommandbarMenuHidden = !this.isCommandbarMenuHidden;
        } else {
          this.isCommandbarMenuHidden = false;
          this.activeCommandbarMenu = menuType;
        }
      }
    }
  };
</script>

<style lang = "scss" scoped>
  @import "../assets/css/commandbar.scss";

  #commandbar-menu {
    max-height: 160px;
    max-width: 800px;
    transition: max-height 0.2s linear, height 0.2s linear;
    overflow: hidden;
  }

  #commandbar-menu.hidden {
    max-height: 0px;
  }


  @media (min-width: 769px) {
  
  }


  @media (max-width: 768px) {
  
  }
</style>