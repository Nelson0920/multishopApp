import axios from "axios"

const IP_SERVICE_AUTENTICACION = import.meta.env.VITE_IP_SERVICE_AUTH
const IP_SERVICE_SERVICES = import.meta.env.VITE_IP_SERVICE_SERVICES

const instanceUser = axios.create({
  baseURL: `${IP_SERVICE_AUTENTICACION}/api`,
  withCredentials: true
})

const instanceServices = axios.create({
  baseURL: `${IP_SERVICE_SERVICES}/api/two`,
  withCredentials: false
})

export { instanceUser, instanceServices }
