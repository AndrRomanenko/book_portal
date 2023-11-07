import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import SelectBase from '@material-ui/core/Select'

import styles from './styles.module.scss'

export const Select = ({ className, label, options, ...props }) => (
  <FormControl className={styles.control}>
    <InputLabel>{label}</InputLabel>
    <SelectBase className={cx(styles.this, className)} {...props}>
      {options.map(({ value, title }) => (
        <MenuItem key={title} value={value}>
          {title}
        </MenuItem>
      ))}
    </SelectBase>
  </FormControl>
)

Select.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      title: PropTypes.string,
    }),
  ),
}
