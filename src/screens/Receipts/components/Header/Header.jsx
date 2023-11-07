import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'

import DownloadIcon from '@material-ui/icons/GetApp'
import ChatIcon from '@material-ui/icons/QuestionAnswer'

import { Autocomplete } from '../../../../components/form/Autocomplete'
import { Button } from '../../../../components/Button'
import { DatePicker } from '../../../../components/form/DatePicker'
import { ReceiptsDownloadModal } from '../../../../modals/ReceiptsDownload'
import { OpenDiscussionModal } from '../../../../modals/OpenDiscussion'

import { setSelectedFilters } from '../../../../store/receiptsList/actions'

import {
  getArticleFilterOptions,
  getContractPartnerFilterOptions,
  getReceiptTypeFilterOptions,
} from './helper'

import styles from './styles.module.scss'

export const Header = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('receipts')

  const {
    selected: selectedReceipts,
    filtersData,
    selectedFilters,
  } = useSelector((state) => state.receiptsList)

  const { articleFilters, contractPartnerFilters, receiptTypeFilters } =
    filtersData

  const [downloadModalIsOpen, setDownloadModalIsOpen] = useState(false)
  const [discussionModalIsOpen, setDiscussionModalIsOpen] = useState(false)

  const checkSetDate = (value, prevValue) => {
    if (value === 'Invalid date' && value === prevValue) {
      return false
    }
    return true
  }

  return (
    <section className={styles.container}>
      <div className={styles.filtersSection}>
        <span className={styles.title}>{t('filtersBar.title')}</span>
        <div className={styles.filters}>
          <Autocomplete
            label={t('filtersBar.contractPartner')}
            className={styles.filter}
            options={getContractPartnerFilterOptions(contractPartnerFilters)}
            onChange={(value) =>
              dispatch(
                setSelectedFilters({
                  ...selectedFilters,
                  contractPartnerFilter: value,
                }),
              )
            }
          />
          <Autocomplete
            label={t('filtersBar.article')}
            className={styles.filter}
            options={getArticleFilterOptions(articleFilters)}
            onChange={(value) =>
              dispatch(
                setSelectedFilters({
                  ...selectedFilters,
                  articleFilter: value,
                }),
              )
            }
          />
          <Autocomplete
            label={t('filtersBar.description')}
            className={styles.filter}
            options={getReceiptTypeFilterOptions(receiptTypeFilters)}
            onChange={(value) =>
              dispatch(
                setSelectedFilters({
                  ...selectedFilters,
                  receiptTypeFilter: value,
                }),
              )
            }
          />
          <DatePicker
            label={t('filtersBar.fromDate')}
            value={selectedFilters.dateFrom}
            className={cx(styles.filter, styles.dateFilter)}
            onChange={(value) =>
              checkSetDate(value, selectedFilters.dateFrom) &&
              dispatch(
                setSelectedFilters({
                  ...selectedFilters,
                  dateFrom: value,
                }),
              )
            }
          />
          <DatePicker
            label={t('filtersBar.toDate')}
            value={selectedFilters.dateTo}
            className={cx(styles.filter, styles.dateFilter)}
            onChange={(value) =>
              checkSetDate(value, selectedFilters.dateTo) &&
              dispatch(
                setSelectedFilters({
                  ...selectedFilters,
                  dateTo: value,
                }),
              )
            }
          />
        </div>
      </div>
      <div className={styles.actionButtons}>
        <Button
          className={cx(styles.button, styles.downloadButton)}
          type="button"
          variant="contained"
          disableElevation
          startIcon={<DownloadIcon />}
          onClick={() => setDownloadModalIsOpen(true)}
          disabled={Boolean(!selectedReceipts.length)}
        >
          {t('filtersBar.download')}
        </Button>
        <Button
          className={styles.button}
          type="button"
          variant="contained"
          disableElevation
          startIcon={<ChatIcon />}
          onClick={() => setDiscussionModalIsOpen(true)}
          disabled={Boolean(!selectedReceipts.length)}
        >
          {t('filtersBar.evidenceQuestion')}
        </Button>
      </div>
      <ReceiptsDownloadModal
        isOpen={downloadModalIsOpen}
        onRequestClose={() => setDownloadModalIsOpen(false)}
      />
      <OpenDiscussionModal
        isOpen={discussionModalIsOpen}
        onRequestClose={() => setDiscussionModalIsOpen(false)}
      />
    </section>
  )
}
