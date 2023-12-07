import Vuex from 'vuex';
import axios from 'axios';

const state = {
  user: null,
  clinics: [],
  clinicObject: null,
  slots: [],
  bookedSlots: [],
  clinicSlots: []
};

const store = new Vuex.Store({
  state,
  getters: {
    user: (state) => state.user,
    clinics: (state) => state.clinics,
    getClinicObject: state => state.clinicObject,
    slots: (state) => state.slots,
    bookedSlots: (state) => state.bookedSlots,
    clinicSlots: (state) => state.clinicSlots,
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

    async fetchSlots({ commit }) {
        try {
          // Make an API request to fetch slots
          const response = await axios.get('/slots');
          const slots = response.data;
  
          // Update the slots state
          commit('SET_SLOTS', slots);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      },
    
    ClinicSlots({ commit }) {
        const clinicSlots = []
        state.slots.forEach(slot => {
          if (slot.clinicName === state.clinicObject.clinicName){
            clinicSlots.push(slot)
          }
        })
        commit('SET_CLINIC_SLOTS', clinicSlots)
    },
    
    updateBookedSlots({ commit }) {
        const booked = []

        // Update the bookedSlots state
        state.slots.forEach(slot => {
            if (slot.booked){
                booked.push(slot)
            }
        });
        commit('SET_BOOKED_SLOTS', booked);
    },

    async bookSlot({ dispatch }, {userId, slot_id}) {
      try {
        // Make an API request to book a slot
        await axios.post('slots/' + slot_id + '/book', {userId });
        console.log(`Slot booked: by User ID ${userId}`);
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
    SET_CLINIC_Object(state, clinicObject) {
        state.clinicObject = clinicObject;
    },
    SET_SLOTS(state, slots) {
        state.slots = slots;
    },
    SET_BOOKED_SLOTS(state, booked) {
        state.bookedSlots = booked;
    },
    SET_CLINIC_SLOTS(state, clinicSlots) {
      state.clinicSlots = clinicSlots
    }
  },
});

export default store;
