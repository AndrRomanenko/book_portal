import { TYPES } from './actionTypes'

const initialState = {
  version: null,
  portalAbbr: '',
  portalConfig: {
    backgroundUrl: '',
    headerBackgroundUrl: '',
    logoSmallUrl: '',
    logoUrl: '',
    mainColor: '',
    primaryButtonColor: '',
  },
  pending: true,
}

const receiptsListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_APP_VERSION:
      return {
        ...state,
        version: payload,
      }
    case TYPES.SET_PORTAL_ABBR:
      return {
        ...state,
        portalAbbr: payload,
      }
    case TYPES.SET_PORTAL_CONFIG:
      return {
        ...state,
        portalConfig: payload,
      }
    case TYPES.SET_PENDING:
      return {
        ...state,
        pending: payload,
      }
    default:
      return state
  }
}

export default receiptsListReducer
