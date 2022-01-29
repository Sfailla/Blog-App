import { useState, useEffect, useRef } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axios'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TryCatchError, User } from '../types/shared'
import { FieldValues } from '../types/forms'
import { endpoints } from '../axios/constants'
import { useLocation } from 'react-router-dom'

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
  const initialRender = useRef<boolean>(true)

  const navigate = useNavigate()
  const location = useLocation()

  async function register(fields: FieldValues): Promise<void> {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/register`,
        data: fields,
        method: 'POST'
      }

      const response: AxiosResponse = await axiosInstance(request)
      if (response.data?.error) {
        setError(response.data.error.message)
      } else {
        setUser(response.data.user)
        localStorage.setItem('auth-flag', response.data.user.id)
        navigate('/')
      }
    } catch (error: TryCatchError) {
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  async function login(fields: FieldValues): Promise<void> {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/login`,
        data: fields,
        method: 'POST'
      }
      const response: AxiosResponse = await axiosInstance(request)
      if (response.data.error) {
        setError(response.data.error.message)
      } else {
        setUser(response.data.user)
        localStorage.setItem('auth-flag', response.data.user.id)
        navigate('/')
      }
    } catch (error: TryCatchError) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function logout(): Promise<void> {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/logout`,
        method: 'GET'
      }

      const response: AxiosResponse = await axiosInstance(request)
      if (response.data?.error) {
        setError(response.data.error.message)
      } else {
        setUser(null)
        localStorage.removeItem('auth-flag')
        setLoading(false)
      }
    } catch (error: TryCatchError) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function checkUserSession(): Promise<void> {
      setLoading(true)
      try {
        const request: AxiosRequestConfig = {
          url: `${endpoints.auth}/refresh-tokens`,
          method: 'GET'
        }
        const response: AxiosResponse = await axiosInstance(request)
        setUser(response.data.user)
        setLoading(false)
      } catch (error: TryCatchError) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    if (isAuthenticated) {
      checkUserSession()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      setError('')
    }
  }, [location])

  return {
    user,
    register,
    login,
    logout,
    loading,
    error
  }
}
