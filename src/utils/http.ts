import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLocalStorage,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setProfileToLocalStorage,
  setRefreshTokenToLocalStorage
} from './auth'
import config from 'src/constants/config'
import {
  URL_LOGIN,
  URL_LOGOUT,
  URL_REFRESH_TOKEN,
  URL_REGISTER
} from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLocalStorage()
    this.refreshToken = getRefreshTokenFromLocalStorage()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10 * 1000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        'expire-refresh-token': 7 * 24 * 60 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Response interceptors
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLocalStorage(this.accessToken)
          setRefreshTokenToLocalStorage(this.refreshToken)
          setProfileToLocalStorage(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 401 và 422
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized
          ].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Lỗi Unauthorized (401) có nhiều trường hợp: Token không đúng, không truyền token, token hết hạn

        // Nếu là lỗi 401:
        if (
          isAxiosUnauthorizedError<
            ErrorResponse<{ name: string; message: string }>
          >(error)
        ) {
          const config = error.response?.config || {
            headers: {
              Authorization: ''
            },
            url: ''
          }
          const { url } = config
          // Trường hợp token hết hạn và request không phải là request refresh token -> gọi lại refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi refresh token 2 lần
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s (< expired_refresh_token) cho những request tiếp theo lỗi 401 thì dừng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // return lại -> tiếp tục request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: access_token }
              })
            })
          }
        }

        // Còn những trường hợp như token không đúng, không truyền token, token hết hạn nhưng gọi refresh token fail
        // -> xóa local storage và toast message

        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        const data = error.response?.data as any | undefined
        toast.error(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.data.message || data.message
        )

        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLocalStorage(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
