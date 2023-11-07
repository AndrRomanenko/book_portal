import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { ImpressumModal } from '../../../../../modals/Impressum'
import { ContactUsModal } from '../../../../../modals/ContactUs'

import styles from './styles.module.scss'

export const SideBar = ({ isOpen, onClose }) => {
  const { t } = useTranslation('pageLayout', { keyPrefix: 'sideBar' })

  const { portalConfig } = useSelector((state) => state.application)
  const { mainColor } = portalConfig

  const [impressumModalIsOpen, setImpressumModalIsOpen] = useState(false)
  const [contactUsModalIsOpen, setContantUsModalIsOpen] = useState(false)

  return (
    <>
      <div
        className={cx(styles.this, {
          [styles.open]: isOpen,
        })}
      >
        <span className={styles.title} style={{ color: mainColor }}>
          {t('title')}
        </span>
        <div className={styles.divider} />
        <span className={styles.label} style={{ color: mainColor }}>
          {t('support')}
        </span>
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setContantUsModalIsOpen(true)}
        >
          {t('contact')}
        </button>
        <div className={styles.divider} />
        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setImpressumModalIsOpen(true)}
        >
          {t('agreement')}
        </button>
      </div>
      <ImpressumModal
        isOpen={impressumModalIsOpen}
        onRequestClose={() => setImpressumModalIsOpen(false)}
      />
      <ContactUsModal
        isOpen={contactUsModalIsOpen}
        onRequestClose={() => setContantUsModalIsOpen(false)}
      />
      <div
        className={cx(styles.background, {
          [styles.backgroundHidden]: !isOpen,
        })}
        onClick={onClose}
        role="presentation"
      />
    </>
  )
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
