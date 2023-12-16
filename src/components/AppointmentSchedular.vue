<!-- eslint-disable no-undef -->
<template>
    <div>
      <h6>Choose a dentist to see schedule.</h6>
      <select v-model="selectedDentist" @change="onDentistChange">
        <option v-for="dentist in dentists" :key="dentist.id" :value="dentist.id">
          {{ dentist.name }}
        </option>
      </select>
      <br/>
    <div class="appointment-scheduler-container">
      <Datepicker v-model="selectedDate" @input="onDateChange" placeholder="Choose date" />
      <br/>
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th v-for="date in dates" :key="date">{{ formatDateHeading(date) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="timeSlot in timeSlots" :key="timeSlot.time">
            <td>{{ timeSlot.time }}</td>
            <td
              v-for="date in dates"
              :key="date"
              @click="showEvent(date, timeSlot.time)"
              @mouseenter="highlightCell(date, timeSlot.time, true)"
              @mouseleave="highlightCell(date, timeSlot.time, false)"
              :style="{ backgroundColor: getBackgroundColor(date, timeSlot.time) }"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  import Datepicker from 'vue3-datepicker'
  import moment from 'moment'
  
  export default {
    components: {
      Datepicker
    },
    setup() {
      const selectedDate = ref(new Date ());
      const timeSlots = ref([
        { time: '08:00' },
        { time: '09:00' },
        { time: '10:00' },
        { time: '11:00' },
        { time: '12:00' },
        { time: '13:00' },
        { time: '14:00' },
        { time: '15:00' },
        { time: '16:00' },
        { time: '17:00' },
      ]);
      const slots = ref([]);
      const bookedSlots = ref([]);
  
      const generateDateRange = () => {
        const startDate = moment(selectedDate.value).startOf('week');
        const endDate = moment(selectedDate.value).endOf('week');
        const dateRange = [];
  
        while (startDate.isSameOrBefore(endDate, 'day')) {
          if (startDate.day() !== 6 && startDate.day() !== 0) {
            dateRange.push(startDate.format('YYYY-MM-DD'));
          }
          startDate.add(1, 'day');
        }
  
        return dateRange;
      };
  
      const dates = computed(() => generateDateRange(selectedDate.value));
  
      const selectedDentist = ref(null);
  
      /*const dentists = computed(() => {
        return this.$store.getters.clinicDentists || [];
      });*/
  
      const dentists = ref([
        { id: 1, name: 'Dentist 1' },
        { id: 2, name: 'Dentist 2' },
        // ... add more dentists as needed ...
      ]);
  
      const onDentistChange = async () => {
      
      if (selectedDentist.value) {
        await this.$store.dispatch('selectDentist', selectedDentist.value);
        await this.$store.dispatch('dentistSlots');
        this.slots = this.$store.getters.dentistSlots || [];
        this.bookedSlots = this.$store.getters.bookedSlots || [];
      }
    };
  
      const highlightedCell = ref({ 
          date: null, 
          time: null 
      });
  
  
      const onDateChange = (newDate) => {
        // update the displayed slots
        selectedDate.value = newDate;
        dates.value = generateDateRange(selectedDate.value);
      };
  
      return {
        selectedDate,
        timeSlots,
        slots,
        bookedSlots,
        dates,
        onDateChange,
        highlightedCell,
        selectedDentist,
        dentists,
        onDentistChange,
      
      };
    },
  
    methods: {
      formatDateHeading(date) {
        // eslint-disable-next-line no-undef
        return moment(date).format('MMM D, YYYY');
      },
      showEvent(date, time) {
        const isSlotBooked = this.isSlotBooked(date, time);
        if(this.selectedDentist){
          if (!isSlotBooked ) {
            const user = this.$store.getters.user;
            if (user) {
                var userConfirmed = confirm('Do you want to book this slot?');
                if (userConfirmed) {
                    this.$store.dispatch('bookSlot', { date, time, userId: user._id, slotId: this.getSlotID(date, time)});
                    alert('Slot booked!');
                } else {
                    alert('Slot not booked.');
                }
            } else {
              alert('User data not available. Please log in.');
            }
          } else {
            alert(`Slot at ${date}, ${time} is currently unavailable.`);
          }
        } else {
          alert(`Please select a dentist.`);
        }
      },
      isSlotBooked(date, time) {
          return this.bookedSlots.some((slot) => slot.date === date && slot.time === time);
      },
      bookSlot(date, time) {
          const user = this.$store.getters.user;
        if (user) {
          const slot_id = this.getSlotID(date, time)
          if(slot_id) {
            this.$store.dispatch('bookSlot', {userId: user._id, slot_id});
          }
        }
      },
      unBookSlot(date, time) {
          const user = this.$store.getters.user;
        if (user) {
          const slot_id = this.getSlotID(date, time)
          if(slot_id) {
            this.$store.dispatch('unBookSlot', {userId: user._id, slot_id});
          }
        }
      },
      getSlotID(date, time) {
        const combineDateTime = new Date(date + 'T' + time) ;
        const slot = this.slots.find(s => s.date === combineDateTime);
        return slot ? slot._id : null;
      },
      highlightCell(date, time, isHovered) {
          this.highlightedCell = isHovered ? { date, time } : { date: null, time: null };
      },
      getBackgroundColor(date, time) {
        return this.isSlotBooked(date, time) ? '#df2050' : '#80a659';
      },
    },
  };
  </script>
  
  
  <style scoped>
  .schedule-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .schedule-table th,
  .schedule-table td {
    border: 2px solid #ccc;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .schedule-table td:hover {
    background-color: #f2f2f2;
  }
  .appointment-scheduler-container {
    max-width: 800px;
    margin: 60px auto;
    padding: 40px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  </style>
  