import { defineStore } from 'pinia';

export const useComponentDisplayStore = defineStore('componentDisplay', {
  state: () => ({
  	fileListView: "ListView", // DetailedView
  	activeModalComponent: "ModalRename", // null
  	modalVisible: true,
  	sidebarVisible: false,
    mobileView: false,
    notifications: [],
  }),
  getters: {

  },
  actions: {
    changeActiveModal(component){
      this.activeModalComponent = component;
    },
    openModal(component){
      this.activeModalComponent = component;
      this.modalVisible = true;
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
    newNotification(message){
      this.notifications.push(message);
      setTimeout(() => {
        this.removeFirstNotification();
      }, 5000);
    },
    removeFirstNotification(){
      this.notifications.shift();
    },
    detectMobileView(){
      if (window.innerWidth < 768) {
        this.mobileView = true;
      } else {
        this.mobileView = false;
      }
    }
  }
});