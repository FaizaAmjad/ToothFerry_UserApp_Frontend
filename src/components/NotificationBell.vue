<template>
  <div class="notification-bell" @click="toggleNotifications">
    <i class="fa fa-bell"></i>
    <div v-if="notifications.length > 0" class="notification-badge">{{ notifications.length }}</div>

    <div v-if="showNotifications" class="notification-dropdown">
      <notification-list-element
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NotificationListElement from './NotificationListElement.vue'

export default {
  components: {
    NotificationListElement
  },
  computed: {
    ...mapGetters(['notifications', 'showNotifications'])
  },
  methods: {
    ...mapMutations(['toggleShowNotifications']),
    toggleNotifications() {
      this.toggleShowNotifications()
    }
  }
}
</script>

<style scoped>
.notification-bell {
  position: relative;
  cursor: pointer;
  font-size: 20px;
  margin: 5px;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
}

.notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
}
</style>
