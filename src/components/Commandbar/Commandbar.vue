<template>
  <div id = "commandbar">
    <div id = "commandbar-buttons">
      <button
        type = "button"
        id = "sidebar-toggler-commandbar"
        class = "commandbar-button"
        @click = "toggleSidebarVisibility">
        <img :src = "menuIcon" />
        Sidebar
      </button>
      <button
        type = "button"
        class = "commandbar-button"
        @click = "selectCommandBarMenu('newfolder-bar')">
        <img :src = "newFolderIcon" />
        New Folder
      </button>
      <button
        type = "button"
        class = "commandbar-button"
        @click = "selectCommandBarMenu('upload-bar')">
        <img :src = "uploadIcon" />
        Upload
      </button>
      <button
        type = "button"
        class = "commandbar-button"
        @click = "selectCommandBarMenu('filter-bar')">
        <img :src = "filterIcon" />
        Filter
      </button>
      <button
        type = "button"
        class = "commandbar-button"
        @click = "selectCommandBarMenu('sort-bar')">
        <img :src = "sortIcon" />
        Sort by
      </button>
      <button
        v-if = "fileListView === 'DetailedView'"
        type = "button"
        class = "commandbar-button"
        @click = "changeFileListView('ListView')">
        <img :src = "listViewIcon" />
        List View
      </button>
      <button
        v-if = "fileListView === 'ListView'"
        type = "button"
        class = "commandbar-button"
        @click = "changeFileListView('DetailedView')"
        disabled>
        <img :src = "detailedViewIcon" />
        Detailed View
      </button>
    </div>
  </div>

  <div id = "commandbar-menu">
    <KeepAlive>
      <component :is = "activeCommandbarMenu"></component>
    </KeepAlive>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';

  import NewFolder from './subcomponents/New-folder.vue';
  import Filter from './subcomponents/Filter.vue';
  import Sort from './subcomponents/Sort.vue';
  import Upload from './subcomponents/Upload.vue';
  
  import menuIcon from '/src/assets/icons/menu_black_24dp.svg';
  import newFolderIcon from '/src/assets/icons/create_new_folder_black_24dp.svg';
  import uploadIcon from '/src/assets/icons/file_upload_black_24dp.svg';
  import filterIcon from '/src/assets/icons/filter_alt_black_24dp.svg';
  import sortIcon from '/src/assets/icons/sort_by_alpha_black_24dp.svg';
  import listViewIcon from '/src/assets/icons/view_list_black_24dp.svg';
  import detailedViewIcon from '/src/assets/icons/grid_view_black_24dp.svg';
  import '/src/assets/css/commandbar.scss';

	export default {
    components: {
      'newfolder-bar': NewFolder,
      'filter-bar': Filter,
      'sort-bar': Sort,
      'upload-bar': Upload,
    },
		data() {
			return {
        activeCommandbarMenu: "upload-bar",
        menuIcon: menuIcon,
        newFolderIcon: newFolderIcon,
        uploadIcon: uploadIcon,
        filterIcon: filterIcon,
        sortIcon: sortIcon,
        listViewIcon: listViewIcon,
        detailedViewIcon: detailedViewIcon
			}
		},
    computed: {
      ...mapState(useComponentDisplayStore, ['fileListView', 'commandbarMenuVisibility']),
    },
    methods: {
      ...mapActions(useComponentDisplayStore, ['changeFileListView', 'toggleSidebarVisibility', 'openCommandbarMenu', 'toggleCommandbarMenuVisibility']),
      selectCommandBarMenu(menuType) {
        if (menuType === this.activeCommandbarMenu) {
          // this.isCommandbarMenuHidden = !this.isCommandbarMenuHidden;
          this.toggleCommandbarMenuVisibility();
        } else {
          // this.isCommandbarMenuHidden = false;
          this.openCommandbarMenu();
          this.activeCommandbarMenu = menuType;
        }
      }
    }
  };
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/commandbar.scss";
  @import "/src/assets/css/sidebar.scss";
</style>