import API from './axios'

export const getServerInfo = () => API.get(`/info/server`)

export const getPortalInfo = (portalAbbr) =>
  API.get(`/info/portal/${portalAbbr || '%20'}`)
