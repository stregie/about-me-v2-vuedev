import { defineStore } from 'pinia';
import { useFoldersStore } from './use-folders-store.js';
import { useFilesAndFoldersStore } from './use-files-and-folders-store.js';
import { pathToString, readNode, updateNode, createFolderTree } from '../utils/foldertree.js';


export const useFilesStore = defineStore('files', {
  state: () => ({
    fileListAll: null, // OK
    loading: false,
    error: null
  }),
  getters: {
    fileListAvailable: (state) => { // OK (state.fileListAll-lal működik, this.fileListAll-lal nem.)
      if(!state.fileListAll) {
        return null;
      } else {
        return state.fileListAll.filter(file => file.status === "available");
      }
    },
    fileListInActiveFolder: (state) => { // OK
      if(!state.fileListAvailable){
        return null;
      } else {
        return state.fileListAvailable.filter(file => file.path === pathToString(useFilesAndFoldersStore().activeFolder));
      }
    },
    fileListTrash: (state) => { // OK
      if (!state.fileListAll) {
        return null;
      } else {
        return state.fileListAll.filter(file => file.status === "trash");
      }
    },
  },
  actions: {
    async fetchFileListAll(){ // OK
      this.loading = true;
      try {
        const fileListResponse = await fetch(`/vueapi/filelist/`);
        this.fileListAll = await fileListResponse.json();
      } catch (error) {
        console.log(error);
        this.error = "Error";
      } finally {
        this.loading = false;
        const folderTree = useFoldersStore().folderTree;
        if (!folderTree) {
          useFoldersStore().createTree();
        }
      }
    },
    async moveFileToTrash(fileid){
      console.log(fileid, "moved to Trash");
    },
    async deleteFilePermanently(fileid){
      console.log(fileid, "deleted permanently");
    }
  }
});