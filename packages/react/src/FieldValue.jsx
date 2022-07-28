import PropTypes from 'prop-types'
import {
  memo,
} from 'react'

import {
  useFieldValue,
} from './useFieldValue'

const propTypes = {
  name: PropTypes.string.isRequired,
}

const FieldValue = ({
  name,
}) => {
  const {
    value = '',
  } = (
    useFieldValue({
      name,
    })
  )

  return (
    value
  )
}

FieldValue.propTypes = propTypes

const MemoizedFieldValue = memo(FieldValue)

export default MemoizedFieldValue
