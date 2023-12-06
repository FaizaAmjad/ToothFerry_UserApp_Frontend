<template>
    <h1>Welcome to "Clinic Name" {{ Clinic }}</h1>
    <AppointmentSchedular/>
</template>

<script>
import { mapSate } from 'vuex';
import AppointmentSchedular from '../components/AppointmentSchedular.vue'

export default {
    name: 'clinic-view',
    components: {
        AppointmentSchedular
    },
    computed: {
        ...mapSate(['clinic'])
    }
}

</script>