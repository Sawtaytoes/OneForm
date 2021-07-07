import {
  useCallback,
  useEffect,
} from 'react'

import useFieldData from './useFieldData.js'
import useIsHtmlElement from './useIsHtmlElement.js'

const checkboxRegex = (
  /.*checkbox.*/i
)

const useField = ({
  children,
}) => {
  const {
    name,
    onBlur: onVisit,
    onChange,
    type: inputType,
    // Unless `children` is a radio button, the `value` prop should never be set.
    value: inputValue,
  } = (
    children
    .props
  )

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

  const isHtmlElement = (
    useIsHtmlElement(
      children
    )
  )

  useEffect(
    () => {
      const isCheckbox = (
        isHtmlElement
        ? (
          inputType
          === 'checkbox'
        )
        : (
          checkboxRegex
          .test(
            (
              children
              ?.displayName
            )
            || (
              children
              ?.type
              ?.displayName
            )
          )
        )
      )

      if (
        isCheckbox
      ) {
        setVisited()
      }
    },
    [
      children,
      inputType,
      isHtmlElement,
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
      inputValue
      ? (
        value
        === inputValue
      )
      : null
    ),
    isHtmlElement,
    isVisited: (
      isVisited
      ? 'true'
      : ''
    ),
    updateFieldValue,
    value: (
      (
        (
          children
          .props
          .multiple
        )
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
