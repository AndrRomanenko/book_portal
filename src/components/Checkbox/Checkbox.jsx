import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import CheckboxBase from '@material-ui/core/Checkbox'

export const Checkbox = ({ className, ...props }) => {
  const { portalConfig } = useSelector((state) => state.application)
  const { primaryButtonColor } = portalConfig
  return (
    <CheckboxBase
      className={className}
      classes={{
        checked: `${primaryButtonColor} !important`,
      }}
      color="primary"
      {...props}
    />
  )
}

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
}
