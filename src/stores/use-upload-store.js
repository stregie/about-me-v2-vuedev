import axios from 'axios';
import { defineStore } from 'pinia';
import { useComponentDisplayStore } from './use-component-display-store.js';
import { useFilesStore } from './use-files-store.js';
import { useFilesAndFoldersStore } from './use-files-and-folders-store.js';
import { pathToString  } from '../utils/foldertree.js';


export const useUploadStore = defineStore('uploadedFiles', {
  state: () => ({
    fileInput: null,
    formData: null,
    nonExistingFiles: null,
    uploading: false,
    uploadProgress: 0,
  }),
  getters: {
    fileInputTotalSize(){
      let totalSize = 0;
      for (let i = 0; i < this.fileInput.length; i++){
        totalSize += this.fileInput[i].size;
      }

      return totalSize;
    },
    path(){
      return pathToString(useFilesAndFoldersStore().activeFolder);
    },
    uploadPercent(){
      return this.uploadProgress + "%";
    }
  },
  actions: {
    async handleUpload(files){
      this.uploadResponse = null;
      this.fileInput = files;
      if (this.fileInputTotalSize > 4718592){
        useComponentDisplayStore().newNotification("Size limit exceeded: Maximum 4,5 MB can be uploaded at once.");
        return;
      }

      if (this.path === "/"){
        useComponentDisplayStore().newNotification("You can not upload files to the root.");
        return;
      }

      try {
        await this.findExistingFiles();
        this.createFormData();
        if (Array.from(this.formData.entries()).length <= 1) {
          return;
        }
        await this.uploadFiles();
      } catch (error) {
        console.error(error);
        useComponentDisplayStore().newNotification("An error has occured during upload.");
      } finally {
        useFilesStore().fetchFileListAll();
        this.fileInput = null;
        this.formData = null;
        this.nonExistingFiles = null;
      }
    },
    async findExistingFiles(){
      let fileInfo = {
        path: this.path,
        filenames: []
      }
      for (let i = 0; i < this.fileInput.length; i++){
        fileInfo.filenames.push(this.fileInput[i].name);
      }
      try {
        const response = await fetch('/vueapi/check-if-exists', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fileInfo)
        });

        const serverResponse = await response.json();
        if (serverResponse.nonExistingFiles.length === 0) {
          useComponentDisplayStore().newNotification("All selected files exist already and won't be uploaded.");
        } else if (serverResponse.existingFiles.length > 0) {
          useComponentDisplayStore().newNotification("Some of the selected files exist already and won't be uploaded.");
        }
        this.nonExistingFiles = serverResponse.nonExistingFiles;
      } catch(error) {
        console.log(error);
        useComponentDisplayStore().newNotification("An error has occured during upload.");
      }
    },
    createFormData(){
      let formData = new FormData();
      formData.append('path', this.path);
      if(this.fileInput){
        for (let i = 0; i < this.fileInput.length; i++) {
          if(this.nonExistingFiles.includes(this.fileInput[i].name)){
            formData.append('file', this.fileInput[i]);          
          }
        }
      }
      this.formData = formData;
    },
    async uploadFiles(){
      try {
        this.uploading = true;
        useComponentDisplayStore().newNotification("File upload started");
        const response = await axios.put('/vueapi/upload/', this.formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          },
        });
        const result = await response.data;
        console.log(result.uploadedFiles, result.existingFiles);
        useComponentDisplayStore().newNotification("Files uploaded successfully");
      } catch (error) {
        console.error(error);          
        useComponentDisplayStore().newNotification("An error has occured");
      }  finally {
        this.uploading = false;
        this.uploadProgress = 0;
      }
    }
  }
});