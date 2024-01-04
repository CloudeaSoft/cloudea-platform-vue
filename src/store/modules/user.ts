import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    profile,
    setUserProfile,
    removeUserProfile,
    getUserId
  }
})
