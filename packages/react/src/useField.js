import {
  useCallback,
  useEffect,
} from 'react'

import useFieldData from './useFieldData.js'

const useField = ({
  inputValue,
  isCheckboxElement,
  isMultiFieldElement,
  name,
  onChange,
  onVisit,
}) => {
  const {
    errorMessages = [],
    fieldName,
    isVisited = false,
    register,
    setValue,
    setVisited,
    value = '',
  } = (
    useFieldData({
      name,
    })
  )

  const visitField = (
    useCallback(
      (
        event,
      ) => {
        setVisited()

        onVisit?.(
          event
        )
      },
      [
        onVisit,
        setVisited,
      ],
    )
  )

  const updateFieldValue = (
    useCallback(
      (
        event,
      ) => {
        const {
          checked: isTargetChecked,
          selectedOptions: targetSelectedOptions,
          type: targetType,
          value: targetValue,
        } = (
          event
          .target
        )

        if (
          targetType
          === 'checkbox'
        ) {
          setVisited()

          setValue((value) => (
            inputValue === undefined
            || typeof value === 'boolean'
            ? isTargetChecked
            : (
              isTargetChecked
              ? (
                inputValue
                || targetValue
              )
              : 'unchecked'
            )
          ))
        }
        else if (
          targetType
          === 'radio'
        ) {
          setVisited()

          setValue(
            inputValue
            || targetValue
          )
        }
        else if (
          targetType
          === 'select-multiple'
        ) {
          setVisited()

          setValue(
            Array
            .from(
              targetSelectedOptions
            )
            .map(({
              value,
            }) => (
              value
            ))
          )
        }
        else if (
          targetType
          === 'select-one'
        ) {
          setVisited()

          setValue(
            targetValue
          )
        }
        else {
          setValue(
            targetValue
          )
        }

        onChange?.(
          event
        )
      },
      [
        inputValue,
        onChange,
        setValue,
        setVisited,
      ],
    )
  )

  useEffect(
    () => {
      if (
        isCheckboxElement
      ) {
        setVisited()
      }
    },
    [
      isCheckboxElement,
      setVisited,
    ]
  )

  useEffect(
    () => {
      const unregister = (
        register()
      )

      return () => {
        unregister()
      }
    },
    [
      register,
    ]
  )

  return {
    errorMessages,
    fieldName,
    isChecked: (
      isCheckboxElement
      ? (
        value === 'unchecked'
        ? false
        : (
          Boolean(
            value
          )
        )
      )
      : (
        (
          value
          === inputValue
        )
        ? value
        : false
      )
    ),
    isVisited,
    updateFieldValue,
    value: (
      (
        isMultiFieldElement
        && (
          value
          === ''
        )
      )
      ? []
      : (
        inputValue
        || value
      )
    ),
    visitField,
  }
}

export default useField
