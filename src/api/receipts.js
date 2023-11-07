import { toast } from 'react-toastify'
import qs from 'qs'
import i18n from '../i18n'
import API, { CreateIstance } from './axios'
import { initiateDownload } from '../utils/initiateDownload'
import { checkErrorText } from '../utils/getServerErrorCodeText'

const downloadAPI = CreateIstance({ fileDownload: true })

export const getReceipts = (params, portal) =>
  API.get(`/${portal}/receipts`, {
    params,
    paramsSerializer: (p) => qs.stringify(p, { arrayFormat: 'repeat' }),
  })

export const getFilters = (portal) => API.get(`/${portal}/receipts/filters`)

export const downloadReceipts = (receiptNumbers, portal) => {
  toast.info(i18n.t('notifications:fileDownload'), { autoClose: 3000 })
  return downloadAPI
    .get(`/${portal}/receipts/download`, {
      params: { receiptNumbers: receiptNumbers.join() },
    })
    .then((res) => {
      res.data && initiateDownload(res)
    })
    .catch((error) => {
      error.response.data.text().then((res) => {
        const errorData = JSON.parse(res)
        toast.error(checkErrorText(errorData.code), {
          autoClose: 3000,
        })
      })
    })
}
