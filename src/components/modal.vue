<template>
  <div
    id = "modal"
    v-if = "modalVisible" 
    @click = "closeModal"
    >
    <component :is = "activeModalComponent" @click = "preventCloseInsideModal"/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia';
  import { useComponentDisplayStore } from '../stores/use-component-display-store.js';
  import ModalDraganddrop from './modal-draganddrop.vue';
  import ModalMove from './modal-move.vue';
  import ModalSearch from './modal-search.vue';
 

	export default {
    components: {
      'ModalDraganddrop': ModalDraganddrop,
      'ModalMove': ModalMove,
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
  @import "../assets/css/variables.scss";

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