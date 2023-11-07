import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'

import { PrivateRoute } from '../PrivateRoute'

import { usePortalRouting } from '../../../hooks/usePortalRouting'
import { getAuthToken } from '../../../utils/auth'

// screens
import { NotFound } from '../../../screens/NotFound'
import { Login, Registration, PasswordReset } from '../../../screens/auth'
import { Receipts } from '../../../screens/Receipts'

export const PortalRouting = () => {
  const location = useLocation()
  const { portalRedirect } = usePortalRouting()

  useEffect(() => {
    if (location.pathname.split('/').length === 2) {
      portalRedirect(
        getAuthToken() ? ROUTES.PORTAL.RECEIPTS.ROOT : ROUTES.PORTAL.AUTH.LOGIN,
      )
    }
  }, [])

  return (
    <Switch>
      <Route exact path={ROUTES.PORTAL.AUTH.LOGIN} component={Login} />
      <Route
        exact
        path={[
          ROUTES.PORTAL.AUTH.REGISTRATION.ROOT,
          ROUTES.PORTAL.AUTH.REGISTRATION.VALIDATION,
        ]}
        component={Registration}
      />
      <Route
        exact
        path={[ROUTES.PORTAL.AUTH.RESET.TOKEN, ROUTES.PORTAL.AUTH.RESET.ROOT]}
        component={PasswordReset}
      />
      <PrivateRoute
        exact
        path={ROUTES.PORTAL.RECEIPTS.ROOT}
        component={Receipts}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}
