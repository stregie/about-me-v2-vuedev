import { defineStore } from 'pinia';

export const useComponentDisplayStore = defineStore('componentDisplay', {
  state: () => ({
  	fileListView: "ListView",
  	activeModalComponent: null, // null
  	modalVisible: false,
  	sidebarVisible: false,
  }),
  getters: {

  },
  actions: {
    changeActiveModal(component){
      this.activeModalComponent = component;
    },
    closeModal(){
      this.modalVisible = false;
    },
  	toggleModalVisibility(){
  	  this.modalVisible = !this.modalVisible;
  	},
    closeSidebar(){
      this.sidebarVisible = false;
    },
  	toggleSidebarVisibility(){
  	  this.sidebarVisible = !this.sidebarVisible;
  	},
  	changeFileListView(view){
      this.fileListView = view;
    },
  }
});