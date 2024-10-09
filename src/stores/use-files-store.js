import { defineStore } from 'pinia';
import { useComponentDisplayStore } from './use-component-display-store.js';
import { useFoldersStore } from './use-folders-store.js';
import { useFilesAndFoldersStore } from './use-files-and-folders-store.js';
import { pathToString, readNode, updateNode, createFolderTree } from '../utils/foldertree.js';
import { removeExtension } from '../utils/utils.js';


export const useFilesStore = defineStore('files', {
  state: () => ({
    fileListAll: null,
    renameFileTo: {
      fileId: "",
      newFileName: "",
      newExtension: ""
    },
    previewInfo: {
      fileId: "",
      fileName: "",
      extension: "",
    },
    previewSupportedExtensions: ['epub', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp', 'pdf', 'txt'],
    loading: false,
    error: null
  }),
  getters: {
    fileListAvailable: (state) => {
      if(!state.fileListAll){
        return null;
      } else {
        return state.fileListAll.filter(file => file.status === "available");
      }
    },
    fileListInActiveFolder: (state) => {
      if(!state.fileListAvailable){
        return null;
      } else {
        return state.fileListAvailable.filter(file => file.path === pathToString(useFilesAndFoldersStore().activeFolder));
      }
    },
    fileListTrash: (state) => {
      if (!state.fileListAll){
        return null;
      } else {
        return state.fileListAll.filter(file => file.status === "trash");
      }
    },
    previewFileType: (state) => {
      let supportedImageExtensions = ['bmp', 'gif', 'jpeg', 'jpg', 'png', 'webp'];
      if (state.previewInfo.extension.toLowerCase() === "txt"){
        return "txt";
      } else if (state.previewInfo.extension.toLowerCase() === "pdf" ){
        return "pdf";
      } else if (supportedImageExtensions.includes(state.previewInfo.extension.toLowerCase())){
        return "image";
      } else if (state.previewInfo.extension.toLowerCase() === "epub" ){
        return "epub";
      }
    }
  },
  actions: {
    async fetchFileListAll(){
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
      useComponentDisplayStore().newNotification(`File download started.`);
      window.location.href = `/vueapi/file?id=${fileid}`;
    },
    async moveFileToTrash(fileid, filename){
      try {
        const response = await fetch(`/vueapi/move-to-trash?id=${fileid}`, {
          method: "POST"
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
        useComponentDisplayStore().newNotification(`File '${filename}' moved to Trash.`);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.fetchFileListAll();
      }
    },
    async restoreFileFromTrash(fileid, filename, filepath){
      try {
        const response = await fetch(`/vueapi/restore-from-trash?id=${fileid}`, {
          method: "POST"
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
        useComponentDisplayStore().newNotification(`File '${filename}' restored to ${filepath}.`);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.fetchFileListAll();
      }
    },
    async deleteFilePermanently(fileid, filename){
      try {
        const response = await fetch(`/vueapi/file?id=${fileid}`, {
          method: "DELETE"
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
        useComponentDisplayStore().newNotification(`File '${filename}' deleted permanently.`);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.fetchFileListAll();
      }
    },
    openRenameFileModal(fileid, filename, extension){
      this.renameFileTo.fileId = fileid;
      this.renameFileTo.newFileName = removeExtension(filename);
      this.renameFileTo.newExtension = extension;
      useComponentDisplayStore().openModal("ModalRename");
    },
    async previewFile(fileid, filename, extension){
      this.previewInfo.fileId = fileid;
      this.previewInfo.fileName = filename;
      this.previewInfo.extension = extension;
      useComponentDisplayStore().openModal("ModalPreview");
    },
    resetPreviewInfo(){
      this.previewInfo.fileId = "";
      this.previewInfo.fileName = "";
      this.previewInfo.extension = "";
    },
    async renameFile(state){
      try {
        const response = await fetch(`/vueapi/rename-file?id=${this.renameFileTo.fileId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newFileName: this.renameFileTo.newFileName,
            newExtension: this.renameFileTo.newExtension
          })
        });
        const serverResponse = await response.text();
        console.log(serverResponse);
        useComponentDisplayStore().closeModal();
        useComponentDisplayStore().newNotification(`File renamed to '${this.renameFileTo.newFileName}.${this.renameFileTo.newExtension}'.`);
      } catch (error) {
        console.error(error.message);
      } finally {
        this.fetchFileListAll();
      }
    }
  }
});