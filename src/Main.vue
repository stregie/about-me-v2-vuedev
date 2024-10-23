<template>
	<div id = "filemanager-minisite">
		<div :class = "{ blurred: modalVisible }">
			<Sidebar />
		</div>

		<div
		  id = "main-content"
		  :class = "{ 
		  	blurred: modalVisible || sidebarVisible && mobileView,
		  	'commandbar-menu-open': commandbarMenuVisible
		  }">
			<Commandbar />
			<Breadcrumb />
			<Filelist />
		</div>

		<Modal />
		<NotificationBar />
	</div>

	<!-- <div class = "debug">
		innerHeight: {{ iH }} outerHeight: {{ oH }}
	</div> -->
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
    		windowWidth: window.innerWidth,
    		iH: window.innerHeight,
    		oH: window.outerHeight
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
			...mapState(useComponentDisplayStore, ['sidebarVisible', 'modalVisible', 'commandbarMenuVisible', 'mobileView']),
		},
		methods: {
			...mapActions(useFilesStore, ['fetchFileListAll']),
			...mapActions(useComponentDisplayStore, ['detectMobileView']),
			setViewportHeight(){
				// Height of main HTML element is set here to avoid resizing the base value of vh when virtual keyboard pops up on Firefox
				let appHeight = "";
				if (this.mobileView) {
					if (window.innerHeight == window.outerHeight){ // Non-Firefox mobile
						appHeight = "calc(100vh - 80px)"
					} else { // for Firefox mobile or small-width desktop
						appHeight = String(window.innerHeight - 75) + "px";
					}
				} else {  // Desktop
					appHeight = "calc(100vh - 80px)"
				}
				console.log(appHeight);
        document.querySelector('#filemanager-minisite').style.setProperty('height', `${appHeight}`);
			}
		}
  };
</script>

<style lang = "scss" scoped>
	.blurred {
		filter: blur(2px);
	}
	
	.debug {
		background: black;
		color: white;
	}
</style>