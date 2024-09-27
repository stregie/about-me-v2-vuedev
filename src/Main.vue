<template>
	<div class = "minisite-info-dummy">
		Filemanager.
		<router-link to = "/filemanager/filemanager-test/">Test</router-link>
	  mobileView: {{ mobileView }}
	</div>

	<div id = "filemanager-minisite">
		<div :class = "{ blurred: modalVisible }">
			<Sidebar />
		</div>

		<div id = "main-content" :class = "{ blurred: modalVisible }">
			<Commandbar />
			<Breadcrumb />
			<Filelist />
		</div>

		<Modal />
		<NotificationBar />
	</div>

	<div class = "footer-dummy"></div>
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
  // import '/src/assets/css/main.scss';
  // import '/src/assets/css/commandbar.scss';
  



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
      window.addEventListener('resize', this.detectMobileView);
      this.detectMobileView(); // initiate check
    },
    unmounted() {
      window.removeEventListener('resize', this.detectMobileView);
    },
		computed: {
			...mapState(useComponentDisplayStore, ['modalVisible', 'mobileView']),
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
			}
		}
  };
</script>

<style lang = "scss" scoped>
  .minisite-info-dummy {
		background: black;
		color: white;
		line-height: 20vh;
		padding-left: 20px;
	}
	.footer-dummy {
		height: 80px; /* Same as express site */
		background: black;
	}
	.blurred {
		filter: blur(2px);
	}
</style>