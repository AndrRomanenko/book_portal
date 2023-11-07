import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getAuthToken } from '../../../utils/auth'
import { ROUTES } from '../../../constants/routes'
import { usePortalRouting } from '../../../hooks/usePortalRouting'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { getPortalRoute } = usePortalRouting()

  if (getAuthToken()) {
    return <Route {...rest} component={Component} />
  }
  return <Redirect to={getPortalRoute(ROUTES.PORTAL.AUTH.LOGIN)} />
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}
