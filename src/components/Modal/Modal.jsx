import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import ModalBase from 'react-modal'
import { useSelector } from 'react-redux'

import styles from './styles.module.scss'

export const Modal = ({ children, className, title, ...props }) => {
  const { portalConfig } = useSelector((state) => state.application)
  const { mainColor } = portalConfig
  return (
    <ModalBase
      overlayClassName={styles.overlay}
      className={styles.contentContainer}
      {...props}
    >
      <div className={cx(styles.this, className)}>
        {title && (
          <header
            className={styles.header}
            style={{ backgroundColor: mainColor }}
          >
            {title}
          </header>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </ModalBase>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
}
