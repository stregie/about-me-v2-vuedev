<template>
  <dialog id = "notification-bar" :open = "isNotificationBarOpen">
    <div class = "notification-row" v-for = "notification in notifications">
      {{ notification }}
    </div>
  </dialog>
</template>

<script>
  import { mapState } from 'pinia';
  import { useComponentDisplayStore } from '/src/stores/use-component-display-store.js';

	export default {
    computed: {
      ...mapState(useComponentDisplayStore, ['notifications']),
      isNotificationBarOpen(){
        if(this.notifications[0]){
          return true;
        } else {
          return false;
        }
      }
    }
  }
</script>

<style lang = "scss" scoped>
  @import "/src/assets/css/notificationbar.scss";
</style>