<template>
  <div id = "breadcrumb">
    <ol class = "breadcrumb mb-1">
      <li class = "breadcrumb-item">
        <label @click = "jumpToFolder(0)">Root</label>
      </li>
      <li class = "breadcrumb-item" v-for = "(folder, index) in activeFolder">
        <label @click = "jumpToFolder(index + 1)">{{ folder }}</label>
      </li>
    </ol>
  </div>
</template>

<script>
  import { useFoldersStore } from '../stores/stores.js';
  import { mapState, mapActions } from 'pinia';

	export default {
		data() {
			return {

			}
		},
    computed: {
      ...mapState(useFoldersStore, ['activeFolder'])
    },
    methods: {
      ...mapActions(useFoldersStore, ['changeActiveFolder']),
      jumpToFolder(index){
        const newActiveFolder = this.activeFolder.slice(0, index);
        this.changeActiveFolder(newActiveFolder);
      }
     
    }
  }
</script>

<style lang = "scss" scoped>
  #breadcrumb {
    /* background: #888; */
    /* width: 160px;
    height: 100vh; */
    margin-bottom: 20px;
  }
  #breadcrumb {
    ol {
      li {
        font-size: 0.8rem;
      }
      li:last-child{
        color: Maroon;
        font-weight: bold;
      }
    }
  }
</style>