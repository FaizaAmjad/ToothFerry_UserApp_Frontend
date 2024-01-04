import { Api } from './api'

export const createUser = async (firstName, lastName, SSN, email, password, theme) => {
  const response = await Api().post('users', {
    firstName: firstName,
    lastName: lastName,
    SSN: SSN,
    email: email,
    password: password,
    theme: theme
  })
  return response.data
}

export const login = async (ssn, email, password) => {
  const response = await Api().post('users/login', {
    SSN: ssn,
    email: email,
    password: password
  })

  return response.data.token
}

export const getUserInfo = async () => {
  const response = await Api().get('me')

  return response.data
}

export const updateUser = async (user_id, firstName, lastName, email, password) => {
  const response = await Api().put(`users/${user_id}`, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  })

  return response.data
}

export const getUserNotifications = async (offset, limit) => {
  // should respond with an array of notifications and the total number of notifications
  const response = await Api().get(`notifications?offset=${offset}&limit=${limit}`)

  return response.data
}

export const deleteUser = async (user_id) => {
  const response = await Api().delete(`users/${user_id}`)
  return response.data
}
