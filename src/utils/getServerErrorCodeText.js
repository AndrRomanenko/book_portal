import i18n from '../i18n'

export const errorCodes = [
  1, 100, 101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 210, 221, 222, 223,
  224, 301, 302, 303, 304, 305, 306, 307,
]

export const checkErrorText = (errorCode) =>
  errorCodes.includes(errorCode)
    ? i18n.t(`serverErrors:${errorCode}`)
    : i18n.t('serverErrors:unexpected')
