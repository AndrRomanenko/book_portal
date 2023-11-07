import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'

import styles from './styles.module.scss'

const Option = (option, { inputValue }) => {
  const matches = match(option, inputValue)
  const parts = parse(option, matches)

  return (
    <div>
      {parts.map((part, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className={cx({ [styles.highlight]: !!part.highlight })}
        >
          {part.text}
        </span>
      ))}
    </div>
  )
}

Option.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
  }),
}

export default Option
