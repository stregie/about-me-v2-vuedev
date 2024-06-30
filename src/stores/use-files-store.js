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
    async downloadFile(fileid){
      console.log("downloadFile", fileid);
      window.location.href = `/vueapi/file?id=${fileid}`;
    },
    async moveFileToTrash(fileid){
      try {
        const response = await fetch(`/vueapi/move-to-trash?id=${fileid}`, {
          method: "POST"
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
      } catch (error) {
        console.error(error.message);
      }
    },
    async restoreFileFromTrash(fileid){
      try {
        const response = await fetch(`/vueapi/restore-from-trash?id=${fileid}`, {
          method: "POST"
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.fetchFileListAll();
      }
    },
    async deleteFilePermanently(fileid){
      try {
        const response = await fetch(`/vueapi/file?id=${fileid}`, {
          method: "DELETE"
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.fetchFileListAll();
      }
    }
  }
});