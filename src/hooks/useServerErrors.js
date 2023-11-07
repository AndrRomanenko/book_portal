import { useTranslation } from 'react-i18next'

const errorCodes = [
  1, 100, 101, 102, 103, 104, 201, 202, 203, 204, 221, 222, 223, 301, 302, 303,
  304,
]

export const useServerErrors = () => {
  const { t } = useTranslation('serverErrors')

  const checkErrorText = (errorCode) => {
    const res = errorCodes.includes(errorCode)
      ? t(`${errorCode}`)
      : t('unexpected')
    console.log(res)
    return res
  }

  return checkErrorText
}
