import PropTypes from 'prop-types'
import {
  Children,
  cloneElement,
  memo,
  useMemo,
} from 'react'

import {
  FieldContext,
} from './FieldContext'
import useField from './useField.js'
import useIsCheckboxElement from './useIsCheckboxElement.js'
import useIsMultipleElement from './useIsMultipleElement.js'

const propTypes = {
  children: PropTypes.node.isRequired,
  isCheckboxElement: PropTypes.bool,
  isMultipleElement: PropTypes.bool,
  translateProps: PropTypes.func,
}

const Field = ({
  children,
  isCheckboxElement = false,
  isMultipleElement = false,
  translateProps = (
    Function
    .prototype
  ),
}) => {
  const {
    name,
    onBlur: onVisit,
    onChange,
    // This should only be relevant to checkboxes and radio buttons.
    value: inputValue,
  } = (
    children
    .props
  )

  const isCheckboxHtmlElement = (
    useIsCheckboxElement(
      children
    )
  )

  const isMultipleHtmlElement = (
    useIsMultipleElement(
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
      isCheckboxElement: (
        isCheckboxElement
        || isCheckboxHtmlElement
      ),
      isMultipleElement: (
        isMultipleElement
        || isMultipleHtmlElement
      ),
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
        (
          translateProps({
            errorMessages,
            fieldName,
            isChecked,
            isVisited,
            updateFieldValue,
            value,
            visitField,
          })
        )
        || {
          'checked': isChecked,
          'data-error': (
            (
              (
                errorMessages
                .length
              )
              > 0
            )
            ? true
            : null
          ),
          'data-visited': (
            isVisited
            ? true
            : null
          ),
          'name': fieldName,
          'onBlur': visitField,
          'onChange': updateFieldValue,
          value,
        }
      ),
      [
        errorMessages,
        fieldName,
        isChecked,
        isVisited,
        translateProps,
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
