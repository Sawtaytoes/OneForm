import PropTypes from 'prop-types'
import {
  memo,
  useMemo,
} from 'react'

import {
  useFieldValue,
} from './useFieldValue'

const propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  getIsVisible: PropTypes.func,
  name: PropTypes.string.isRequired,
}

const IfFieldValue = ({
  children,
  fallback = null,
  getIsVisible = Boolean,
  name,
}) => {
  const {
    value = '',
  } = (
    useFieldValue({
      name,
    })
  )

  const isVisible = (
    useMemo(
      () => (
        getIsVisible(
          value
        )
      ),
      [
        getIsVisible,
        value,
      ]
    )
  )

  return (
    isVisible
    ? children
    : fallback
  )
}

IfFieldValue.propTypes = propTypes

const MemoizedIfFieldValue = memo(IfFieldValue)

export default MemoizedIfFieldValue
