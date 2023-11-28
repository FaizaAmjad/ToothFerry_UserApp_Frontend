<template>
  <div class="container-fluid">
    <b-row class="row">
      <!-- Left Section -->
      <div class="col-md-8">
        <div id="gmap-container">
          <GMapMap
            class="GMapMap"
            :center="{ lat: 51.5072, lng: 0.1276 }"
            :zoom="10" 
            map-type-id="terrain" 
            :options="{
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              streetViewControl: true,
              rotateControl: true,
              fullscreenControl: true
            }"
            />
        </div>
      </div>

      <!-- Right Section -->
      <div class="col-md-4">
        <!-- My Bookings -->
        <div class="bg-light p-5">
          <div class="card">
            <h5 class="bookingsHeader">My Bookings</h5>
            <br>
            <BookingListElement v-for="booking in bookings" :booking="booking" :key="booking.id" @click="showPopup(booking)"/>
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
        <div class="bg-light p-5">
          <div class="card">
            <h5 class="card-header" @click="goToInbox">Inbox</h5>
            <br>
            <NotificationListElement v-for="notification in notifications" :notification="notification" :key="notification.id"/>
            <p :style="{ color: unreadMessages > 0 ? 'red' : 'black' }">
            {{ unreadMessages }} unread messages
            </p>
          </div>
        </div>
      </div>  
    </b-row>
  </div>

  <!-- Popup Container -->
  <div v-if="isPopupVisible" id="popup-container">
    <b-card v-if="isPopupVisible" class="popupCard">
      <h5 class="card-header">{{ popupInfo.type }}</h5>
      <div class="card-body">
        <h5 class="card-title">{{ popupInfo.clinic.name }}</h5>
        <p class="card-sub-title">{{ popupInfo.clinic.location }}</p>
        <p class="card-text">{{ popupInfo.date }}</p>
        <p class="card-text">{{ popupInfo.time }}</p>
        <p class="card-text">{{ popupInfo.comments }}</p>
        <a class="btn btn-primary" @click="cancelBooking">Cancel</a>
      </div>
      <button id="close-button" @click="hidePopup">Close</button>
    </b-card>
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
      unreadMessages: 1,
      isPopupVisible: false,
      popupInfo: {},
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
  methods: {
    generatePaginationLink(pageNum) {
      const offset = (pageNum - 1) * CARDS_PER_PAGINATION
      return `${this.$route.path}?offset=${offset}&limit=${CARDS_PER_PAGINATION}`
    },
    goToInbox() {
      console.log('Go to inbox')
      this.$router.push('/inbox')
    },
    showPopup(booking) {
      this.isPopupVisible = true
      this.popupInfo = booking
      console.log(booking)
    },
    hidePopup() {
      this.isPopupVisible = false
      console.log('Hide popup')
    },
    cancelBooking() {
      console.log('TODO: Cancel booking using api call')
      //we have the _id of the selected booking in this.popupInfo._id  
    }
  },
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

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#gmap-container {
  height: 100%;
  width: 100%;
}

.GMapMap {
  height: 100%;
  width: 100%;
}

#popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

#popup-content {
  background: #fff;
  padding: 20px;
  text-align: center;
}

.popupCard {
  width: 400px;
  height: 400px;
  background: #fff;
  padding: 20px;
  text-align: center;
}
.hidden {
  display: none;
}
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