import PropTypes from 'prop-types'
import {
  Children,
  cloneElement,
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
  fallback,
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

  const childProps = (
    useMemo(
      () => ({
        children: (
          (
            errorMessages
            [0]
          )
          || ''
        ),
      }),
      [
        errorMessages,
      ]
    )
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
    ? (
      children
      ? (
        cloneElement(
          (
            Children
            .only(
              children
            )
          ),
          childProps,
        )
      )
      : (
        childProps
        .children
      )
    )
    : (
      fallback
      || (
        childProps
        .children
      )
    )
  )
}

FieldErrorMessage.propTypes = propTypes

const MemoizedFieldErrorMessage = memo(FieldErrorMessage)

export default MemoizedFieldErrorMessage
