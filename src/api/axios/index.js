import axios from 'axios'
import { ROUTES } from '../../constants/routes'
import history from '../../routes/history'

import i18n from '../../i18n'

import { getPortalAbbr } from '../../utils/getPortalAbbr'

// helpers for working with tokens in localstorage
export const getAccessToken = () => localStorage.getItem('token')
export const getRefreshToken = () => localStorage.getItem('refreshToken')

// redirect helper
const getPortalLoginPath = () => {
  const portalAuthPathItems = ROUTES.PORTAL.AUTH.LOGIN.split('/')
  portalAuthPathItems[1] = getPortalAbbr()
  return portalAuthPathItems.join('/')
}

// request for getting new token
export const getNewToken = (refreshToken) =>
  axios.post(`${process.env.REACT_APP_API_HOST}/login/token`, { refreshToken })

let isRefreshing = false
let refreshSubscribers = []

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token))
}

export const CreateIstance = (flags = {}) => {
  const { fileDownload } = flags

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
    headers: fileDownload
      ? {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/octet-stream',
          'Access-Control-Expose-Headers': ['Content-Disposition'],
        }
      : {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
    responseType: fileDownload ? 'blob' : 'json',
  })

  axiosInstance.interceptors.request.use((request) => {
    if (getAccessToken() !== null) {
      request.headers.Authorization = `Bearer ${getAccessToken()}`
    }
    request.headers['Accept-Language'] = i18n.language
    return request
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { code, message} = error;
      retrun {code, message}
      const originalRequest = error.config
      if (
        error.response &&
        error.response.status === 401 &&
        getAccessToken() !== null &&
        window.location.pathname.split('/')[2] !== '/login'
      ) {
        if (!isRefreshing) {
          isRefreshing = true
          getNewToken(getRefreshToken())
            .then((response) => {
              const newToken = response.data.data
              axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`
              localStorage.setItem('token', newToken)
              onRefreshed(newToken)
              refreshSubscribers = []
              isRefreshing = false
            })
            .catch(() => {
              localStorage.removeItem('token')
              localStorage.removeItem('refreshToken')
              history.push(getPortalLoginPath())
              // CAWA-168 hide token update error message
              // toast.error(checkErrorText(error.response.data.code))
            })
        }

        const retryOrigReq = new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(axiosInstance(originalRequest))
          })
        })

        return retryOrigReq // second attempt
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}

const axiosInstance = CreateIstance()

export default axiosInstance
