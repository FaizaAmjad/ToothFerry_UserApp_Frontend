import { Api } from './api'

export const getClinics = async () => {
  const response = await Api().get('clinics')

  return response.data
}

export const getDentists = async () => {
  const response = await Api().get('dentists')

  return response.data
}
