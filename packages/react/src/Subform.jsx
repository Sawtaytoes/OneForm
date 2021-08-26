import PropTypes from 'prop-types'
import {
  memo,
} from 'react'

import useSubformEffect from './useSubformEffect.js'

const propTypes = {
  errorMessages: PropTypes.object,
  groupValidations: PropTypes.array,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  updatedErrorMessages: PropTypes.object,
  updatedValues: PropTypes.object,
  validations: PropTypes.object,
  values: PropTypes.object,
}

const Subform = ({
  errorMessages,
  groupValidations,
  onChange,
  onSubmit,
  updatedErrorMessages,
  updatedValues,
  validations,
  values,
}) => {
  useSubformEffect({
    errorMessages,
    groupValidations,
    onChange,
    onSubmit,
    updatedErrorMessages,
    updatedValues,
    validations,
    values,
  })

  return null
}

Subform.propTypes = propTypes

const MemoizedSubform = memo(Subform)

export default MemoizedSubform
