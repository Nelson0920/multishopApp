import { instanceUser } from './axios'

export const loginRequest = (user) => instanceUser.post(`/auth/login`, user)

export const verifyTokenRequest = () => instanceUser.get(`/auth/verify`)
