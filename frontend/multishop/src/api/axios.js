import axios from "axios"

// Obtener la IP del servidor desde el archivo .env
const IP_SERVICE = import.meta.env.VITE_IP_SERVICE

// Configurar las instancias de Axios con la IP dinámica
const instanceUser = axios.create({
  baseURL: `http://${IP_SERVICE}:3001/api`,
  withCredentials: true
})

export { instanceUser }
