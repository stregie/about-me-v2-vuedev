import { defineStore } from 'pinia';
import { pathToString, readNode, updateNode, createFolderTree } from '../utils/foldertree.js';


export const useTestStore = defineStore('teststore', {
  state: () => ({
    value: "testvalue2",
    
  }),
  actions: {
    testConsole(){
      console.log("testConsole");
    }
  }
});

export const useFilesStore = defineStore('files', {
  state: () => ({
    fileMetaDataList: null,
    loading: false,
    error: null
  }),
  getters: {
    availableFiles: (state) => {
      if (!state.fileMetaDataList) {
        return null;
      };
      return state.fileMetaDataList.filter(file => file.status === "available");
    },
    filesInTrash: (state) => {
      if (!state.fileMetaDataList) {
        return null;
      };
      return state.fileMetaDataList.filter(file => file.status === "trash");
    },
  },
  actions: {
    async fetchFileMetaDataList(){
      this.loading = true;
      try {
        const fileListResponse = await fetch(`/vueapi/filelist/`);
        // sort alphabetically by filename
        this.fileMetaDataList = await fileListResponse.json();
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
      try {
        const response = await fetch(`/vueapi/file?id=${fileid}`, {
					method: "DELETE",
				});
        const message = await response.text();
        console.log(message);
      } catch (error) {
        console.log(error);
        this.error = "Error";
      } finally {
        this.fetchFileMetaDataList('available');
        console.log("File moved to trash. File list refreshed.")
      }
    }
  }
});

export const useFoldersStore = defineStore('folders', {
  state: () => ({
    testvalue: null,
    activeFolder: [],
    folderTree: null,
    isTrashActive: false,
    filterBy: {
      filename: "",
      extension: ""
    },
    sortBy: {
      column: "filename",
      ascending: true
    },   
    loading: false,
    error: null
  }),
  getters: {
    subFoldersInActiveFolder: (state) => {
      console.log("old folders store");
      if (!state.folderTree) {
        return null;
      };


      let subFolders = [];
      if(state.activeFolder.length === 0){
        subFolders = state.folderTree.map(folder => {
          return folder.name;
        })
      } else {
        const node = readNode(state.folderTree, state.activeFolder);
        subFolders = node.children.map(folder => {
          return folder.name;
        });
      }

      return subFolders;
    },
    filesInActiveFolder: (state) => {
      const fileMetaDataList = useFilesStore().fileMetaDataList;
      if (!fileMetaDataList) {
        return null;
      }

      // filter for status === available
      let fileList = fileMetaDataList.filter(file => file.path === pathToString(state.activeFolder));

      // filter for filter input ("filterBy" state)
      let filteredList = [];
      fileList.forEach(file => {
        if (file.filename.toLowerCase().includes(state.filterBy.filename.toLowerCase()) &&
          file.extension.toLowerCase().includes(state.filterBy.extension.toLowerCase())) {
          filteredList.push(file);
        }
      });
      
      // sort files by "sortBy" state
      if (state.sortBy.ascending) {
        filteredList.sort(function(a, b){
          let x = a[state.sortBy.column].toString().toLowerCase();
          let y = b[state.sortBy.column].toString().toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });          
      } else {
        filteredList.sort(function(a, b){
          let x = a[state.sortBy.column].toString().toLowerCase();
          let y = b[state.sortBy.column].toString().toLowerCase();
          if (x < y) {return 1;}
          if (x > y) {return -1;}
          return 0;
        });
      }
      
      return filteredList;
    },
  },
  actions: {
    testmethod(){
      console.log("testmethod");
      this.testvalue = useTestStore().value;
    },
    createTree(){
      const fileMetaDataList = useFilesStore().fileMetaDataList;
      this.folderTree = createFolderTree(fileMetaDataList);
    },
    toggleExpanded(pathArray){
      let node = readNode(this.folderTree, pathArray);
      let value = !node.expanded;
      updateNode(this.folderTree, pathArray, 'expanded', value);
    },
    toggleTrash(){
      this.isTrashActive = !this.isTrashActive;
    },
    changeActiveFolder(pathArray){
      this.activeFolder = pathArray;
    },
    changeSortOrder(column){
      if (column === this.sortBy.column) {
        this.sortBy.ascending = !this.sortBy.ascending
      } else {
        this.sortBy.column = column;
        this.sortBy.ascending = true;
      }
    },
    changeFilter(filterOptions){
      this.filterBy = filterOptions;
    }
  }
});

export const useSidebarCompStore = defineStore('sidebarComponent', {
  state: () => ({
    sidebarHidden: true,
  }),
  actions: {
    toggleSidebar(){
      this.sidebarHidden = !this.sidebarHidden;
    }
  }
});

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