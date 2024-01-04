import { Api } from './api'

export const getNotifications = async () => {
  const response = await Api().get('notification')

  return response.data
}
