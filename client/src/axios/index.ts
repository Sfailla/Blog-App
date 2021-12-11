import axios, { AxiosRequestConfig } from 'axios'
import { baseUrl } from './constants'

interface JwtHeader {
  Authorization?: string
}

export function getJWTHeader(token: string): JwtHeader {
  return { Authorization: `x-auth-token ${token}` }
}

const config: AxiosRequestConfig = { baseURL: baseUrl }
export const axiosInstance = axios.create(config)
