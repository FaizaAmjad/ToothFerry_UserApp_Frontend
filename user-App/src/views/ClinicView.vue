<template>
    <h1>Welcome to Clinic... {{ clinicObject }}</h1>
    <AppointmentSchedular/>
</template>

<script>
import AppointmentSchedular from '../components/AppointmentSchedular.vue'

export default {
    name: 'clinic-view',
    components: {
        AppointmentSchedular
    },
    computed: {
        clinicObject() {
            return this.$store.getters['getClinicObject'];
        }
    }
}

</script>