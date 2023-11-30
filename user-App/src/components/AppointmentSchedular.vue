<template>
    <div class="container">
      <!--:key" is here to force the calendar to update to show changes without page reload since no connection to backend-->
      <Qalendar :key="calendarKey" :events="events" :config="config"
         @delete-event="deleteEvent" @edit-event="storeEvent" />
  
    </div>
  </template>
  
  <script>
  import { Qalendar } from "qalendar"
  import '@vuepic/vue-datepicker/dist/main.css'
  export default {
    mounted() {
        this.populateEvents()
    },
    components: {
      Qalendar,
    },
    data() {
      return {
        // Qalendar documentation: https://tomosterlund.github.io/qalendar/guide.html
  
        config: {
          week: {
            startsOn: 'monday',
            nDays: 5,
          },
          month: {
            showTrailingAndLeadingDates: false,
          },
          locale: 'en-US',
          style: {
            fontFamily: 'Arial',
            colorSchemes: {
              lightBlue: {
                color: "#fff",
                backgroundColor: "#66fdff",
              },
              darkBlue: {
                color: "#fff",
                backgroundColor: "#0500ba",
              },
              lightGreen: {
                color: "#fff",
                backgroundColor: "#1fe800",
              },
              red: {
                color: "#fff",
                backgroundColor: "#FF0000",
              }
            }
          },
          defaultMode: 'week',
          isSilent: true,
          showCurrentTime: true,
          dayBoundaries: {
            start: 8,
            end: 18,
          }
        },
        events: [],
        showModal: false,
        newEvent: {
          title: " ",
          with: " ",
          time: { start: " ", end: " " },
          colorScheme: " ",
          isEditable: false,
          id: " ",
          description: " "
        },
        calendarKey: 0,
        newEventTime: {
          startTime: null,
          endTime: null
        }
      }
    },
    methods: {
      updateEditedEvent(updatedEvent) {
  
        const index = this.events.findIndex(event => event.id === updatedEvent.id)
        if (index !== -1) {
          this.events.splice(index, 1, updatedEvent)
          this.calendarKey += 1
        }
  
        // TODO: send updated events back to DB
      },
      populateEvents() {
  
        this.events = [
          {
            title: "Root Canal",
            with: "Jane Doe",
            time: { start: "2023-11-28 12:05", end: "2023-11-28 13:35" },
            colorScheme: "red",
            isEditable: true,
            id: "10f",
            description: "Patient doesn't want their teeth"
          },
          {
            title: "General checkup",
            with: "Jack Sparrow",
            time: { start: "2023-11-29 10:05", end: "2023-11-29 12:35" },
            colorScheme: "darkBlue",
            isEditable: true,
            id: "11f",
            description: "Patient wants more teeth"
          }
        ]
        /*
        ^^^ replace with API call to populate events, possibly with for loop to populate events in the correct format
        // send notification to patient
  
        for (appointment in appointments) {
        title: General type of appointment (Cleaning, root canal, etc.)so appointment.type,
        with: appointment.patient.name,
        time: { start: appointment.startTime, end: appointment.endTime },
        color: "green", <-- possibly dependent on general type of appointment
        isEditable: true,
        id: string of ObjectId of document in Schema?,
        description: appointment.issue
        }
  
        Assumed format 
  
        appointment: {
          type:
          patient: {
            name:
          }
          startTime:
          endTime:
          issue:
        }
        */
      },
      deleteEvent(eventId) {
        const index = this.events.findIndex(event => event.id === eventId)
        if (index !== -1) {
          this.events.splice(index, 1)
          this.calendarKey += 1
        }
        // TODO: send updated events back to DB
        // send notification to patient
      },
      editEvent() {
        const oldEvent = this.newEvent
        this.deleteEvent(oldEvent.id)
        /*
        // not allowing the changing of patient here
        // same id so same document in the DB
        */
  
        const startTime = this.newEventTime.startTime
        const endTime = this.newEventTime.endTime
  
        // store old times to use if not changed
        var formattedStartTime = oldEvent.time.start
        var formattedEndTime = oldEvent.time.end
  
        // format dates if changed
        if (this.newEventTime.startTime !== this.newEvent.time.start) {
          formattedStartTime = this.formatDate(startTime)
        }
  
        if (this.newEventTime.endTime !== this.newEvent.time.end) {
          formattedEndTime = this.formatDate(endTime)
        }
  
        // alert(`Formatted Start Time: ${formattedStartTime}\nFormatted End Time: ${formattedEndTime}`)
  
        // update newEvent with new dates
        this.newEvent.time.start = formattedStartTime
        this.newEvent.time.end = formattedEndTime
        /*
        // saving to DB
        // send notification to patient
        */
        this.events.push(this.newEvent)
        this.newEvent = {
          title: " ",
          with: " ",
          time: { start: " ", end: " " },
          colorScheme: " ",
          isEditable: true,
          id: " ",
          description: " "
        }
        this.calendarKey += 1
      },
      storeEvent(oldEventId) {
        try {
          this.newEventTime.startTime = new Date()
          this.newEventTime.endTime = new Date()
          this.showModal = !this.showModal
          this.newEvent = this.events.find((event) => event.id === oldEventId)
          this.newEventTime.startTime = this.newEvent.time.start
          this.newEventTime.endTime = this.newEvent.time.end
        } catch (err) {
          console.log(err)
        }
  
      },
      changeEventType(type) {
        this.newEvent.title = type;
      },
      changeColorScheme(colorScheme) {
        this.newEvent.colorScheme = colorScheme;
      },
      resetModal() {
        this.newEvent = {
          title: " ",
          with: " ",
          time: { start: " ", end: " " },
          colorScheme: " ",
          isEditable: true,
          id: " ",
          description: " "
        }
        this.newEventTime = {
          start: { date: "", time: "" },
          end: { date: "", time: "" }
        }
      },
      formatDate(date) {
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2)
        const day = (`0${date.getDate()}`).slice(-2)
        const hours = (`0${date.getHours()}`).slice(-2)
        const minutes = (`0${date.getMinutes()}`).slice(-2)
  
        return `${year}-${month}-${day} ${hours}:${minutes}`
      }
    }
  
  }
  </script>
  <style >
  @import "qalendar/dist/style.css";
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    padding: 40px;
}
  </style>
  