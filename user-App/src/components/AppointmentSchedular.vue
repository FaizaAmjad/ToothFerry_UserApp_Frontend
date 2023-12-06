<!-- eslint-disable no-undef -->
<template>
  <div class="appointment-scheduler-container">
    <Datepicker v-model="selectedDate" @input="onDateChange" placeholder="Choose date" />
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

    const highlightedCell = ref({ 
        date: null, 
        time: null 
    });
   

    const generateDateRange = () => {
      const startDate = moment(selectedDate.value).startOf('week');
      const endDate = moment(selectedDate.value).endOf('week');
      const dateRange = [];

      while (startDate.isSameOrBefore(endDate, 'day')) {
        dateRange.push(startDate.format('YYYY-MM-DD'));
        startDate.add(1, 'day');
      }

      return dateRange;
    };

    const dates = computed(() => generateDateRange(selectedDate.value));

    const onDateChange = (newDate) => {
      // update the displayed slots
      selectedDate.value = newDate;
      dates.value = generateDateRange(selectedDate.value);
    };

    return {
      selectedDate,
      timeSlots,
      dates,
      onDateChange,
      highlightedCell,
    
    };
  },

  computed: {
    bookedSlots() {
      // Get booked slots from Vuex store
      return this.$store.getters.bookedSlots;
    }
  },

  methods: {
    formatDateHeading(date) {
      // eslint-disable-next-line no-undef
      return moment(date).format('MMM D, YYYY');
    },
    showEvent(date, time) {
      const isSlotBooked = this.isSlotBooked(date, time);

      if (!isSlotBooked) {
        const user = this.$store.getters.user;

        if (user) {
            var userConfirmed = confirm('Do you want to book this slot?');
            if (userConfirmed) {
                this.$store.dispatch('bookSlot', { date, time, userId: user._id });
                alert('Slot booked!');
            } else {
                alert('Slot not booked.');
            }
        } else {
          alert('User data not available. Please log in.');
        }
      } else {
        alert(`Slot at ${date}, ${time} is already booked.`);
      }
    },
    isSlotBooked(date, time) {
        return this.bookedSlots.some((slot) => slot.date === date && slot.time === time);
    },
    bookSlot(date, time) {
        const user = this.$store.getters.user;
      if (user) {
        this.$store.dispatch('bookSlot', { date, time, userId: user._id });
      }
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
  margin: 60px;
  padding: 40px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
