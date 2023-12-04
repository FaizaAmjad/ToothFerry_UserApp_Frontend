<template>
    <div>
      <table class="schedule-table">
        <thead>
          <tr>
            <th>Time</th>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="timeSlot in timeSlots" :key="timeSlot.time">
            <td>{{ timeSlot.time }}</td>
            <td v-for="day in days" :key="day" @click="showEvent(day, timeSlot.time)">
              {{ getEvent(day, timeSlot.time) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        timeSlots: [
          { time: '9:00 AM', events: {} },
          { time: '10:00 AM', events: {} },
          { time: '11:00 AM', events: {} },
          // Add more time slots as needed
        ],
      };
    },
    methods: {
      showEvent(day, time) {
        const event = this.timeSlots.find(slot => slot.time === time).events[day];
        alert(`Event at ${day}, ${time}: ${event || 'No event'}`);
      },
      getEvent(day, time) {
        return this.timeSlots.find(slot => slot.time === time).events[day] || '';
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
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    cursor: pointer;
  }
  </style>
  