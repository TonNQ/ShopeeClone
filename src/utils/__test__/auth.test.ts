import { describe, it, expect, beforeEach } from 'vitest'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getProfileFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage
} from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTRkYmQzMzIxODNmMjUwMGIyNTgxMiIsImVtYWlsIjoidXNlcjNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wMy0yMVQwODozNDowMC4yMTJaIiwiaWF0IjoxNzExMDEwMDQwLCJleHAiOjE3MTEwMTAwNTB9.hwybX70NBgK0OiFxfdOb8OhEjxMV2etRS55yLk9kTKI'

const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTRkYmQzMzIxODNmMjUwMGIyNTgxMiIsImVtYWlsIjoidXNlcjNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wMy0yMVQwODozNDowMC4yMTJaIiwiaWF0IjoxNzExMDEwMDQwLCJleHAiOjE3MTE2MTQ4NDB9.aJhFhlvubX9S5vojSZySDrBkdFk-nJ1-RNm86g48nOM'

const profile =
  '{"_id":"60a4dbd332183f2500b25812","roles":["User"],"email":"user3@gmail.com","createdAt":"2021-05-19T09:35:15.028Z","updatedAt":"2024-02-05T10:50:24.583Z","__v":0,"avatar":"9375f3ff-7ccc-4a3b-86ce-8f2de9c43334.jpg","date_of_birth":"2003-12-11T17:00:00.000Z","address":"74 Bàu Năng 1, Hòa Minh, Liên Chiểu, Đà Nẵng","name":"Nguyễn Quốc Toàn","phone":"0935382788"}'

beforeEach(() => {
  localStorage.clear()
})

describe('access_token', () => {
  it('access_token should be set to local storage and get from local storage successfully', () => {
    setAccessTokenToLocalStorage(access_token)
    expect(getAccessTokenFromLocalStorage()).toBe(access_token)
  })
})

describe('refresh_token', () => {
  it('refresh_token should be set to local storage  and get from local storage successfully', () => {
    setRefreshTokenToLocalStorage(refresh_token)
    expect(getRefreshTokenFromLocalStorage()).toBe(refresh_token)
  })
})

describe('profile', () => {
  it('profile should be set to local storage and get from local storage successfully', () => {
    setProfileToLocalStorage(JSON.parse(profile))
    expect(getProfileFromLocalStorage()).toEqual(JSON.parse(profile))
  })
})

describe('clearLocalStorage', () => {
  it('Clear local storage', () => {
    setAccessTokenToLocalStorage(access_token)
    setRefreshTokenToLocalStorage(refresh_token)
    setProfileToLocalStorage(JSON.parse(profile))
    clearLocalStorage()
    expect(localStorage.getItem('access_token')).toBeNull()
    expect(localStorage.getItem('refresh_token')).toBeNull()
    expect(localStorage.getItem('profile')).toBeNull()
  })
})
