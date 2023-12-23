<template>
  <div id="gmap-container">
    <GMapMap
      ref="map"
      class="GMapMap"
      :center="center"
      :zoom="zoom"
      map-type-id="terrain"
      :options="mapOptions"
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
        @mouseover="onMarkerMouseOver(marker)"
        @mouseout="onMarkerMouseOut"
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
</template>

<script>
export default {
  props: {
    markers: Array,
    center: Object,
    zoom: Number,
    mapOptions: Object
  },
  data() {
    return {
      isInfoWindowVisible: false,
      infoWindowPosition: {},
      infoWindowOptions: {},
      infoWindowTitle: '',
      infoWindowContent: '',
      infoWindowLink: '',
      hoveredMarker: null
    }
  },
  methods: {
    onMarkerClicked(marker) {
      console.log('Marker clicked ')
      this.$store.dispatch('selectClinic', marker)
      this.$refs.map.panTo(marker.position)
      this.$router.push({ path: '/clinic' })
    },
    onMarkerMouseOver(marker) {
      this.hoveredMarker = marker
      this.showInfoWindow(marker)
    },
    onMarkerMouseOut() {
      this.hoveredMarker = null
      this.hideInfoWindow()
    },
    showInfoWindow(marker) {
      // Set the position and content for the InfoWindow based on the hovered marker
      this.infoWindowPosition = marker.position
      this.infoWindowTitle = `${marker.clinicName}`

      // Open the InfoWindow
      this.isInfoWindowVisible = true
    },
    hideInfoWindow() {
      // Close the InfoWindow
      this.isInfoWindowVisible = false
    }
  }
}
</script>

<style scoped>
/* Map component styles */
#gmap-container {
  height: 100%;
  width: 100%;
}

.GMapMap {
  height: 100%;
  width: 100%;
}
</style>
