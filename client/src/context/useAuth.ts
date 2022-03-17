import { useState, useEffect, useRef, useCallback } from 'react'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAxiosInstance } from '../hooks'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TryCatchError, User, Profile } from '../types/shared'
import { FieldValues } from '../types/forms'
import { endpoints } from '../axios/constants'
import { useLocation } from 'react-router-dom'

export interface UseAuth {
  user: User | null
  profile: Profile | null
  register: (fields: FieldValues) => void
  login: (fields: FieldValues) => void
  logout: () => void
  loading: boolean
  error: string
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const initialRender = useRef<boolean>(true)

  const isAuthenticated = localStorage.getItem('auth-flag')
  const axiosInstance = useAxiosInstance()
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
      if (response.data.error) {
        setError(response.data.error.message)
      } else {
        const user = response.data.user
        setUser(user)
        await getUserProfile(user.username)
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
        const user = response.data.user
        setUser(user)
        await getUserProfile(user.username)
        localStorage.setItem('auth-flag', response.data.user.id)
        navigate('/')
      }
    } catch (error: TryCatchError) {
      setError(error.response.data.error)
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
      if (response.data.error) {
        setError(response.data.error.message)
      } else {
        setUser(null)
        setProfile(null)
        localStorage.removeItem('auth-flag')
        setLoading(false)
      }
    } catch (error: TryCatchError) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function getUserProfile(username: string): Promise<void> {
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.profiles}/${username}`,
        method: 'GET'
      }
      const response: AxiosResponse = await axiosInstance(request)
      if (response.data.error) {
        setError(response.data.error.message)
      } else {
        setProfile(response.data.profile)
      }
    } catch (error: TryCatchError) {
      setError(error.message)
    }
  }

  const checkUserSession: () => Promise<void> = useCallback(async () => {
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
  }, [axiosInstance])

  useEffect(() => {
    if (isAuthenticated) checkUserSession()
    return () => setUser(null)
  }, [isAuthenticated, checkUserSession])

  useEffect(() => {
    if (initialRender.current) initialRender.current = false
    else setError('')
  }, [location])

  return {
    user,
    profile,
    register,
    login,
    logout,
    loading,
    error
  }
}
