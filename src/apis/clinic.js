import { Api } from './api'

export const getClinics = async () => {
  const response = await Api().get('clinics')

  return response.data
}

export const getClinicDentists = async (clinic_id) => {
  const response = await Api().get(`dentists/clinic/${clinic_id}`)

  return response.data
}
