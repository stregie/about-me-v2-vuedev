<template>
  <div id = "command-bar">
    <div>
      <button type = "button" @click = "toggleSidebar" id = "sidebar-toggler-command-bar">
        <img :src = "'/src/assets/icons/menu_black_24dp.svg'" />
        Sidebar
      </button>
      <button type = "button" @click = "selectCommandBarMenu('upload')">
        <img :src = "'/src/assets/icons/file_upload_black_24dp.svg'" />
        Upload
      </button>
      <button type = "button" @click = "selectCommandBarMenu('filter')">
        <img :src = "'/src/assets/icons/filter_alt_black_24dp.svg'" />
        Filter
      </button>
      <button type = "button" @click = "selectCommandBarMenu('sort')">
        <img :src = "'/src/assets/icons/sort_by_alpha_black_24dp.svg'" />
        Sort by
      </button>
      <button type = "button" @click = "changeFileListView('ListView')">
        <img :src = "'/src/assets/icons/view_list_black_24dp.svg'" />
        List View
      </button>
      <button type = "button" @click = "changeFileListView('DetailedView')">
        <img :src = "'/src/assets/icons/grid_view_black_24dp.svg'" />
        Detailed View
      </button>
      <div id = "commandbar-menu" :class = "{ hidden: isCommandbarMenuHidden }">
        <KeepAlive>
          <component :is = "activeCommandbarMenu"></component>
        </KeepAlive>
      </div>
    </div>

    <div>
      <!-- <p>actInpComp: {{ activeCommandbarMenu }}; SortBy: {{ sortBy.column }}; Ascending: {{ sortBy.ascending }}; FilterBy: {{ filterBy }}</p> -->
    </div>
  </div>
</template>

<script>
  import { useSidebarCompStore, useFoldersStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  import CommandbarFilter from './commandbar-filter.vue';
  import CommandbarSort from './commandbar-sort.vue';
  import CommandbarUpload from './commandbar-upload.vue';


	export default {
    components: {
      'filter': CommandbarFilter,
      'sort': CommandbarSort,
      'upload': CommandbarUpload,
    },
		data() {
			return {
        activeCommandbarMenu: "upload",
        isCommandbarMenuHidden: false
			}
		},
    computed: {
      ...mapState(useFoldersStore, ['filterBy', 'sortBy']),
    },
    methods: {
      ...mapActions(useSidebarCompStore, ['toggleSidebar']),
      ...mapActions(useFoldersStore, ['changeSortOrder']),
      changeFileListView(view){
        this.$emit('changeFileListView', view);
      },
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