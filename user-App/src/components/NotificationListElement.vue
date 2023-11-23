<template>
  <b-card @click="expand" class="card">
    <div>   
      <b-card-text>
        <b-card-title>{{notification.sender.name}}</b-card-title>
        <b-card-sub-title>{{notification.date}}</b-card-sub-title>
        <b-card-text>{{notification.content}}</b-card-text>
      </b-card-text>
    </div>
  </b-card>
  <br>
</template>
  
<script>
export default {
  name: 'NotificationListElement',
  props: {
    notification: {
      sender: Object,
      Date: String,
      content: String
    }
  },
  methods: {
    expand() {
      console.log('Expand '+ this.booking.type)
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