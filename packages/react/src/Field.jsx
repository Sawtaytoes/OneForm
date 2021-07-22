import PropTypes from 'prop-types'
import {
  Children,
  cloneElement,
  memo,
  useMemo,
} from 'react'

import FieldContext from './FieldContext.js'
import useField from './useField.js'
import useIsCheckboxElement from './useIsCheckboxElement.js'
import useIsHtmlElement from './useIsHtmlElement.js'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const Field = ({
  children,
}) => {
  const {
    multiple: isMultiFieldElement,
    name,
    onBlur: onVisit,
    onChange,
    // Unless `children` is a radio button, the `value` prop should never be set.
    value: inputValue,
  } = (
    children
    .props
  )

  const isHtmlElement = (
    useIsHtmlElement(
      children
    )
  )

  const isCheckboxElement = (
    useIsCheckboxElement(
      children
    )
  )

  const {
    errorMessages,
    fieldName,
    isChecked,
    isVisited,
    updateFieldValue,
    value,
    visitField,
  } = (
    useField({
      inputValue,
      isCheckboxElement,
      isMultiFieldElement,
      name,
      onChange,
      onVisit,
    })
  )

  const providerValue = (
    useMemo(
      () => ({
        value,
      }),
      [
        value,
      ],
    )
  )

  const childProps = (
    useMemo(
      () => (
        isHtmlElement
        ? {
          'checked': isChecked,
          'data-error': (
            (
              (
                errorMessages
                .length
              )
              > 0
            )
            ? 'true'
            : null
          ),
          'data-visited': (
            isVisited
            ? 'true'
            : null
          ),
          'name': fieldName,
          'onBlur': visitField,
          'onChange': updateFieldValue,
          value,
        }
        : {
          checked: isChecked,
          dirty: isVisited,
          error: (
            Boolean(
              errorMessages
              [0]
            )
          ),
          errorMessages: (
            errorMessages
          ),
          errors: (
            errorMessages
          ),
          isChecked,
          isDirty: isVisited,
          isTouched: isVisited,
          isVisited,
          name: fieldName,
          onBlur: visitField,
          onChange: updateFieldValue,
          touched: isVisited,
          value,
          visited: isVisited,
        }
      ),
      [
        errorMessages,
        fieldName,
        isChecked,
        isHtmlElement,
        isVisited,
        updateFieldValue,
        value,
        visitField,
      ],
    )
  )

  return (
    <FieldContext.Provider
      value={providerValue}
    >
      {
        cloneElement(
          (
            Children
            .only(
              children
            )
          ),
          childProps,
        )
      }
    </FieldContext.Provider>
  )
}

Field.propTypes = propTypes

const MemoizedField = memo(Field)

export default MemoizedField
