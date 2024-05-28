<template>
	<div class = "minisite-info-dummy">Fileuploader. <router-link to = "/file-uploader-test/">Test</router-link> Viewport width: {{ viewportWidth }}</div>
	<div id = "fileuploader-minisite">
		<div :class = "{ blurred: isModalVisible }">
			<Sidebar />
		</div>
		<div id = "main-content" :class = "{ blurred: isModalVisible }">
			<Commandbar 
			 @changeFileListView = "changeFileListView"/>
			<Breadcrumb />
			<Filelist 
			  :fileListView = "fileListView"
			/>
			<!-- <pre>{{ availableFiles }}</pre> -->
		</div>
		<div v-if = "isModalVisible" id = "modal">
			<DraganddropUpload />
		</div>
	</div>
</template>

<script >
	import { useFilesStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';
  import Sidebar from './sidebar.vue';
  import Commandbar from './commandbar.vue';
  import Breadcrumb from './breadcrumb.vue';
  import Filelist from './filelist.vue';
  import DraganddropUpload from './draganddrop-upload.vue';


	export default {
		components: {
      'Sidebar': Sidebar,
      'Commandbar': Commandbar,
			'Breadcrumb': Breadcrumb,
      'Filelist': Filelist,
      'DraganddropUpload': DraganddropUpload
    },
		data(){
			return {
				fileListView: "ListView",
				isModalVisible: true
			}
		},
		async created(){
			this.fetchFileMetaDataList('available');
		},
		computed: {
			...mapState(useFilesStore, ['availableFiles']),
			viewportWidth(){
				let vw = Math.max(document.documentElement.clientWidth || 0);
				return vw;
			}

		},
    methods: {
			...mapActions(useFilesStore, ['fetchFileMetaDataList']),
			changeFileListView(view){
				this.fileListView = view;
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
	#fileuploader-minisite {
		position: relative;
	}
	.blurred {
		filter: blur(2px);
	}
	#modal {
		position: absolute;
		top: 0px;
		left: 0px;
		height: 100%;
		width: 100%;
		background: #00000088;
		z-index: 1200;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>