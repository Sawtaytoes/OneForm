import PropTypes from 'prop-types'
import {
  memo,
} from 'react'

import {
  useFieldErrorMessages,
} from './useFieldErrorMessages'

const propTypes = {
  name: PropTypes.string.isRequired,
}

const FieldErrorMessage = ({
  name,
}) => {
  const {
    errorMessages = [],
  } = (
    useFieldErrorMessages({
      name,
    })
  )

  return (
    (
      errorMessages
      [0]
    )
    || ''
  )
}

FieldErrorMessage.propTypes = propTypes

const MemoizedFieldErrorMessage = memo(FieldErrorMessage)

export default MemoizedFieldErrorMessage
