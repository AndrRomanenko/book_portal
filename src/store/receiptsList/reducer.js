import { TYPES } from './actionTypes'

import { paginationSizes } from '../../constants/pagination'

import { addUniqueItemsToArray } from '../../utils/addUniqueItemsToArray'
import { getNextSortValue } from '../../utils/receiptsSorting'
import { checkValue } from '../../utils/valueCheck'

const initialState = {
  data: [],
  total: 0,
  pending: false,
  error: false,
  pagination: {
    page: 0,
    size: paginationSizes[0],
    totalElements: 0,
  },
  selected: [],
  filtersData: {
    articleFilters: [],
    contractPartnerFilters: [],
    receiptTypeFilters: [],
  },
  sortings: [],
  selectedFilters: {
    articleFilter: null,
    contractPartnerFilter: null,
    receiptTypeFilter: null,
    dateFrom: null,
    dateTo: null,
  },
}

const receiptsListReducer = (
  state = initialState,
  { type, payload, pending },
) => {
  switch (type) {
    case TYPES.SET_PAGINATION: {
      const { page, size, totalElements } = payload
      return {
        ...state,
        pagination: {
          page: checkValue(page) ? page : state.pagination.page,
          size: checkValue(size) ? size : state.pagination.size,
          totalElements: checkValue(totalElements)
            ? totalElements
            : state.pagination.totalElements,
        },
      }
    }
    case TYPES.SET_TABLE_PAGE:
      return {
        ...state,
        data: payload ? payload.data : state.data,
        pending,
      }
    case TYPES.ADD_TO_SELECTED:
      return {
        ...state,
        selected: addUniqueItemsToArray(state.selected, payload),
      }
    case TYPES.REMOVE_FROM_SELECTED:
      return {
        ...state,
        selected: state.selected.filter((item) => !payload.includes(item)),
      }
    case TYPES.SET_FILTERS_DATA:
      return {
        ...state,
        filtersData: payload,
      }
    case TYPES.SET_SELECTED_FILTERS:
      return {
        ...state,
        selectedFilters: payload,
      }
    case TYPES.SET_RECEIPT_READ_STATUS: {
      return {
        ...state,
        data: state.data.map((receipt) =>
          payload.includes(receipt.receiptNumber)
            ? {
                ...receipt,
                retrievedOn: true,
              }
            : receipt,
        ),
      }
    }
    case TYPES.SET_RECEIPTS_SORT_PROPERTY: {
      const { sortProperties, combinedProp } = payload

      const keyValue = combinedProp || sortProperties[0]
      const checkSortingExist = state.sortings.find(
        (sort) => sort.value === keyValue,
      )

      if (checkSortingExist) {
        return {
          ...state,
          sortings: state.sortings
            .map((sorting) =>
              sorting.value === keyValue
                ? {
                    ...sorting,
                    sortValue: getNextSortValue(sorting.sortValue),
                  }
                : sorting,
            )
            .filter((sorting) => sorting.sortValue),
        }
      }

      const sortingsArray = state.sortings
      sortingsArray.push({
        value: keyValue,
        sortValue: getNextSortValue(),
        keys: sortProperties.length > 1 ? sortProperties : [keyValue],
      })
      return {
        ...state,
        sortings: sortingsArray.filter((sorting) => sorting.sortValue),
      }
    }
    default:
      return state
  }
}

export default receiptsListReducer
