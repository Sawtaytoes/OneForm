import PropTypes from 'prop-types'
import {
  memo,
  useCallback,
} from 'react'

import Field from './Field.jsx'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const MaterialUiField = ({
  children,
  ...otherProps
}) => {
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

MaterialUiField.propTypes = propTypes

const MemoizedMaterialUiField = memo(MaterialUiField)

export default MemoizedMaterialUiField
