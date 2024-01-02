import { Api } from './api'

export const getNotifications = async () => {
  const response = await Api().get('notifications')

  return response.data
}
