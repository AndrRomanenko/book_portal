import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import cx from 'classnames'

import CancelIcon from '@material-ui/icons/Cancel'

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import styles from '../styles.module.scss'

export const ImpressumModal = ({ onRequestClose, ...props }) => {
  const { t } = useTranslation('modals', { keyPrefix: 'agreement' })
  const { portalConfig } = useSelector((state) => state.application)
  const { agreement } = portalConfig

  return (
    <Modal title={t('title')} {...props}>
      <div className={cx(styles.content, styles.agreement)}>{agreement}</div>
      <div className={styles.controls}>
        <Button
          className={styles.controlButton}
          type="button"
          variant="contained"
          disableElevation
          startIcon={<CancelIcon />}
          onClick={onRequestClose}
        >
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  )
}

ImpressumModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
}
