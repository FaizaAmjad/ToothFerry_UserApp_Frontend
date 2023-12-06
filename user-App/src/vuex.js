import Vuex from 'vuex';
import axios from 'axios';

const state = {
  user: null,
  clinics: [],
  clinic: null,
  slots: [],
  bookedSlots: [],
};

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => state.user,
    clinics: (state) => state.clinics,
    clinic: (state) => state.clinic,
    slots: (state) => state.slots,
    bookedSlots: (state) => state.bookedSlots,
  },
  actions: {
    setUser(context, user) {
      context.commit('SET_USER', user);
    },

    async fetchClinics({ commit }) {
        try {
          // Make an API request to fetch all clinics information
          const response = await axios.get('clinics');
          const clinics = response.data;
  
          // Update the clinic state
          commit('SET_CLINICs', clinics);
        } catch (error) {
          console.error('Error fetching clinic information:', error);
        }
      },

    async fetchSlots({ commit, state }) {
        try {
          // Make an API request to fetch slots
          const response = await axios.get(state.clinic + '/slots');
          const slots = response.data;
  
          // Update the slots state
          commit('SET_SLOTS', slots);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      },
    
    async updateBookedSlots({ commit }) {
        const booked = []

        // Update the bookedSlots state
        state.slots.forEach(slot => {
            if (slot.booked){
                booked.push(slot)
            }
        });
        commit('SET_BOOKED_SLOTS', booked);
    },

    async bookSlot({ dispatch }, { day, time, userId }) {
      try {
        // Make an API request to book a slot
        await axios.post('slots/:slot_id/book', { day, time, userId });
        console.log(`Slot booked: ${day} ${time} by User ID ${userId}`);
        dispatch('updateBookedSlots');
      } catch (error) {
        console.error('Error booking slot:', error);
      }
    },
  },
  mutations: {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_CLINICS(state, clinics) {
        state.clinics = clinics;
    },
    SET_CLINIC(state, clinic) {
        state.clinic = clinic;
    },
    SET_SLOTS(state, slots) {
        state.slots = slots;
    },
    SET_BOOKED_SLOTS(state, booked) {
        state.bookedSlots = booked;
    },
  },
});

export default store;
