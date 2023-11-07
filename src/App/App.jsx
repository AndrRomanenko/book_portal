import React from 'react'
import { Provider } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Router } from 'react-router-dom'
import { StylesProvider } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import moment from 'moment'
import MomentUtils from '@date-io/moment'

import { ToastContainer } from '../components/ToastContainer'
import { Routes } from '../routes'
import { store } from '../store'

import history from '../routes/history'

import 'moment/locale/de'
import '../i18n'
import './styles.module.scss'

export const App = () => {
  const { i18n } = useTranslation()

  return (
    <>
      <StylesProvider injectFirst>
        <Router history={history}>
          <MuiPickersUtilsProvider
            libInstance={moment}
            locale={i18n.language}
            utils={MomentUtils}
          >
            <Provider store={store}>
              <Routes />
            </Provider>
          </MuiPickersUtilsProvider>
        </Router>
      </StylesProvider>
      <ToastContainer />
    </>
  )
}
