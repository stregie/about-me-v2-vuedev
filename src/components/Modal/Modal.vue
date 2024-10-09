<template>
  <div
    class = "modal-container"
    v-if = "modalVisible" 
    @click = "closeModal"
    >
    <component
      :is = "activeModalComponent"
      @click = "preventCloseInsideModal"/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import ModalPreview from './subcomponents/Preview.vue';
  import ModalRename from './subcomponents/Rename.vue';
  import ModalSearch from './subcomponents/Search.vue';
 

	export default {
    components: {
      'ModalPreview': ModalPreview,
      'ModalRename': ModalRename,
      'ModalSearch': ModalSearch,
    },
    computed: {
      ...mapState(useComponentDisplayStore, ['activeModalComponent', 'modalVisible']),
    },
    methods: {
      ...mapActions(useComponentDisplayStore, ['closeSidebar', 'closeModal']),
      preventCloseInsideModal(){
        event.stopPropagation();
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/modal.scss";
</style>