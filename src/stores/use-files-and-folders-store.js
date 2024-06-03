import { defineStore } from 'pinia';
import { useFilesStore } from './use-files-store.js';
import { useFoldersStore } from './use-folders-store.js';

export const useFilesAndFoldersStore = defineStore('filesAndFolders', {
  state: () => ({
    activeFolder: ['text', '04'],
    filterBy: {
      filename: "",
      extension: ""
    },
    sortBy: {
      column: "filename",
      ascending: true
    },
    trashActive: false,
  }),
  getters: {
    foldersToDisplay: (state) => {
      if(state.trashActive) {
        return null;
      } else {
        let folderList = useFoldersStore().subFoldersInActiveFolder;
        folderList = filterFolders(folderList, state.filterBy);
        sortFolders(folderList, state.sortBy);
        return folderList;
      }
    },
    filesToDisplay: (state) => {
      let fileList = [];
      if(state.trashActive) {
        fileList = useFilesStore().fileListTrash;
      } else {
        fileList = useFilesStore().fileListInActiveFolder;
      }  
      fileList = filterFiles(fileList, state.filterBy);
      sortFiles(fileList, state.sortBy);
    
      return fileList;
    },
  },
  actions: {
    changeActiveFolder(pathArray){
      this.activeFolder = pathArray;
    },
    changeFilter(filterOptions){
      this.filterBy = filterOptions;
    },
    changeSortOrder(column){
      if (column === this.sortBy.column) {
        this.sortBy.ascending = !this.sortBy.ascending
      } else {
        this.sortBy.column = column;
        this.sortBy.ascending = true;
      }
    },
    openTrash(){
      this.trashActive = true;
    },
    closeTrash(){
      this.trashActive = false;
    }
  }
});



function filterFiles(fileList, filterBy) {
  if (!fileList) {
    return null;
  } else {
    let filteredList = [];
    fileList.forEach(file => {
      if (file.filename.toLowerCase().includes(filterBy.filename.toLowerCase()) &&
        file.extension.toLowerCase().includes(filterBy.extension.toLowerCase())) {
        filteredList.push(file);
      }
    });

    return filteredList;
  }
};

function filterFolders(folderList, filterBy) {
  if (!folderList) {
    return null;
  } else {
    let filteredList = [];
    folderList.forEach(folder => {
      if (folder.toLowerCase().includes(filterBy.filename.toLowerCase())) {
        filteredList.push(folder);
      }
    });

    return filteredList;
  }
};

function sortFiles(fileList, sortBy) {
  if (!fileList) {
    return null;
  } else {
    if (sortBy.ascending) {
      fileList.sort(function(a, b){
        let x = a[sortBy.column].toString().toLowerCase();
        let y = b[sortBy.column].toString().toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });          
    } else {
      fileList.sort(function(a, b){
        let x = a[sortBy.column].toString().toLowerCase();
        let y = b[sortBy.column].toString().toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
    }

    return fileList;
  }
};

function sortFolders(folderList, sortBy) {
  if (!folderList) {
    return null;
  } else {
    if (sortBy.ascending) {
      folderList.sort();          
    } else {
      folderList.sort().reverse();
    }

    return folderList;
  }
};