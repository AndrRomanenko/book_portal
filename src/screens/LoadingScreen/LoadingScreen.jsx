import React from 'react'
import { useTranslation } from 'react-i18next'

import { Spinner } from '../../components/Spinner'

import styles from './styles.module.scss'

export const LoadingScreen = () => {
  const { t } = useTranslation('loading')

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <Spinner size={70} className={styles.spinner} />
        <span className={styles.heading}>{t('loading')}</span>
      </div>
    </div>
  )
}
