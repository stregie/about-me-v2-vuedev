import { defineStore } from 'pinia';
import { useFilesStore } from './use-files-store.js';
import { useFilesAndFoldersStore } from './use-files-and-folders-store.js';
import { pathToString  } from '../utils/foldertree.js';


export const useUploadStore = defineStore('uploadedFiles', {
  state: () => ({
    fileInput: null,
    formData: null,
    existingFiles: null,
    uploadResponse: null,
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
          this.uploadResponse = "Maximum 4,5 MB can be uploaded at once.";
          return
        }

        await this.findExistingFiles();
        this.createFormData();
        if (Array.from(this.formData.entries()).length <= 1) {
          this.uploadResponse = "All selected files exist and won't be uploaded.";
          return
        }

        await this.uploadFiles();
      } catch (error) {
        console.error(error);
        this.uploadResponse = "An error has occured";
      } finally {
        useFilesStore().fetchFileListAll();
        this.fileInput = null;
        this.formData = null;
        setTimeout(() => {
          this.uploadResponse = null
        }, 5000);
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
        this.existingFiles = serverResponse.existingFiles;
        if (this.existingFiles.length < 0) {
          this.uploadResponse = "Some of the selected files exist already and won't be uploaded.";
        }
      } catch(error) {
        console.log(error);
      } 
    },
    createFormData(){
      let formData = new FormData();
      formData.append('path', this.path);
      if(this.fileInput){
        for (let i = 0; i < this.fileInput.length; i++) {
          if(!this.existingFiles.includes(this.fileInput[i].name)){
            formData.append('file', this.fileInput[i]);          
          }
        }
      }
      this.formData = formData;
    },
    async uploadFiles(){
      try {
        const response = await fetch('/vueapi/upload/', {
          method: "PUT",
          body: this.formData
        });
        const result = await response.json();

        
        this.uploadResponse = "Files uploaded successfully";
      } catch (error) {
        console.error(error);          
        this.uploadResponse = "An error has occured";
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
