<template>
    <div>
      <h1>Inbox</h1>
      <div v-for="notification in notifications" :key="notification.id">
        <NotificationListElement :notification="notification" />
      </div>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalNotifications"
        :per-page="perPage"
        @change="fetchNotifications"
      ></b-pagination>
    </div>
  </template>
  
  <script>
  import NotificationListElement from '@/components/NotificationListElement.vue';
  import { getUserNotifications } from '@/apis/users';
  
  
  export default {
    name: 'inbox-view',
    components: {
      NotificationListElement,
    },
    data() {
      return {
        notifications: [],
        currentPage: 1,
        perPage: 10,
        totalNotifications: 0,
      };
    },
    mounted() {
      this.fetchNotifications();
    },
    methods: {
      async fetchNotifications() {
        try {
          var offset = (this.currentPage - 1) * this.perPage;
          var limit = this.perPage;
          const response = await getUserNotifications(
          offset,
          limit,
          );
  
          this.notifications = response.data.notifications;
          this.totalNotifications = response.data.total;
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      },
    },
  };
  </script>
  