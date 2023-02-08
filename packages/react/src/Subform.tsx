import {
  memo,
} from 'react'

import {
  useSubformEffect,
} from './useSubformEffect'

const Subform = <
  ValueType,
>({
  errorMessages,
  groupValidations,
  onChange,
  onSubmit,
  updatedErrorMessages,
  updatedValues,
  validations,
  values,
}: (
  Parameters<
    typeof useSubformEffect<
      ValueType
    >
  >[0]
)) => {
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

const MemoizedSubform = (
  memo(
    Subform
  )
)

export {
  MemoizedSubform as Subform
}
