import React from 'react'
import { useTranslation } from 'react-i18next'

import { AuthLayout } from '../../components/layout/AuthLayout'

import styles from './styles.module.scss'

export const NotFound = () => {
  const { t } = useTranslation('errorPages')

  return (
    <AuthLayout>
      <span className={styles.title}>{t('notFound.title')}</span>
    </AuthLayout>
  )
}
