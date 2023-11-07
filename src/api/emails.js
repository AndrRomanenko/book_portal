import API from './axios'

export const sendMessageToPortalOwner = ({ subject, message }, portalAbbr) =>
  API.post(`${portalAbbr}/email/portal/send`, {
    subject,
    message,
  })

export const sendMessageToPublishers = (
  { message, receiptNumbers },
  portalAbbr,
) =>
  API.post(`/${portalAbbr}/publisher/question`, {
    message,
    receiptNumbers,
  })
