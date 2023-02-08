import {
  memo,
  ReactNode,
  useCallback,
} from 'react'

import {
  Field,
} from './Field'

export type MaterialUiFieldProps = (
  Parameters<typeof Field>[0]
  & {
    children: ReactNode,
  }
)

const MaterialUiField = ({
  children,
  ...otherProps
}: (
  MaterialUiFieldProps
)) => {
  const translateProps = (
    useCallback(
      ({
        errorMessages,
        fieldName,
        isChecked,
        updateFieldValue,
        value,
        visitField,
      }) => ({
        checked: isChecked,
        error: (
          (
            errorMessages
            .length
          )
          > 0
        ),
        helperText: (
          errorMessages
          [0]
        ),
        name: fieldName,
        onBlur: visitField,
        onChange: updateFieldValue,
        value,
      }),
      [],
    )
  )

  return (
    <Field
      {...otherProps}
      translateProps={translateProps}
    >
      {children}
    </Field>
  )
}

const MemoizedMaterialUiField = (
  memo(
    MaterialUiField
  )
)

export {
  MemoizedMaterialUiField as MaterialUiField
}
