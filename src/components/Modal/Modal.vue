<template>
  <div
    class = "modal-container"
    v-if = "modalVisible" 
    @click = "closeModal"
    >
    <component :is = "activeModalComponent" @click = "preventCloseInsideModal"/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';
  import ModalDraganddrop from './subcomponents/Draganddrop.vue';
  import ModalMove from './subcomponents/Move.vue';
  import ModalRename from './subcomponents/Rename.vue';
  import ModalSearch from './subcomponents/Search.vue';
 

	export default {
    components: {
      'ModalDraganddrop': ModalDraganddrop,
      'ModalMove': ModalMove,
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