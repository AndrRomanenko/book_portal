import React, { useEffect } from 'react'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ROUTES } from '../constants/routes'
import { getPortalAbbr } from '../utils/getPortalAbbr'
import { useLocalization } from '../hooks/useLocalization'
import { usePortalRouting } from '../hooks/usePortalRouting'
import { getAppVersion, getPortalConfig } from '../store/application/actions'

import { PortalRouting } from './components/PortalRouting'

// screens
import { NotFound } from '../screens/NotFound'
import { LoadingScreen } from '../screens/LoadingScreen'

export const Routes = () => {
  const dispatch = useDispatch()
  const { portalRedirect } = usePortalRouting()
  const { pending } = useSelector((state) => state.application)
  const { setAppLanguage, getCurrentLanguage } = useLocalization()
  const { portalConfig } = useSelector((state) => state.application)
  const { mainColor } = portalConfig

  const checkBrowserLanguage = () => {
    const lang = window.navigator.language.slice(0, 2)
    return lang === 'de' ? 'de' : 'en'
  }

  useEffect(() => {
    setAppLanguage(getCurrentLanguage() || checkBrowserLanguage())
    dispatch(getAppVersion())
  }, [])

  useEffect(() => {
    dispatch(getPortalConfig(() => portalRedirect(ROUTES.ROOT)))

    const loggedPortal = localStorage.getItem('portal')
    const currentPortal = getPortalAbbr()

    if (currentPortal && loggedPortal && loggedPortal !== currentPortal) {
      localStorage.clear()
      dispatch({ type: 'RESET_STORE' })
      portalRedirect(ROUTES.PORTAL.AUTH.ROOT, currentPortal)
    }
  }, [])

  const theme = createTheme({
    palette: {
      primary: {
        main: mainColor || '#62ab85',
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      {pending ? (
        <LoadingScreen />
      ) : (
        <Switch>
          <Route exact from={ROUTES.ROOT} component={NotFound} />
          <Route path={ROUTES.PORTAL.ROOT} component={PortalRouting} />
        </Switch>
      )}
    </ThemeProvider>
  )
}
