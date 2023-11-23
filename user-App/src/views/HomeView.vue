<template>
  <div class="container-fluid">
    <b-row class="row">
      <!-- Left Section -->
      <b-col class="col-md-4 bg-primary">
        <p>GOOGLE MAPS API STUFF HERE</p>
      </b-col>

      <!-- Right Section -->
      <b-col class="col-md-8">
        <div>
          <!-- My Bookings -->
          <div class="container-fluid bg-light p-5">
            <h1 class="display-4">My Bookings</h1>
            <div>
              <BookingListElement v-for="booking in bookings" :booking="booking" :key="booking.id" />
            </div>
          </div>
          

          <!-- Inbox -->
          <div class="container-fluid bg-light p-5">
            <h1 class="display-4">Inbox</h1>
            <div>
              <NotificationListElement v-for="notification in notifications" :notification="notification" :key="notification.id" />
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BookingListElement from '../components/BookingListElement.vue'
import NotificationListElement from '../components/NotificationListElement.vue'
//import axios from 'axios'
export default {
  name: 'home-view',
  components: {
    BookingListElement,
    NotificationListElement
  },
  data() {
    return {
      // mock data
      bookings: [
        {
          type: 'Checkup',
          clinic: {
            name: 'City Hospital',
            location: '123 Main St, Cityville'
          },
          date: '2023-11-28',
          time: '10:30 AM'
          // Add more details based on your booking data structure
        },
        {
          type: 'Dental Appointment',
          clinic: {
            name: 'Dentist Clinic',
            location: '456 Dental St, Toothland'
          },
          date: '2023-12-05',
          time: '2:00 PM'
          // Add more details based on your booking data structure
        },
        // Add more mock bookings as needed
      ],
      notifications: [
        {
          sender: {
            name: 'Dr. Dentist',
            profilePicture: 'https://picsum.photos/200'
          },
          date: '2023-11-28',
          content: 'Your gonna die, your teeth have the big C.'
        },
        {
          sender: {
            name: 'Dr. Teeth',
            profilePicture: 'https://picsum.photos/210'
          },
          date: '2023-12-05',
          content: 'Your appointment has been confirmed.'
        },
        // Add more mock notifications as needed
      ]
    }
  }
  /*
  ,
  async created() {
    
    const response = await axios.get('bookings');
    this.bookings = response.data;
    const response2 = await axios.get('messages');
    this.messages = response2.data;
    
  }
  */
}
</script>

<style scoped>
.my-booking {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  /* Add more styles as needed */
}
</style>