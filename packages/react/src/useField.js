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
          selectedOptions: targetInputSelectedOptions,
          type: targetInputType,
          value: targetInputValue,
        } = (
          event
          .target
        )

        if (
          targetInputType
          === 'checkbox'
        ) {
          setVisited()

          setValue(
            isTargetChecked
            ? (
              inputValue
              || isTargetChecked
            )
            : isTargetChecked
          )
        }
        else if (
          targetInputType
          === 'radio'
        ) {
          setVisited()

          setValue(
            inputValue
            || targetInputValue
          )
        }
        else if (
          targetInputType
          === 'select-multiple'
        ) {
          setVisited()

          setValue(
            Array
            .from(
              targetInputSelectedOptions
            )
            .map(({
              value,
            }) => (
              value
            ))
          )
        }
        else if (
          targetInputType
          === 'select-one'
        ) {
          setVisited()

          setValue(
            targetInputValue
          )
        }
        else {
          setValue(
            targetInputValue
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
        Boolean(
          value
        )
        || false
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
