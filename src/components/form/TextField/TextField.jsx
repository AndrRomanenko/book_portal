import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import TextFieldBase from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import styles from './styles.module.scss'

const TextField = ({ className, icon, ...props }) => {
  const styledIcon =
    icon && React.cloneElement(icon, { className: styles.icon })

  return (
    <TextFieldBase
      variant="outlined"
      className={cx(styles.this, className)}
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">{styledIcon}</InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

TextField.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.node,
}

export default TextField
