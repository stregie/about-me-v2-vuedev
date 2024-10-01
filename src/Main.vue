<template>
	<div id = "filemanager-minisite">
		<div :class = "{ blurred: modalVisible }">
			<Sidebar />
		</div>

		<div id = "main-content" :class = "{ blurred: modalVisible, 'commandbar-menu-open': commandbarMenuVisible }">
			<Commandbar />
			<Breadcrumb />
			<Filelist />
		</div>

		<Modal />
		<NotificationBar />
	</div>
</template>

<script >
  import { mapState, mapActions } from 'pinia';
	import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
	import { useFilesStore } from '/src/stores/use-files-store.js';
  import Sidebar from '/src/components/Sidebar/Sidebar.vue';
  import Commandbar from '/src/components/Commandbar/Commandbar.vue';
  import Breadcrumb from '/src/components/Breadcrumb/Breadcrumb.vue';
  import Filelist from '/src/components/Filelist/Filelist.vue';
  import Modal from '/src/components/Modal/Modal.vue';
  import NotificationBar from '/src/components/Notificationbar/Notificationbar.vue';

	export default {
		components: {
      'Sidebar': Sidebar,
      'Commandbar': Commandbar,
			'Breadcrumb': Breadcrumb,
			'Filelist': Filelist,
      'Modal': Modal,
      'NotificationBar': NotificationBar
    },
    data() {
    	return {
    		windowWidth: window.innerWidth
    	}
    },
		async created(){
			this.fetchFileListAll();
		},
		mounted() {
      this.detectMobileView(); // initiate check
      window.addEventListener('resize', this.detectMobileView);
      this.setViewportHeight();
    },
    unmounted() {
      window.removeEventListener('resize', this.detectMobileView);
    },
		computed: {
			...mapState(useComponentDisplayStore, ['modalVisible', 'commandbarMenuVisible', 'mobileView']),
		},
		methods: {
			...mapActions(useFilesStore, ['fetchFileListAll']),
			...mapActions(useComponentDisplayStore, ['detectMobileView']),
			dragstartHandler(){
				console.log("dragstartHandler");
			},
			dragendHandler(){
				console.log("dragendHandler");
			},
			dragenterHandler(){
				console.log("dragenterHandler");
			},
			dragleaveHandler(){
				console.log("dragleaveHandler");
			},
			drophandler(event){
				event.preventDefault();
				console.log("drop");
			},
			setViewportHeight(){
				// Height of main HTML element is set here to avoid resizing when virtual keyboard pops up
				let appHeight = 0;
				if (this.mobileView) {
					appHeight = window.outerHeight - 75;
				} else {
					appHeight = window.innerHeight - 75;
				}
				console.log(appHeight);
        document.querySelector('#filemanager-minisite').style.setProperty('height', `${appHeight}px`);
			}
		}
  };
</script>

<style lang = "scss" scoped>
	.blurred {
		filter: blur(2px);
	}
</style>