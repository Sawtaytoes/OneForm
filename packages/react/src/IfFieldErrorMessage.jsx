import PropTypes from 'prop-types'
import {
  memo,
  useMemo,
} from 'react'

import useFieldErrorMessages from './useFieldErrorMessages'

const defaultGetIsVisible = (
  errorMessages,
) => (
  (
    errorMessages
    ?.length
  )
  > 0
)

const propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  getIsVisible: PropTypes.func,
  name: PropTypes.string.isRequired,
}

const FieldErrorMessage = ({
  children,
  fallback = null,
  getIsVisible = defaultGetIsVisible,
  name,
}) => {
  const {
    errorMessages = [],
  } = (
    useFieldErrorMessages({
      name,
    })
  )

  const isVisible = (
    useMemo(
      () => (
        getIsVisible(
          errorMessages
        )
      ),
      [
        errorMessages,
        getIsVisible,
      ]
    )
  )

  return (
    isVisible
    ? children
    : fallback
  )
}

FieldErrorMessage.propTypes = propTypes

const MemoizedFieldErrorMessage = memo(FieldErrorMessage)

export default MemoizedFieldErrorMessage
