import moment from 'moment'
import { toast } from 'react-toastify'
import { getReceipts, getFilters } from '../../api/receipts'
import { TYPES } from './actionTypes'
import { checkErrorText } from '../../utils/getServerErrorCodeText'
import { getSortsArr } from '../../utils/receiptsSorting'
import { format as dateFormat } from '../../components/form/DatePicker'

// Actions ========
export const setPagination = ({ page, size, totalElements }) => ({
  type: TYPES.SET_PAGINATION,
  payload: { page, size, totalElements },
})

export const setPending = (pending) => ({
  type: TYPES.SET_TABLE_PAGE,
  pending,
})

export const addReceiptsToSelected = (payload) => ({
  type: TYPES.ADD_TO_SELECTED,
  payload,
})

export const removeReceiptsFromSelected = (payload) => ({
  type: TYPES.REMOVE_FROM_SELECTED,
  payload,
})

export const setFiltersData = (payload) => ({
  type: TYPES.SET_FILTERS_DATA,
  payload,
})

export const setSelectedFilters = (payload) => ({
  type: TYPES.SET_SELECTED_FILTERS,
  payload,
})

export const setReceiptsReadStatus = (receiptsIds) => ({
  type: TYPES.SET_RECEIPT_READ_STATUS,
  payload: receiptsIds,
})

export const setReceiptSorting = (sortProperties, combinedProp) => ({
  type: TYPES.SET_RECEIPTS_SORT_PROPERTY,
  payload: { sortProperties, combinedProp },
})

// Thunks ========
export const getReceiptsPage = () => async (dispatch, getState) => {
  dispatch(setPending(true))

  try {
    const {
      application: { portalAbbr },
      receiptsList: { pagination, selectedFilters, sortings },
    } = getState()

    const { page, size } = pagination

    const {
      articleFilter,
      contractPartnerFilter,
      receiptTypeFilter,
      dateFrom,
      dateTo,
    } = selectedFilters

    const payload =
      (
        await getReceipts(
          {
            ...articleFilter,
            ...contractPartnerFilter,
            receiptType: receiptTypeFilter,
            toDate: moment(dateTo, dateFormat).isValid()
              ? moment(dateTo, 'DD-MM-YYYY').format('YYYY-MM-DD')
              : undefined,
            fromDate: moment(dateFrom, dateFormat).isValid()
              ? moment(dateFrom, 'DD-MM-YYYY').format('YYYY-MM-DD')
              : undefined,
            page,
            size,
            sort: getSortsArr(sortings),
          },
          portalAbbr,
        )
      ).data || []

    dispatch({ type: TYPES.SET_TABLE_PAGE, payload, pending: false })
    dispatch(setPagination(payload.metaData))
  } catch (error) {
    toast.error(checkErrorText(checkErrorText(error.response.data.code)))
    dispatch(setPending(false))
  }
}

export const getFiltersData = () => async (dispatch, getState) => {
  try {
    const {
      application: { portalAbbr },
    } = getState()

    const payload = (await getFilters(portalAbbr)).data || []
    dispatch(setFiltersData(payload))
  } catch (error) {
    toast.error(checkErrorText(checkErrorText(error.response.data.code)))
  }
}
