import { Api } from './api'

export const getUserNotifications = async (offset, limit) => {
  // should respond with an array of notifications and the total number of notifications
  const response = await Api().get(`notification?offset=${offset}&limit=${limit}`)

  return response.data
}import { Api } from './api'

export const getNotifications = async () => {
  const response = await Api().get('notifications')

  return response.data
}
