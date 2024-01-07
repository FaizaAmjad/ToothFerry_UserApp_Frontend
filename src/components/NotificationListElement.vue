<template>
  <b-card class="card">
    <div>   
      <b-card-text>
        <b-card-title>{{notification.id}}</b-card-title>
        <b-card-sub-title>{{notification.type}}</b-card-sub-title>
        <b-card-text>{{notification.note}}</b-card-text>
      </b-card-text>
    </div>
  </b-card>
</template>
  
<script>
export default {
  name: 'NotificationListElement',
  props: {
    notification: {
      id: String,
      user_id: String,
      note: String,
      type: String
    }
  }
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