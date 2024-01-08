import { Api } from './api'

export const getDentistSlots = async (dentist_id) => {
  const response = await Api().get(`slots/dentist/${dentist_id}`)

  return response.data
}

export const getUserBookings = async () => {
  const response = await Api().get('slots?offset=0&limit=3')

  return response.data
}

export const getSlot = async (slot_id) => {
  const response = await Api().get(`slots/${slot_id}`)

  return response.data
}

export const book = async (slot_id, userId) => {
  const response = await Api().post(`slots/${slot_id}/book`, { userId, booked: true })

  return response.data
}

export const unBook = async (slot_id) => {
  const response = await Api().post(`slots/${slot_id}/unbook`, { userId: null, booked: false })

  return response.data
}
