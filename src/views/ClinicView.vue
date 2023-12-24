<template>
  <div>
    <h1 v-if="clinic">Welcome to {{ clinic.clinicName }}</h1>
    <p></p>
    <AppointmentSchedular />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppointmentSchedular from '../components/AppointmentSchedular.vue'

export default {
  name: 'clinic-view',
  components: {
    AppointmentSchedular
  },
  setup() {
    const store = useStore()
    const clinic = ref(null)

    onMounted(() => {
      clinic.value = store.getters.getSelectedClinic
    })

    return {
      clinic
    }
  }
}
</script>
