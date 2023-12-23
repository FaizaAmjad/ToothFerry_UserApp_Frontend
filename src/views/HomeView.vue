<template>
  <div class="container-fluid">
    <b-row class="row">
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      <!-- Left Section -->
      <b-col md="8">
        <div id="search">
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
      </b-col>
      <b-col md="8">
        <!-- Map component -->
        <MapComponent
          :markers="markers"
          :center="userPosition"
          :zoom="12"
          :mapOptions="{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true
          }"
          :isInfoWindowVisible="isInfoWindowVisible"
          :infoWindowPosition="infoWindowPosition"
          :infoWindowOptions="infoWindowOptions"
          :infoWindowTitle="infoWindowTitle"
          :infoWindowContent="infoWindowContent"
          :infoWindowLink="infoWindowLink"
        />
      </b-col>
      <!-- Right Section -->
      <b-col md="4">
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
      </b-col>
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
import MapComponent from '@/components/MapComponent.vue'
import BookingListElement from '../components/BookingListElement.vue'
import NotificationListElement from '../components/NotificationListElement.vue'

const CARDS_PER_PAGINATION = 1

export default {
  name: 'home-view',
  components: {
    MapComponent,
    BookingListElement,
    NotificationListElement
  },
  computed: {
    error() {
      return this.$store.state.error
    }
  },
  created() {
    this.$store.commit('SET_ERROR', null)
  },
  unmounted() {
    this.$store.commit('SET_ERROR', null)
  },
  mounted() {
    try {
      this.$store.dispatch('fetchClinics').then(() => {
        // Try to get the user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Successfully obtained the user's current position
              const latitude = position.coords.latitude
              const longitude = position.coords.longitude

              console.log('user position: Latitude:', latitude)
              console.log('user position: Longitude:', longitude)

              if (!isNaN(latitude) && !isNaN(longitude)) {
                this.userPosition = { lat: latitude, lng: longitude }
                this.setMapCenter(this.userPosition)
                this.markers = this.computeMarkers(this.userPosition)
                this.markers.forEach((marker) => {
                  console.log('List of markers: ' + marker.position)
                })
              } else {
                console.error('Invalid geolocation data:', position)
                this.useDefaultPosition()
              }
            },
            (error) => {
              console.error('Error getting user location:', error)
              this.useDefaultPosition()
            }
          )
        } else {
          // Geolocation is not supported by the browser
          console.error('Geolocation is not supported by your browser.')
          this.useDefaultPosition()
        }
      })
    } catch (error) {
      console.error('Error in mounted hook:', error)
    }
  },
  data() {
    return {
      userPosition: {},
      markers: [],
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
    useDefaultPosition() {
      const defaultPosition = { lat: 51.5072, lng: 0.1276 }
      this.userPosition = defaultPosition
      this.setMapCenter(defaultPosition)
      this.markers = this.computeMarkers()
    },
    setMapCenter(position) {
      this.infoWindowPosition = position
      if (this.$refs.map) {
        this.$refs.map.panTo(position)
      }
    },
    computeMarkers(userPosition) {
      const clinics = this.$store.getters.clinics || []
      const markers = clinics.map((clinic) => {
        return {
          id: clinic._id,
          position: { lat: clinic.position.lat, lng: clinic.position.lng },
          clinicName: clinic.clinicName,
          distance: this.calculateDistance(userPosition, {
            lat: clinic.position.lat,
            lng: clinic.position.lng
          })
        }
      })

      // Sort the markers by distance (nearest first)
      markers.sort((a, b) => a.distance - b.distance)

      return markers
    },
    calculateDistance(pos1, pos2) {
      // Implement a function to calculate the distance between two positions
      // You can use the Haversine formula or any other suitable method
      // Here's a simple example using Haversine formula:
      const R = 6371 // Radius of the Earth in kilometers
      const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180)
      const dLon = (pos2.lng - pos1.lng) * (Math.PI / 180)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(pos1.lat * (Math.PI / 180)) *
          Math.cos(pos2.lat * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c
      return distance
    },
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
