import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { PageLayout } from '../../components/layout/PageLayout'
import { Header } from './components/Header'
import { ReceiptsTable } from './components/ReceiptsTable'

import { getFiltersData } from '../../store/receiptsList/actions'

export const Receipts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFiltersData())
  }, [])

  return (
    <PageLayout>
      <Header />
      <ReceiptsTable />
    </PageLayout>
  )
}
