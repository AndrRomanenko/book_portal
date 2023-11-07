import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { CircularProgress } from '@material-ui/core'

import styles from './styles.module.scss'

export const Spinner = ({ className, ...props }) => (
  <div className={styles.container}>
    <CircularProgress className={cx(styles.spinner, className)} {...props} />
  </div>
)

Spinner.propTypes = {
  className: PropTypes.string,
}
