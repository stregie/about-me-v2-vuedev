import { defineStore } from 'pinia';
import { useFilesStore } from './use-files-store.js';
import { useFilesAndFoldersStore } from './use-files-and-folders-store.js';
import { pathToString, readNode, updateNode, createFolderTree } from '../utils/foldertree.js';


export const useFoldersStore = defineStore('folders', {
  state: () => ({
    folderTree: null, // OK
    loading: false,
    error: null
  }),
  getters: {
    subFoldersInActiveFolder: (state) => {  // OK
      if (!state.folderTree) {
        return null;
      };
      const activeFolder = useFilesAndFoldersStore().activeFolder;
      
      let subFolders = [];
      if(activeFolder.length === 0){
        subFolders = state.folderTree.map(folder => {
          return folder.name;
        })
      } else {
        const node = readNode(state.folderTree, activeFolder);
        subFolders = node.children.map(folder => {
          return folder.name;
        });
      }

      return subFolders;
    },
  },
  actions: {
    createTree(){ // OK
      const fileListAll = useFilesStore().fileListAll;
      this.folderTree = createFolderTree(fileListAll);
    },
    toggleExpanded(pathArray){
      let node = readNode(this.folderTree, pathArray);
      let value = !node.expanded;
      updateNode(this.folderTree, pathArray, 'expanded', value);
    }
  }
});