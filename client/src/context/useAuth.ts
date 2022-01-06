import { useState, useEffect } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axios'
import { User } from '../types/shared'
import { FieldValues } from '../types/forms'
import { endpoints } from '../axios/constants'

export interface UseAuth {
  user: User
  register: (fields: FieldValues) => void
  login: (fields: FieldValues) => void
  logout: () => void
  loading: boolean
  error: string
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const isAuthenticated = localStorage.getItem('auth-flag')
  const [error, setError] = useState<string>('')

  const navigate = useNavigate()

  async function register(fields: FieldValues): Promise<void> {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.auth}/register`,
      data: fields,
      method: 'POST'
    }

    const response: AxiosResponse = await axiosInstance(request)
    setUser(response.data.user)
    localStorage.setItem('auth-flag', response.data.user.id)
    navigate('/')
    setLoading(false)
  }

  async function login(fields: FieldValues): Promise<void> {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.auth}/login`,
      data: fields,
      method: 'POST'
    }
    const response: AxiosResponse = await axiosInstance(request)
    if (response.data?.error) {
      setError(response.data.error.message)
      setLoading(false)
    } else {
      setUser(response.data.user)
      localStorage.setItem('auth-flag', response.data.user.id)
      navigate('/')
      setLoading(false)
    }
  }

  async function logout(): Promise<void> {
    setLoading(true)
    const request: AxiosRequestConfig = {
      url: `${endpoints.auth}/logout`,
      method: 'GET'
    }

    await axiosInstance(request)
    setUser(null)
    localStorage.removeItem('auth-flag')
    setLoading(false)
  }

  useEffect(() => {
    async function checkUserSession() {
      setLoading(true)
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/refresh-tokens`,
        method: 'GET'
      }
      const response: AxiosResponse = await axiosInstance(request)
      setUser(response.data.user)
      setLoading(false)
    }
    if (isAuthenticated) {
      checkUserSession()
    }
  }, [isAuthenticated])

  return {
    user,
    register,
    login,
    logout,
    loading,
    error
  }
}
