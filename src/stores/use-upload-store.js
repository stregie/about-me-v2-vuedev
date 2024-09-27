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
    processing: false,
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
    }
  },
  actions: {
    async handleUpload(files){
      this.uploadResponse = null;
      this.fileInput = files;

      try {
        if (this.fileInputTotalSize > 4718592){
          useComponentDisplayStore().newNotification("Size limit exceeded: Maximum 4,5 MB can be uploaded at once.");
          return
        }

        await this.findExistingFiles();
        this.createFormData();
        if (Array.from(this.formData.entries()).length <= 1) {
          return
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
        console.log("findExistingFiles server response: ", serverResponse);
        if (serverResponse.nonExistingFiles.length === 0) {
          useComponentDisplayStore().newNotification("All selected files exist already and won't be uploaded.");
        } else if (serverResponse.existingFiles.length > 0) {
          useComponentDisplayStore().newNotification("Some of the selected files exist already and won't be uploaded.");
        }
        this.nonExistingFiles = serverResponse.nonExistingFiles;
      } catch(error) {
        console.log(error);
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
        this.processing = true;
        useComponentDisplayStore().newNotification("File upload started");
        const response = await fetch('/vueapi/upload/', {
          method: "PUT",
          body: this.formData
        });
        const result = await response.json();
        useComponentDisplayStore().newNotification("Files uploaded successfully");
      } catch (error) {
        console.error(error);          
        useComponentDisplayStore().newNotification("An error has occured");
      }  finally {
        this.processing = false;
      }
    }
//     async uploadFiles(){    
//       // XMLHttpRequest is used to track upload progress
//       const upload = new Promise((resolve, reject) =>{
//         document.querySelector('#progress-bar').classList.remove("processing");
//         let request = new XMLHttpRequest();
//         request.open('PUT', '/vueapi/upload/'); 
// 
//         request.upload.addEventListener('progress', function(e) {
//           let percentCompleted = Math.floor((e.loaded / e.total) * 100);
//           console.log("progress", percentCompleted);
//           document.querySelector('#progress-bar').style.backgroundImage = `conic-gradient(at ${percentCompleted}% 100%, #FAFAFA, #E2E2E1)`;
//         });
// 
//         request.addEventListener('load', function(e) {
//           document.querySelector('#progress-bar').classList.add("processing");
//           console.log(request.status);
//           console.log(request.response);
//           resolve(request.response);
//         });
// 
//         request.send(this.formData);
//       });
//       console.log('resolve', upload);
//     }
  }
});
