import API from './axios'

export const login = ({ password, userName }, portalAbbr) =>
  API.post(`/${portalAbbr}/login/authenticate`, { userName, password })

export const triggerResetPassword = ({ userName }, portalAbbr) =>
  API.post(`/${portalAbbr}/registration/reset-password`, { userName })

export const registerPassword = (
  { password, registrationToken, userName },
  portalAbbr,
) =>
  API.post(`/${portalAbbr}/registration/register-password`, {
    password,
    registrationToken,
    userName,
  })

export const register = (
  {
    city,
    registrationCode,
    firstName,
    houseNumber,
    lastName,
    postalCode,
    country,
    street,
    userName,
  },
  portalAbbr,
) =>
  API.post(`/${portalAbbr}/registration`, {
    city,
    registrationCode,
    firstName,
    houseNumber,
    lastName,
    postalCode,
    country,
    street,
    userName,
  })

// Validate token for registration and password reset
export const validateRegistrationToken = (registrationToken, portalAbbr) =>
  API.post(`/${portalAbbr}/registration/validate`, { registrationToken })
