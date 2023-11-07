export const setAuthData = ({ token, refreshToken }, portalAbbr) => {
  token && localStorage.setItem('token', token)
  refreshToken && localStorage.setItem('refreshToken', refreshToken)
  portalAbbr && localStorage.setItem('portal', portalAbbr)
}

export const getAuthToken = () => localStorage.getItem('token')
