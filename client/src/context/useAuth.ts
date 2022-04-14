import { useState, useEffect, useRef, useCallback } from 'react'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAxiosInstance } from '../hooks'
import { User, Profile } from '../types/shared'
import { endpoints } from '../axios/constants'
import { useLocation } from 'react-router-dom'

export interface UseAuth {
  user: User | null
  profile: Profile | null
  updateProfile: (username: string, updates: Partial<Profile>) => Promise<void>
  register: (user: Partial<User>) => void
  login: (user: Partial<User>) => void
  logout: () => void
  loading: boolean
  error: string
}

type CustomAxiosError = AxiosError & {
  response: AxiosResponse
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

  async function register(user: Partial<User>): Promise<void> {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/register`,
        data: user,
        method: 'POST'
      }

      const response: AxiosResponse = await axiosInstance(request)

      if (response.data?.error) {
        setError(response.data?.error?.message)
      } else if (response.data.user) {
        const user: User = response.data.user
        setUser(user)
        await getUserProfile(user.email)
        localStorage.setItem('auth-flag', user.id)
        navigate('/')
      }
    } catch (error) {
      const err = error as CustomAxiosError
      setError(err.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  async function login(user: Partial<User>): Promise<void> {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/login`,
        data: user,
        method: 'POST'
      }
      const response: AxiosResponse = await axiosInstance(request)

      if (response.data.error) {
        setError(response.data.error.message)
      } else {
        const user: User = response.data.user
        setUser(user)
        await getUserProfile(user.email)
        localStorage.setItem('auth-flag', response.data.user.id)
        navigate('/')
      }
    } catch (error) {
      const err = error as CustomAxiosError
      setError(err.response.data.error)
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
    } catch (error) {
      const err = error as CustomAxiosError
      setError(err.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const getUserProfile = useCallback(
    async (email: string): Promise<void> => {
      try {
        const request: AxiosRequestConfig = {
          url: `${endpoints.profiles}/${email}`,
          method: 'GET'
        }
        const response: AxiosResponse = await axiosInstance(request)

        if (response.data.error) {
          setError(response.data.error.message)
        } else {
          setProfile(response.data.profile)
        }
      } catch (error) {
        const err = error as CustomAxiosError
        setError(err.response.data.error)
      }
    },
    [axiosInstance]
  )

  const updateProfile = useCallback(
    async (username: string, updates: Partial<Profile>) => {
      try {
        const request: AxiosRequestConfig = {
          url: `${endpoints.profiles}/${username}`,
          method: 'POST',
          data: updates
        }
        const response: AxiosResponse = await axiosInstance(request)

        if (response.data.error) {
          setError(response.data.error.message)
        } else {
          setProfile(response.data.profile)
        }
      } catch (error) {
        const err = error as CustomAxiosError
        setError(err.response.data.error)
      }
    },
    [axiosInstance]
  )

  const checkUserSession: () => Promise<void> = useCallback(async () => {
    setLoading(true)
    try {
      const request: AxiosRequestConfig = {
        url: `${endpoints.auth}/refresh-tokens`,
        method: 'GET'
      }
      const response: AxiosResponse = await axiosInstance(request)
      if (response.data.user) {
        setUser(response.data.user)
        await getUserProfile(response.data.user.email)
      } else if (response.data.error) {
        setError(response.data.error.message)
      }
      setLoading(false)
    } catch (error) {
      const err = error as CustomAxiosError
      console.log({ err })
      setError(err.response.data.error)
    } finally {
      setLoading(false)
    }
  }, [axiosInstance, getUserProfile])

  useEffect(() => {
    let mounted = true

    if (isAuthenticated && mounted) checkUserSession()

    return () => {
      mounted = false
      setUser(null)
    }
  }, [isAuthenticated, checkUserSession])

  useEffect(() => {
    if (initialRender.current) initialRender.current = false
    else setError('')
  }, [location])

  return {
    user,
    profile,
    updateProfile,
    register,
    login,
    logout,
    loading,
    error
  }
}
