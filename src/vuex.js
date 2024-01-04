import Vuex from 'vuex'
import { getClinics, getDentists } from './apis/clinic'
import { getSlots, book, unBook } from './apis/booking'
import { getNotifications } from './apis/notification'

const state = {
  user: null,
  clinics: [],
  dentists: [],
  selectedClinic: null,
  selectedDentist: null,
  notifications: [],
  bookedSlots: [],
  clinicDentists: [],
  dentistSlots: [],
  errorMessage: null
}

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => state.user,
    clinics: (state) => state.clinics,
    dentists: (state) => state.dentists,
    notifications: (state) => state.notifications,
    getSelectedClinic: (state) => state.selectedClinic,
    getSelectedDentist: (state) => state.selectedDentist,
    bookedSlots: (state) => state.bookedSlots,
    clinicDentists: (state) => state.clinicDentists,
    dentistSlots: (state) => state.dentistSlots,
    errorMessage: (state) => state.errorMessage
  },
  actions: {
    user({ commit }, user) {
      commit('SET_USER', user)
    },

    async fetchClinics({ commit }) {
      try {
        // Make an API request to fetch all clinics information
        const clinics = await getClinics()
        // Update the clinic state
        commit('SET_CLINICS', clinics)
        //dispatch('fetchDentists')
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.'
        if (error.response) {
          if (error.response.status === 500) {
            errorMessage = 'Server error in getting clinics. Please try again later.'
          } else {
            errorMessage = 'An error occurred during fetching clinics. Please try again.'
          }
        }
        commit('SET_ERROR', errorMessage)
        console.log('Error message committed to store:', errorMessage)
      }
    },

    async fetchDentists({ commit, dispatch }) {
      try {
        // Make an API request to fetch all clinics information
        const dentists = await getDentists()
        // Update the dentist state
        commit('SET_DENTISTS', dentists)
        dispatch('fetchSlots')
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.'
        if (error.response) {
          console.log('Error status code:', error.response.status)
          if (error.response.status === 500) {
            errorMessage = 'Server error in getting dentists.'
          } else {
            errorMessage = 'An error occurred during fetching dentists.'
          }
        }
        commit('SET_ERROR', errorMessage)
      }
    },

    async fetchSlots({ commit }) {
      try {
        // Make an API request to fetch notifications
        const notifications = await getSlots()
        // Update the notifications state
        commit('SET_SLOTS', notifications)
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.'
        if (error.response) {
          if (error.response.status === 500) {
            errorMessage = 'Server error in getting notifications.'
          } else {
            errorMessage = 'An error occurred during fetching notifications.'
          }
        }
        commit('SET_ERROR', errorMessage)
      }
    },

    selectClinic({ commit, dispatch }, clinic) {
      console.log('selected clinic ' + clinic.clinicName)
      commit('SET_SELECTED_CLINIC', clinic)
      dispatch('clinicDentists')
    },

    clinicDentists({ commit, state }) {
      if (!state.selectedClinic) {
        console.log('selected clinic not set yet. ')
        return
      }

      const clinicDentists = state.dentists.filter(
        (dentist) => dentist.clinic_id === state.selectedClinic.id
      )
      commit('SET_CLINIC_DENTISTS', clinicDentists)
    },

    selectDentist({ commit, dispatch, state }, dentistId) {
      const selectedDentist = state.clinicDentists.find((d) => d._id === dentistId)
      if (selectedDentist) {
        commit('SET_SELECTED_DENTIST', selectedDentist)
        dispatch('dentistSlots')
      } else {
        console.error('Dentist not found with id:', dentistId)
      }
    },

    dentistSlots({ commit, dispatch, state }) {
      const dentistSlots = state.notifications.filter(
        (slot) => slot.dentist_id === state.selectedDentist._id
      )
      commit('SET_DENTIST_SLOTS', dentistSlots)
      dispatch('bookedSlots')
    },

    bookedSlots({ commit, state }) {
      const booked = []
      // get bookedSlots
      state.dentistSlots.forEach((slot) => {
        if (slot.booked) {
          booked.push(slot)
        }
      })
      commit('SET_BOOKED_SLOTS', booked)
    },

    updateBookedSlots({ dispatch }) {
      dispatch('fetchSlots')
      dispatch('dentistSlots')
    },

    async bookSlot({ commit, dispatch }, { slotId, userId }) {
      try {
        await book(slotId, userId)
        console.log(`Slot booked: by User ID ${userId}`)
        dispatch('updateBookedSlots')
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.'
        if (error.response) {
          console.log('Error status code:', error.response.status)
          if (error.response.status === 500) {
            errorMessage = 'Server error in booking slot.'
          } else {
            errorMessage = 'An error occurred during booking slot.'
          }
        }
        commit('SET_ERROR', errorMessage)
      }
    },

    async unBookSlot({ commit, dispatch, state }, slot_id) {
      try {
        // Make an API request to unbook a slot
        await unBook(slot_id)
        console.log(`Slot unbooked: by User ID: ` + state.user.id)
        dispatch('updateBookedSlots')
      } catch (error) {
        console.error('Error unbooking slot', error)
        let errorMessage = 'An unexpected error occurred.'
        if (error.response) {
          console.log('Error status code:', error.response.status)
          if (error.response.status === 500) {
            errorMessage = 'Server error in unbooking slot.'
          } else {
            errorMessage = 'An error occurred during unbooking slot.'
          }
        }
        commit('SET_ERROR', errorMessage)
      }
    },

    errorMessage({ commit }, errorMessage) {
      commit('SET_ERROR', errorMessage)
    },

    async getNotifications({ commit }) {
      try {
        // Make an API request to fetch notifications
        const notifications = await getNotifications()
        // Update the notifications state
        commit('SET_NOTIFICATIONS', notifications)
      } catch (error) {
        let errorMessage = 'An unexpected error occurred.'
        if (error.response) {
          if (error.response.status === 500) {
            errorMessage = 'Server error in getting notifications.'
          } else {
            errorMessage = 'An error occurred during fetching notifications.'
          }
        }
        commit('SET_ERROR', errorMessage)
      }
    },

    addNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION', notification)
    },
    removeNotification({ commit }, index) {
      commit('REMOVE_NOTIFICATION', index)
    }
  },
  mutations: {
    user(state, user) {
      state.user = user
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_CLINICS(state, clinics) {
      state.clinics = clinics
    },
    SET_DENTISTS(state, dentists) {
      state.dentists = dentists
    },
    SET_SLOTS(state, notifications) {
      state.notifications = notifications
    },
    SET_SELECTED_CLINIC(state, clinic) {
      state.selectedClinic = clinic
    },
    SET_SELECTED_DENTIST(state, dentist) {
      state.selectedDentist = dentist
    },
    SET_CLINIC_DENTISTS(state, clinicDentists) {
      state.clinicDentists = clinicDentists
    },
    SET_DENTIST_SLOTS(state, dentistSlots) {
      state.dentistSlots = dentistSlots
    },
    SET_BOOKED_SLOTS(state, booked) {
      state.bookedSlots = booked
    },
    SET_ERROR(state, errorMessage) {
      console.log('Setting error message:', errorMessage)
      state.errorMessage = errorMessage
    },
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification)
    },
    REMOVE_NOTIFICATION(state, index) {
      state.notifications.splice(index, 1)
    }
  }
})

export default store
