import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from '@material-ui/core'
import FileDownload from '@material-ui/icons/GetApp'
import FileDownloadOff from '@material-ui/icons/CloudOff'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import { Checkbox } from '../../../../components/Checkbox'
import { Spinner } from '../../../../components/Spinner'

import {
  setPagination,
  getReceiptsPage,
  addReceiptsToSelected,
  removeReceiptsFromSelected,
  setReceiptsReadStatus,
  setReceiptSorting,
} from '../../../../store/receiptsList/actions'

import { downloadReceipts } from '../../../../api/receipts'

import { paginationSizes } from '../../../../constants/pagination'
import { formatReceiptsData, getPaginationLabel } from './helper'

import styles from './styles.module.scss'

export const ReceiptsTable = () => {
  const { t, i18n } = useTranslation('receipts')
  const dispatch = useDispatch()

  const {
    data: receiptsData,
    pending: isLoading,
    selected: selectedReceipts,
    pagination,
    selectedFilters,
    sortings,
  } = useSelector((state) => state.receiptsList)

  const portalAbbr = useSelector((state) => state.application.portalAbbr)

  const { page, size, totalElements } = pagination

  const formattedReceiptsData = formatReceiptsData(receiptsData, i18n.language)
  const pageReceiptsNumbers = receiptsData.map(
    (receipt) => receipt.receiptNumber,
  )
  const selectedReceiptsLength = selectedReceipts.filter((id) =>
    pageReceiptsNumbers.includes(id),
  ).length

  // columns config for receipts list table
  const columns = [
    { id: 'receiptNumber', label: t('table.receiptNumber') },
    {
      id: 'createdDate',
      label: t('table.date'),
    },
    {
      id: 'amount',
      label: t('table.amount'),
      align: 'right',
    },
    {
      id: 'partner',
      label: t('table.contractPartner'),
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'receiptType',
      label: t('table.description'),
      minWidth: 170,
      align: 'left',
    },
  ]

  useEffect(() => {
    dispatch(getReceiptsPage())
  }, [selectedFilters])

  const handlePaginationChange = (paginationData) => {
    dispatch(setPagination(paginationData))
    dispatch(getReceiptsPage())
  }

  const handleSelectAllClick = (e) => {
    const { checked } = e.target

    checked
      ? dispatch(addReceiptsToSelected(pageReceiptsNumbers))
      : dispatch(removeReceiptsFromSelected(pageReceiptsNumbers))
  }

  const handleReceiptSelect = (e, receiptNumber) => {
    const { checked } = e.target

    checked
      ? dispatch(addReceiptsToSelected([receiptNumber]))
      : dispatch(removeReceiptsFromSelected([receiptNumber]))
  }

  const onDownloadClick = (receiptNumber) =>
    downloadReceipts([receiptNumber], portalAbbr).then(() =>
      dispatch(setReceiptsReadStatus([receiptNumber])),
    )

  const createSortHandler = (property) => {
    if (property === 'partner') {
      dispatch(
        setReceiptSorting(
          ['lastName', 'firstName', 'zipCode', 'city', 'country'],
          property,
        ),
      )
    } else {
      dispatch(setReceiptSorting([property]))
    }
    dispatch(setPagination({ page: 0 }))
    dispatch(getReceiptsPage())
  }

  return (
    <>
      <TableContainer className={styles.container}>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedReceiptsLength > 0 &&
                      selectedReceiptsLength < pageReceiptsNumbers.length
                    }
                    checked={
                      pageReceiptsNumbers.length !== 0 &&
                      selectedReceiptsLength === pageReceiptsNumbers.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell align="center" style={{ width: 10 }} />
                {columns.map((column) => {
                  const sortIndex = sortings.findIndex(
                    (sort) => sort.value === column.id,
                  )
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <div className={styles.headerLabelContainer}>
                        <TableSortLabel
                          active={sortIndex !== -1}
                          direction={
                            sortings.find((sort) => sort.value === column.id)
                              ?.sortValue || undefined
                          }
                          onClick={() => createSortHandler(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                        {sortIndex !== -1 && (
                          <div className={styles.orderLabel}>
                            {sortIndex + 1}
                          </div>
                        )}
                      </div>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {formattedReceiptsData.map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.receiptNumber}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedReceipts.includes(row.receiptNumber)}
                      onChange={(e) =>
                        handleReceiptSelect(e, row.receiptNumber)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      disabled={!row.isAvailable}
                      className={styles.closeButton}
                      onClick={() =>
                        row.isAvailable && onDownloadClick(row.receiptNumber)
                      }
                    >
                      {row.isAvailable ? (
                        <FileDownload className={styles.icon} />
                      ) : (
                        <FileDownloadOff className={styles.icon} />
                      )}
                    </IconButton>
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        className={cx({ [styles.unread]: !row.retrievedOn })}
                        key={column.id}
                        align={column.align}
                      >
                        <span
                          className={cx({ [styles.failed]: !row.isAvailable })}
                        >
                          {column.format ? column.format(value) : value}
                        </span>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={paginationSizes}
        component="div"
        rowsPerPage={size}
        page={page}
        count={totalElements}
        labelRowsPerPage={t('pagination.perPage')}
        labelDisplayedRows={(data) =>
          getPaginationLabel(data, t('pagination.separatorLabel'))
        }
        onPageChange={(e, newPage) => handlePaginationChange({ page: newPage })}
        onRowsPerPageChange={(e) =>
          handlePaginationChange({ size: e.target.value })
        }
      />
    </>
  )
}
