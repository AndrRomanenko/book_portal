import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import cx from 'classnames'

import ButtonBase from '@material-ui/core/Button'

import styles from './styles.module.scss'

export const Button = ({
  children,
  className,
  secondary,
  disabled,
  ...props
}) => {
  const { portalConfig } = useSelector((state) => state.application)
  const { primaryButtonColor, primaryButtonTextColor } = portalConfig

  return (
    <ButtonBase
      className={cx(styles.this, className, {
        [styles.secondary]: secondary,
      })}
      disabled={disabled}
      style={
        !disabled && !secondary
          ? {
              backgroundColor: primaryButtonColor,
              color: primaryButtonTextColor,
            }
          : null
      }
      {...props}
    >
      {children}
    </ButtonBase>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
}
