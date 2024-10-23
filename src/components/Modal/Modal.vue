<template>
  <Transition>
    <div
      class = "modal-container"
      v-if = "modalVisible" 
      @click = "closeModal"
      >

      <component
        :is = "activeModalComponent"
        @click = "preventCloseInsideModal"/>
    </div>
  </Transition>
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
  
  .v-enter-to,
  .v-leave-from {
    opacity: 1;
  }
  
  .v-enter-from, 
  .v-leave-to {
    opacity: 0;
  }
  
  .modal-container {
    transition: opacity 0.3s;
  }
</style>