import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

export const AuthLayout = ({ children }) => {
  const { portalConfig, version } = useSelector((state) => state.application)
  const { backgroundUrl, logoUrl, mainColor } = portalConfig

  return (
    <div
      className={styles.authContainer}
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundColor: mainColor,
      }}
    >
      <div className={styles.contentContainer}>
        {logoUrl && <img src={logoUrl} alt="logo" className={styles.logo} />}
        <span className={styles.title} style={{ color: mainColor }}>
          <strong>Portal</strong>
        </span>
        <span className={styles.version}>{version}</span>
        {children}
        <span className={styles.info}>
          © Andrii Romanenko
        </span>
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
