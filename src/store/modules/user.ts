import type { RoleEnum } from '@/enums/roleEnum'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface UserState {
  userInfo: UserProfile | null
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

export interface UserProfile {
  Id: string
  UserName: string
  NickName: string
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('Authorization', JSON.stringify(newToken))
  }
  const removeToken = () => {
    token.value = ''
    localStorage.removeItem('Authorization')
  }

  const logout = () => {}

  const profile = ref<UserProfile | null>()
  const setUserProfile = (newUser: UserProfile) => {
    profile.value = newUser
  }
  const removeUserProfile = () => {
    profile.value = null
  }
  const getUserId = () => {
    return profile.value?.Id
  }

  return {
    token,
    setToken,
    removeToken,
    logout,
    profile,
    setUserProfile,
    removeUserProfile,
    getUserId
  }
})
