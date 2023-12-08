import { Api } from './api'

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
