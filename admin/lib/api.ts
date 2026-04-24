import { env } from "@/config/env.config"
import axios from "axios"
import { auth } from "./firebase"

export const api = axios.create({
  baseURL: env.apiUrl,
})

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("token")

  if (!token && auth.currentUser) {
    token = await auth.currentUser.getIdToken()
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)
