/* import Vuex from 'vuex'

const state = {
  user: null
}

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => {
      return state.user
    }
  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    }
  },
  mutations: {
    user(state, user) {
      state.user = user
    }
  }
}) */

import Vuex from 'vuex'
import axios from 'axios'

const state = {
  user: null,
  clinics: [],
  dentists: [],
  selectedClinic: null,
  selectedDentist: null,
  slots: [],
  bookedSlots: [],
  clinicDentists: [],
  dentistSlots: []
}

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => state.user,
    clinics: (state) => state.clinics,
    dentists: (state) => state.dentists,
    slots: (state) => state.slots,
    getSelectedClinic: (state) => state.selectedClinic,
    getSelectedDentist: (state) => state.selectedDentist,
    bookedSlots: (state) => state.bookedSlots,
    clinicDentists: (state) => state.clinicDentists,
    dentistSlots: (state) => state.dentistSlots
  },
  actions: {
    user(context, user) {
      context.commit('user', user)
    },

    async fetchClinics({ commit }) {
      try {
        // Make an API request to fetch all clinics information
        const response = await axios.get('clinics')
        const clinics = response.data

        // Update the clinic state
        commit('SET_CLINICS', clinics)
        this.dispatch('fetchDentists')
      } catch (error) {
        console.error('Error fetching clinic information:', error)
      }
    },

    async fetchDentists({ commit }) {
      try {
        // Make an API request to fetch all clinics information
        const response = await axios.get('dentists')
        const dentists = response.data

        // Update the dentist state
        commit('SET_DENTISTS', dentists)
      } catch (error) {
        console.error('Error fetching dentists information:', error)
      }
    },

    async fetchSlots({ commit }) {
      try {
        // Make an API request to fetch slots
        const response = await axios.get('/slots')
        const slots = response.data

        // Update the slots state
        commit('SET_SLOTS', slots)
      } catch (error) {
        console.error('Error fetching slots:', error)
      }
    },

    clinicDentists({ commit }) {
      const clinicDentists = []
      state.dentists.forEach((dentist) => {
        if (dentist.clinic_id === state.selectedClinic._id) {
          clinicDentists.push(dentist)
        }
      })
      commit('SET_CLINIC_DENTISTS', clinicDentists)
    },

    dentistSlots({ commit }) {
      const dentistSlots = []
      state.slots.forEach((slot) => {
        if (slot.dentist_id === state.selectedDentist._id) {
          dentistSlots.push(slot)
        }
      })
      commit('SET_DENTIST_SLOTS', dentistSlots)
    },

    selectClinic({ commit, dispatch }, clinic) {
      commit('SET_SELECTED_CLINIC', clinic)
      dispatch('clinicDentists')
    },

    selectDentist({ commit, dispatch }, dentist) {
      commit('SET_SELECTED_DENTIST', dentist)
      dispatch('dentistSlots')
    },

    updateBookedSlots({ commit }) {
      const booked = []
      this.dispatch('fetchSlots')
      this.dispatch('dentistSlots')
      // Update the bookedSlots state
      state.dentistSlots.forEach((slot) => {
        if (slot.booked) {
          booked.push(slot)
        }
      })
      commit('SET_BOOKED_SLOTS', booked)
    },

    async bookSlot({ dispatch }, { userId, slot_id }) {
      try {
        // Make an API request to book a slot
        await axios.post('slots/' + slot_id + '/book', { userId })
        console.log(`Slot booked: by User ID ${userId}`)
        dispatch('updateBookedSlots')
      } catch (error) {
        console.error('Error booking slot:', error)
      }
    },

    async unBookSlot({ dispatch }, { userId, slot_id }) {
      try {
        // Make an API request to book a slot
        await axios.post('slots/' + slot_id + '/unbook', { userId })
        console.log(`Slot unbooked: by User ID ${userId}`)
        dispatch('updateBookedSlots')
      } catch (error) {
        console.error('Error booking slot:', error)
      }
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
    SET_SLOTS(state, slots) {
      state.slots = slots
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
    }
  }
})

export default store
