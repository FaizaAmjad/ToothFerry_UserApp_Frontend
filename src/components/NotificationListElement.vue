<template>
  <b-card class="card">
    <div>
      <b-card-text>
        {{ notification.note }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
export default {
  name: 'NotificationListElement',
  props: {
    notification: Object
  },
  methods: {}
  // Add methods or lifecycle hooks as needed
}
</script>

<style scoped>
.time {
  text-align: right;
}

.card:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Darken the background color on hover */
  cursor: pointer; /* Change cursor to indicate interactivity */
}
</style>
