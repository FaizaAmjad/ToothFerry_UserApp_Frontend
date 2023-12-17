<template>
    <h1>Welcome to Clinic  </h1>
    <p></p>
    <AppointmentSchedular/>
</template>

<script>
//import { ref, computed } from 'vue';
import AppointmentSchedular from '../components/AppointmentSchedular.vue';

export default {
  name: 'clinic-view',
  components: {
    AppointmentSchedular,
  },
  /*setup() {
    const clinic = ref(null);

    const formattedClinic = computed(() => {
      return clinic.value ? {
        name: clinic.value.name,
        address: clinic.value.address,
      } : null;
    });

    clinic.value = this.$store.getters.getSelectedClinic;

    return {
      clinic: formattedClinic,
    };
  },*/
};
</script>