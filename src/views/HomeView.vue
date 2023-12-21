<template>
  <head
    meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDQlD3-cmPiepBAeHB4NYXdN12HIyCjhl4&libraries=places&v=3.exp"
    async
    defer
  ></head>
  <div class="container-fluid">
    <b-row class="row">
      <!-- Left Section -->
      <div class="col-md-8">
        <div class="col-md-4" id="search">
          <!-- TODO: doesn't look the greatest but actual functionalities are more important -->
          <button type="searchButton" class="btn btn-primary" @click="Search()">Search</button>
          <input
            type="input"
            v-model="searchInput"
            class="form-input"
            id="SearchInput"
            placeholder="Clinic Name"
          />
        </div>
        <div id="gmap-container">
          <GMapMap
            ref="map"
            class="GMapMap"
            :center="{ lat: 57.7089, lng: 11.9746 }"
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
          >
            <!-- Use v-for to loop through markers and create GMapMarker components -->
            <GMapMarker
              v-for="marker in markers"
              :key="marker.id"
              :ref="marker.id"
              :position="marker.position"
              :clickable="true"
              :draggable="true"
              @click="onMarkerClicked(marker)"
            />
            <GMapInfoWindow
              v-if="isInfoWindowVisible"
              :position="infoWindowPosition"
              :options="infoWindowOptions"
              ref="infoWindow"
            >
              <!-- Your InfoWindow content goes here -->
              <div>
                <h3>{{ infoWindowTitle }}</h3>
                <p>
                  Click <router-link :to="infoWindowLink"> here</router-link> for the schedule.
                  {{ infoWindowContent }}
                </p>
              </div>
            </GMapInfoWindow>
          </GMapMap>
        </div>
      </div>

      <!-- Right Section -->
      <div class="col-md-4">
        <!-- My Bookings -->
        <div class="bg-light p-5">
          <div class="card">
            <h5 class="bookingsHeader">My Bookings</h5>
            <br />
            <BookingListElement
              v-for="booking in bookings"
              :booking="booking"
              :key="booking.id"
              @click="showPopup(booking)"
            />
            <b-pagination
              class="pagination"
              v-model="currentPage"
              :link-gen="generatePaginationLink"
              :total-rows="numPages"
              :align="center"
            ></b-pagination>
          </div>
        </div>

        <!-- Inbox -->
        <div class="bg-light p-5">
          <div class="card">
            <h5 class="card-header" @click="goToInbox">Inbox</h5>
            <br />
            <NotificationListElement
              v-for="notification in notifications"
              :notification="notification"
              :key="notification.id"
            />
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
      markers: [
        {
          id: 1,
          position: { lat: 51.5072, lng: 0.1276 },
          clinicName: 'City Hospital',
          about: 'This is the about section for City Hospital'
        }

        // Add more markers with clinic information
      ],
      numPages: 3,
      unreadMessages: 1,
      isPopupVisible: false,
      isInfoWindowVisible: false,
      infoWindowPosition: { lat: 51.5072, lng: 0.1276 },
      infoWindowOptions: { pixelOffset: { width: 0, height: -30 } },
      infoWindowTitle: 'InfoWindow Title',
      infoWindowContent: 'InfoWindow Content',
      infoWindowLink: '',
      searchInput: '',
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
        }
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
        }
        // Add more mock notifications as needed
      ]
    }
  },
  methods: {
    generatePaginationLink(pageNum) {
      const offset = (pageNum - 1) * CARDS_PER_PAGINATION
      return `${this.$route.path}?offset=${offset}&limit=${CARDS_PER_PAGINATION}`
    },
    Search() {
      try {
        console.log('Trying to search for ' + this.searchInput)
        const foundMarker = this.markers.find((marker) => marker.clinicName === this.searchInput)

        if (foundMarker) {
          this.onMarkerClicked(foundMarker)
        } else {
          console.log('No marker found')
        }
      } catch (error) {
        console.log(error)
      }
    },
    onMarkerClicked(marker) {
      console.log('Marker clicked ')
      this.$store.dispatch('selectClinic', marker)
      this.$refs.map.panTo(marker.position)

      // Set the position and content for the InfoWindow
      //TODO: Change the content to the clinic information
      this.infoWindowPosition = marker.position
      this.infoWindowTitle = `${marker.clinicName}`
      this.infoWindowContent = `${marker.about}`
      this.infoWindowLink = `/schedule/${marker.id}`

      // Open the InfoWindow
      this.isInfoWindowVisible = true
      this.$router.push({ path: '/clinic' })
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
body,
html {
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
button.page-link {
  z-index: 0 !important;
}
</style>
