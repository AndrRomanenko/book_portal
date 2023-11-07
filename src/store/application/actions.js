import { TYPES } from './actionTypes'
import { getServerInfo, getPortalInfo } from '../../api/app'
import { getPortalAbbr } from '../../utils/getPortalAbbr'

// Actions ========

export const setAppVersion = (payload) => ({
  type: TYPES.SET_APP_VERSION,
  payload,
})

export const setPortalConfig = (payload) => ({
  type: TYPES.SET_PORTAL_CONFIG,
  payload,
})

export const setPortalAbbr = (payload) => ({
  type: TYPES.SET_PORTAL_ABBR,
  payload,
})

export const setPending = (payload) => ({
  type: TYPES.SET_PENDING,
  payload,
})

// Thunks ========

export const getAppVersion = () => async (dispatch) => {
  const payload = (await getServerInfo()).data.version || null
  dispatch(setAppVersion(payload))
}

export const getPortalConfig = (noPortalCallback) => async (dispatch) => {
  const portalAbbr = getPortalAbbr()

  dispatch(setPending(true))

  setTimeout(async () => {
    try {
      const data = (await getPortalInfo(portalAbbr)).data || null
      dispatch(setPortalAbbr(portalAbbr))
      dispatch(setPortalConfig(data))
      if (!data.portalExists && portalAbbr.length !== 0) {
        noPortalCallback()
      }
    } finally {
      dispatch(setPending(false))
    }
  }, 1000)
}
