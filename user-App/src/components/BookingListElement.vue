<template>
  <b-card :title=booking.type :subtitle=booking.clinic.name @click="expand" class="card">
    <div class="time">
      {{ booking.date }}
      <br>
      {{booking.time}}
    </div>
  </b-card>
  <br>
</template>
  
<script>
export default {
  name: 'BookingListElement',
  props: {
    booking: {
      type: Object,
      clinic: Object,
      date: String,
      time: String,
      comments: String,
      required: true
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