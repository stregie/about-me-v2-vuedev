<template>
	<div class = "minisite-info-dummy">
		Fileuploader.
		<router-link to = "/fileuploader-vue/file-uploader-test/">Test</router-link>
	  Viewport width: {{ viewportWidth }}
	</div>

	<div id = "fileuploader-minisite">
		<div :class = "{ blurred: modalVisible }">
			<Sidebar />
		</div>

		<div id = "main-content" :class = "{ blurred: modalVisible }">
			<Commandbar />
			<Breadcrumb />
			<div id = "file-list">
		    <component :is = "fileListView"></component>
			</div>
		</div>

		<Modal />
	</div>

	<div class = "footer-dummy"></div>
</template>

<script >
  import { mapState, mapActions } from 'pinia';
	import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
	import { useFilesStore } from '../stores/use-files-store.js';
  import Sidebar from './sidebar.vue';
  import Commandbar from './commandbar.vue';
  import Breadcrumb from './breadcrumb.vue';
  import Modal from './modal.vue';
  import ListView from './filelist-listview.vue';
  import DetailedView from './filelist-detailedview.vue';


	export default {
		components: {
      'Sidebar': Sidebar,
      'Commandbar': Commandbar,
			'Breadcrumb': Breadcrumb,
      'ListView': ListView,
      'DetailedView': DetailedView,
      'Modal': Modal
    },
		async created(){
			this.fetchFileListAll();
		},
		computed: {
			...mapState(useComponentDisplayStore, ['modalVisible', 'fileListView']),
			viewportWidth(){
				let vw = Math.max(document.documentElement.clientWidth || 0);
				return vw;
			}
		},
		methods: {
			...mapActions(useFilesStore, ['fetchFileListAll']),
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
	#fileuploader-minisite {
		position: relative;
	}
	.blurred {
		filter: blur(2px);
	}
</style>