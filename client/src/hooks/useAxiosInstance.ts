import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { axiosInstance, endpoints } from '../axios'

export default function useAxiosInstance() {
  const [accessToken, setAccessToken] = useState<string>('')

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (config.headers && !config.headers['x-auth-token']) {
          config.headers['x-auth-token'] = accessToken
        }

        return config
      },
      error => Promise.reject(error)
    )

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async error => {
        const prevRequest = error.config
        if (error.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true
          const errorResponse = await axiosInstance.get(`${endpoints.auth}/refresh-tokens`)
          const token: string = errorResponse.data.token
          setAccessToken(token)
          prevRequest.headers['x-auth-token'] = token
          return axiosInstance(prevRequest)
        }
        return error.response
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [accessToken])

  return axiosInstance
}
