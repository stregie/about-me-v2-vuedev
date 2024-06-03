import { defineStore } from 'pinia';

export const useUploadStore = defineStore('uploadedFiles', {
  state: () => ({
    fileInput: null,
    serverResponse: null,
  }),
  actions: {
    async uploadFiles(files){
      this.fileInput = files;
      let path = pathToString(useFoldersStore().activeFolder);
      console.log("uploaded to: ", path);
      console.log(files);
      

//       let formData = new FormData();
//       formData.append('path', path);
//       if(this.fileInput){
//         for (let i = 0; i < this.fileInput.length; i++) {
//           formData.append('file', this.fileInput[i]);          
//         }
//       }
// 
//       try {
//         const response = await fetch('/vueapi/upload/', {
//           method: "PUT",
//           body: formData
//         });
//         const result = await response.text();
//         this.serverResponse = result;
//       } catch (error) {          
//         this.serverResponse = error;
//       } 
    }
  }
});