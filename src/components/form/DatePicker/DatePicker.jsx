import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

import { KeyboardDatePicker } from '@material-ui/pickers'
import { IconButton } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'

import moment from 'moment'
import styles from './styles.module.scss'

export const format = 'DD.MM.YYYY'

export const DatePicker = ({ value, className, onChange, ...props }) => {
  const { t } = useTranslation('components', { keyPrefix: 'datePicker' })
  const handleDateChange = (date) => {
    onChange(date ? moment(date).format(format) : null)
  }

  return (
    <div className={cx(styles.container, className)}>
      <KeyboardDatePicker
        clearable
        value={value ? moment(value, format) : null}
        onChange={(date) => handleDateChange(date)}
        format={format}
        className={styles.this}
        autoOk
        cancelLabel={t('cancelButton')}
        clearLabel={t('clearButton')}
        minDateMessage={`${t('minDateLabel')} ${moment(
          new Date('1900-01-01'),
        ).format(format)}`}
        maxDateMessage={`${t('maxDateLabel')} ${moment(
          new Date('2100-01-01'),
        ).format(format)}`}
        {...props}
      />
      {value && (
        <IconButton
          className={styles.closeButton}
          onClick={() => onChange(null)}
        >
          <ClearIcon className={styles.icon} />
        </IconButton>
      )}
    </div>
  )
}

DatePicker.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
