import React, { useState } from 'react'
import PropTypes, { shape } from 'prop-types'
import { useTranslation } from 'react-i18next'
import cx from 'classnames'

import TextField from '@material-ui/core/TextField'
import AutocompleteBase from '@material-ui/lab/Autocomplete'
import match from 'autosuggest-highlight/match'

import Option from './components/Option'

import styles from './styles.module.scss'

export const Autocomplete = ({ label, options, onChange, className }) => {
  const { t } = useTranslation('components', { keyPrefix: 'autocomplete' })

  const [inputValue, setInputValue] = useState('')

  const handleOptionSelect = (selectedTitle) => {
    const selectedValue = selectedTitle
      ? options.find((option) => option.title === selectedTitle).value
      : null

    onChange(selectedValue)
  }

  const getOptions = (optionsArray) =>
    optionsArray
      .map((option) =>
        match(option.title, inputValue).length ? option.title : null,
      )
      .filter((item) => item)

  return (
    <AutocompleteBase
      options={getOptions(options)}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label={label} />}
      className={cx(styles.this, className)}
      classes={{
        popper: inputValue.length >= 3 ? styles.popper : styles.popperHidden,
      }}
      onChange={(e, value) => handleOptionSelect(value)}
      onInputChange={(e, value) => setInputValue(value)}
      renderOption={Option}
      noOptionsText={t('noOptions')}
    />
  )
}

Autocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  className: PropTypes.string,
}
