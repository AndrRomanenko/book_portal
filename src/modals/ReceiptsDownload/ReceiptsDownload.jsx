import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import DownloadIcon from '@material-ui/icons/GetApp'
import CancelIcon from '@material-ui/icons/Cancel'

import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { downloadReceipts } from '../../api/receipts'
import { setReceiptsReadStatus } from '../../store/receiptsList/actions'

import styles from '../styles.module.scss'

export const ReceiptsDownloadModal = ({ onRequestClose, ...props }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('modals', { keyPrefix: 'download' })

  const selectedReceipts = useSelector((state) => state.receiptsList.selected)
  const portalAbbr = useSelector((state) => state.application.portalAbbr)

  const onDownloadClick = () => {
    downloadReceipts(selectedReceipts, portalAbbr)
      .then(() => dispatch(setReceiptsReadStatus(selectedReceipts)))
      .finally(() => onRequestClose())
  }

  return (
    <Modal title={t('title')} {...props}>
      <div className={styles.receiptsListContainer}>
        {t('label')}:
        <br />
        <br />
        {selectedReceipts.join(', ')}
      </div>
      <div className={styles.controls}>
        <Button
          className={styles.controlButton}
          type="button"
          variant="contained"
          disableElevation
          startIcon={<DownloadIcon />}
          onClick={onDownloadClick}
        >
          {t('accept')}
        </Button>
        <Button
          className={styles.controlButton}
          type="button"
          variant="contained"
          disableElevation
          secondary
          startIcon={<CancelIcon />}
          onClick={onRequestClose}
        >
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  )
}

ReceiptsDownloadModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
}
