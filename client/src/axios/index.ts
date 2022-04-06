import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { baseUrl, endpoints } from './constants'

interface JwtHeader {
  'x-auth-token'?: string
}

export function getJWTHeader(token: string): JwtHeader {
  return { 'x-auth-token': token }
}

export const cancelTokenSource = axios.CancelToken.source()

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  cancelToken: cancelTokenSource.token
}

export const axiosInstance: AxiosInstance = axios.create(config)

export { endpoints }
