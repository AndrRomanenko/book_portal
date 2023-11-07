/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux'
import applicationReducer from './application'
import receiptsListReducer from './receiptsList'

const appReducer = combineReducers({
  application: applicationReducer,
  receiptsList: receiptsListReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    const { application } = state
    state = { application }
  }
  return appReducer(state, action)
}

export default rootReducer
