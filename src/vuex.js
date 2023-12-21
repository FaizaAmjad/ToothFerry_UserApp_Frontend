import Vuex from 'vuex'
import { getClinics, getDentists } from './apis/clinic'
import { getSlots, book, unBook } from './apis/booking'

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
    user({ commit }, user) {
      commit('SET_USER', user)
    },

    async fetchClinics({ commit, dispatch }) {
      try {
        // Make an API request to fetch all clinics information
        const clinics = await getClinics()

        // Update the clinic state
        commit('SET_CLINICS', clinics)
        dispatch('fetchDentists')
      } catch (error) {
        console.error('Error fetching clinic information:', error)
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
        console.error('Error fetching dentists information:', error)
      }
    },

    async fetchSlots({ commit }) {
      try {
        // Make an API request to fetch slots
        const slots = await getSlots()

        // Update the slots state
        commit('SET_SLOTS', slots)
      } catch (error) {
        console.error('Error fetching slots:', error)
      }
    },

    selectClinic({ commit, dispatch }, clinic) {
      commit('SET_SELECTED_CLINIC', clinic)
      dispatch('clinicDentists')
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

    selectDentist({ commit, dispatch }, dentist) {
      commit('SET_SELECTED_DENTIST', dentist)
      dispatch('dentistSlots')
    },

    dentistSlots({ commit, dispatch }) {
      const dentistSlots = []
      state.slots.forEach((slot) => {
        if (slot.dentist_id === state.selectedDentist._id) {
          dentistSlots.push(slot)
        }
      })
      commit('SET_DENTIST_SLOTS', dentistSlots)
      dispatch('bookedSlots')
    },

    bookedSlots({ commit }) {
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

    async bookSlot({ dispatch }, { userId, slot_id }) {
      try {
        // Make an API request to book a slot
        await book(slot_id, userId)
        console.log(`Slot booked: by User ID ${userId}`)
        dispatch('updateBookedSlots')
      } catch (error) {
        console.error('Error booking slot:', error)
      }
    },

    async unBookSlot({ dispatch }, { userId, slot_id }) {
      try {
        // Make an API request to unbook a slot
        await unBook(slot_id)
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
