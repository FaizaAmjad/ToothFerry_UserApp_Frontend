<template>
  <div class="container-fluid">
    <b-row class="row">
      <!-- Left Section -->
      <div class="col-md-8 bg-primary">
        <p>GOOGLE MAPS API STUFF HERE</p>
      </div>

      <!-- Right Section -->
      <div class="col-md-4">
        <div class="container-fluid">
          <!-- My Bookings -->
          <div class="container-fluid bg-light p-5">
            <div class="card">
              <h5 class="bookingsHeader">My Bookings</h5>
              <br>
              <BookingListElement v-for="booking in bookings" :booking="booking" :key="booking.id" />
              <b-pagination
                class="pagination"
                v-model="currentPage"
                :link-gen="generatePaginationLink"
                :total-rows="numPages"
                align="center"
              ></b-pagination>
            </div>
          </div>
          

          <!-- Inbox -->
          <div class="container-fluid bg-light p-5">
            <div class="card">
              <h5 class="card-header" @click="goToInbox">Inbox</h5>
              <br>
              <NotificationListElement v-for="notification in notifications" :notification="notification" :key="notification.id" />
            </div>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import BookingListElement from '../components/BookingListElement.vue'
import NotificationListElement from '../components/NotificationListElement.vue'
//import axios from 'axios'

const CARDS_PER_PAGINATION = 1

export default {
  name: 'home-view',
  components: {
    BookingListElement,
    NotificationListElement
  },
  data() {
    return {
      // mock data
      numPages: 3,
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
  },
  generatePaginationLink(pageNum) {
    const offset = (pageNum - 1) * CARDS_PER_PAGINATION
    return `${this.$route.path}?offset=${offset}&limit=${CARDS_PER_PAGINATION}`
  },
  goToInbox() {
    console.log('Go to inbox')
    this.$router.push('/inbox')
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

.notification {
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 10px;
  /* Add more styles as needed */
}

.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  /* Add more styles as needed */
}

.bookingsHeader {
  text-align: center;
  margin-top: 10px;
}

.card-header:hover {
  background-color: rgba(0, 0, 0, 0.1); /* Darken the background color on hover */
  cursor: pointer; /* Change cursor to indicate interactivity */
}
</style>