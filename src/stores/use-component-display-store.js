import { defineStore } from 'pinia';

export const useComponentDisplayStore = defineStore('componentDisplay', {
  state: () => ({
  	fileListView: "ListView", // or DetailedView
    commandbarMenuVisible: false,
  	activeModalComponent: "",
  	modalVisible: false,
  	sidebarVisible: false,
    mobileView: false,
    notifications: [],
  }),
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
    openCommandbarMenu(){
      this.commandbarMenuVisible = true;
    },
    toggleCommandbarMenuVisibility(){
      this.commandbarMenuVisible = !this.commandbarMenuVisible;
    },
  	toggleModalVisibility(){
  	  this.modalVisible = !this.modalVisible;
  	},
    openSidebar(){
      this.sidebarVisible = true;
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
      if (window.innerWidth <= 768) {
        this.mobileView = true;
      } else {
        this.mobileView = false;
      }
    }
  }
});