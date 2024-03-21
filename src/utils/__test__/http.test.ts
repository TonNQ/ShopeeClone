import { describe, it, expect, beforeEach } from 'vitest'
import { Http } from '../http'
import { HttpStatusCode } from 'axios'
import {
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from '../auth'

describe('http axios', () => {
  let http = new Http().instance

  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })

  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTRkYmQzMzIxODNmMjUwMGIyNTgxMiIsImVtYWlsIjoidXNlcjNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wMy0yMVQxMDoyNDozNC42NDVaIiwiaWF0IjoxNzExMDE2Njc0LCJleHAiOjE3MTEwMTY2NzV9.xSkBl_BPMGrL9iTQ-84U0TVAWUOGGmtcPjORAAbiwNk'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTRkYmQzMzIxODNmMjUwMGIyNTgxMiIsImVtYWlsIjoidXNlcjNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wMy0yMVQxMDoyNDozNC42NDVaIiwiaWF0IjoxNzExMDE2Njc0LCJleHAiOjE3MTk2NTY2NzR9.fuuRLrQkwdamN478KsZU7UZfPLbKYAZBFQxGYhK_jMI'

  it('Call API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth API', async () => {
    // account test
    await http.post('login', {
      email: 'user3@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
    localStorage.clear()
  })

  it('Refresh token', async () => {
    setAccessTokenToLocalStorage(access_token_1s)
    setRefreshTokenToLocalStorage(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
