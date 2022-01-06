import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { baseUrl, endpoints } from './constants'

interface JwtHeader {
  'x-auth-token'?: string
}

export function getJWTHeader(token: string): JwtHeader {
  return { 'x-auth-token': token }
}

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
}

export const axiosInstance = axios.create(config)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async error => {
    if (error.response.status === 403) {
      const errorResponse = await axiosInstance.get(`${endpoints.auth}/refresh-tokens`)
      const token: string = errorResponse.data.token
      axiosInstance.defaults.headers.common['x-auth-token'] = token
      error.config.headers['x-auth-token'] = token
      return axiosInstance(error.config)
    }
    return error.response
  }
)
