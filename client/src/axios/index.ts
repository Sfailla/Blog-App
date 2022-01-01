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
  (response: AxiosResponse<any>) => {
    console.log(response)
    return response
  },
  error => {
    // if (error.response.status === 401) {}
    if (error.response.status === 403) {
      return axiosInstance.get(`${endpoints.auth}/refresh-tokens`).then(res => {
        const token: string = res.data.token
        axiosInstance.defaults.headers.common['x-auth-token'] = token
        error.config.headers['x-auth-token'] = token
        return axiosInstance(error.config)
      })
    }
    return Promise.reject(error)
  }
)
