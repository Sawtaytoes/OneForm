import PropTypes from 'prop-types'
import {
  memo,
} from 'react'

import {
  useFieldVisitation,
} from './useFieldVisitation'

const propTypes = {
  children: PropTypes.node,
  fallback: PropTypes.node,
  getIsVisible: PropTypes.func,
  name: PropTypes.string.isRequired,
}

const IfFieldVisitation = ({
  children,
  fallback = null,
  name,
}) => {
  const {
    isVisited = false,
  } = (
    useFieldVisitation({
      name,
    })
  )

  return (
    isVisited
    ? children
    : fallback
  )
}

IfFieldVisitation.propTypes = propTypes

const MemoizedIfFieldVisitation = memo(IfFieldVisitation)

export default MemoizedIfFieldVisitation
