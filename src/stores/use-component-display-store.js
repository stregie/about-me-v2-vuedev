import { defineStore } from 'pinia';

export const useComponentDisplayStore = defineStore('componentDisplay', {
  state: () => ({
  	fileListView: "ListView",
  	modalVisible: false,
  	activeModalComponent: null,
  	sidebarVisible: false,
  }),
  getters: {

  },
  actions: {
  	toggleModalVisibility(){
  	  this.modalVisible = !this.modalVisible;
  	},
  	toggleSidebarVisibility(){
  	  this.sidebarVisible = !this.sidebarVisible;
  	},
  	changeFileListView(view){
      this.fileListView = view;
    },
  }
});