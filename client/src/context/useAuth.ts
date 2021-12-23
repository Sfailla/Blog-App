import React, { useEffect } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { axiosInstance } from '../axios'
import { User } from '../../types/shared'
import { FieldValues } from '../../types/forms'
import { endpoints } from '../axios/constants'

export interface UseAuth {
  user: User
  register: (fields: FieldValues) => void
  login: (fields: FieldValues) => void
  loading: boolean
}

export function useAuth(): UseAuth {
  const [user, setUser] = React.useState<User>(null)
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)

  async function register(fields: FieldValues): Promise<void> {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.auth}/register`,
      data: fields,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }

    const response: AxiosResponse = await axiosInstance(request)
    setUser(response.data.user)
    setLoading(false)
  }

  async function login(fields: FieldValues): Promise<void> {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.auth}/login`,
      data: fields,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }

    const response: AxiosResponse = await axiosInstance(request)
    setUser(response.data.user)
    setLoading(false)
  }

  useEffect(() => {
    async function getUserSession(key: string) {
      const cookie = decodeURIComponent(document.cookie)
      console.log({ cookie })
    }
    getUserSession('refreshToken')
  }, [])

  return {
    user,
    register,
    login,
    loading
  }
}
