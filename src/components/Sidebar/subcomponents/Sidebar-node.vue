<template>
  <ul>
    <li 
      v-for = "(folder) in tree"
      :key = "folder.name">
      <div class = "sidebar-list-item" :style = "{ paddingLeft: depth * 15 + 'px' }" @click = "changeActiveFolderState(folder.name)">
        <button 
          class = "sidebar-list-icon"
          :class = "{rotated: folder.expanded, 'non-visible': folder.children.length <= 0 }"
          type = "button"
          @click = "toggleExpandedState(folder.name)">
          <img :src = "expandIcon" />
        </button>
        <div class = "sidebar-list-text">{{ folder.name }}</div>
      </div>

      <Node 
        v-if = "folder.children.length > 0"
        :class = "{ 'node-hide': !folder.expanded }"
        :tree = "folder.children"
        :parentPath = "parentsOfNode(folder.name)"/>
    </li>
  </ul>
</template>


<script>
  import { mapActions } from 'pinia';
  import { useFoldersStore } from '/src/stores/use-folders-store.js';
  import { useFilesAndFoldersStore } from '/src/stores/use-files-and-folders-store.js';
  import expandIcon from '/src/assets/icons/navigate_next_black_24dp.svg';
  
  export default {
    name: 'Node',
    props: ['tree', 'parentPath'],
    data() {
      return {
        expandIcon: expandIcon,
      }
    },
    computed: {
      depth(){
        return this.parentPath.length;
      }
    },
    methods: {
      ...mapActions(useFoldersStore, ['toggleExpanded']),
      ...mapActions(useFilesAndFoldersStore, ['changeActiveFolder']),
      parentsOfNode(folderName){
        let pathArray = [...this.parentPath];
        pathArray.push(folderName);
        return pathArray;
      },
      toggleExpandedState(folderName){
        event.stopPropagation();
        // console.log("parentPath", this.parentPath);
        let pathArray = JSON.parse(JSON.stringify(this.parentPath));
        pathArray.push(folderName);
        this.toggleExpanded(pathArray);
      },
      changeActiveFolderState(folderName) {
        let pathArray = JSON.parse(JSON.stringify(this.parentPath));
        pathArray.push(folderName);
        this.changeActiveFolder(pathArray);
      },
    }
  };
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/sidebar.scss";
</style>