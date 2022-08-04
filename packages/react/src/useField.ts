import {
  SyntheticEvent,
  useCallback,
  useEffect,
} from 'react'

import {
  useFieldData,
} from './useFieldData'
import {
  FieldName,
} from './useFieldName'

/**
 * OneForm's `<Field />` comes with a lot of props to fit all components' needs, but there's no way it'll be suitable for every existing project.
 *
 * That's where `useField` comes into play.
 *
 * `useField` is used by OneForm's `Field` component internally which allows you to build components using the exact same tooling in your own projects.
 *
 * @warning This hook is meant for writing custom <Field /> components. A better option might be `useFieldData` which is designed for generic unopinionated use cases.
 */
const useField = <
  ValueType = string,
>({
  inputValue,
  isCheckboxElement,
  isMultipleElement,
  name,
  onChange,
  onVisit,
}: {
  /** This is only used for checkbox, radio, single-, and multi-select elements; nothing else. */
  inputValue?: (
    | boolean
    | string
  ),

  /** Use for checkboxes. `<input type="checkbox">` has to be handled differently to other input types:
   * 1. The `isChecked` return value is calculated differently for checkboxes because the field value might be a string.
   * 2. Checkboxes could have an `isVisited` state, but that's always set to `true` to allow client-side validation to run before submitting the form.
   *
  */
  isCheckboxElement?: boolean,

  /** Use for multi-select elements. `<select multiple>` has to be handled differently to other input types:
   * 1. The returned `value` is an array.
   * 2. The `isChecked` return value is calculated differently for multi-select because the field value is an array.
   *
  */
  isMultipleElement?: boolean,

  /** Name of your field's OneForm identifier with OneForm. This is typically the input element's `name`. */
  name: FieldName,

  /** Typically, this is your input element's `onChange`. */
  onChange?: (
    event: (
      | SyntheticEvent
      | ValueType
    ),
  ) => (
    void
  ),

  /** Typically, this is your input element's `onBlur`. */
  onVisit?: (
    event: SyntheticEvent,
  ) => (
    void
  ),
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
    useFieldData<
      ValueType
    >({
      name,
    })
  )

  const visitField = (
    useCallback(
      (
        event: SyntheticEvent,
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
        event: (
          | SyntheticEvent
          | ValueType
        ),
      ) => {
        if (
          (
            typeof event
            !== 'object'
          )
          || (
            event
            === null
          )
          || (
            !(
              'currentTarget'
              in event
            )
          )
        ) {
          setValue(
            event
          )
        }
        else {
          const {
            checked: isTargetChecked,
            selectedOptions: targetSelectedOptions,
            type: targetType,
            value: targetValue,
          } = (
            (
              event
              ?.currentTarget
            ) as (
              HTMLInputElement
              & HTMLSelectElement
            )
            || {}
          )

          if (
            targetType
            === 'checkbox'
          ) {
            setVisited()

            setValue((
              value,
            ) => {
              if (
                isMultipleElement
                || (
                  Array
                  .isArray(
                    value
                  )
                )
              ) {
                const valueArray = (
                  (
                    (
                      Array
                      .isArray(
                        value
                      )
                    )
                    ? value
                    : (
                      [] as (
                        string[]
                      )
                    )
                  )
                )

                return (
                  isTargetChecked
                  ? (
                    valueArray
                    .concat(
                      targetValue
                    )
                  )
                  : (
                    valueArray
                    .filter((
                      subValue,
                    ) => (
                      subValue
                      !== targetValue
                    ))
                  )
                )
              }
              else if (
                (
                  inputValue
                  === undefined
                )
                || (
                  typeof value
                  === 'boolean'
                )
              ) {
                return isTargetChecked
              }
              else {
                return (
                  isTargetChecked
                  ? (
                    inputValue
                    || targetValue
                  )
                  : ''
                )
              }
            })
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
        }

        onChange?.(
          event
        )
      },
      [
        inputValue,
        isMultipleElement,
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
        (
          isMultipleElement
          && (
            Array
            .isArray(
              value
            )
          )
        )
        ? (
          value
          .includes(
            inputValue
          )
        )
        : (
          (
            value
            === 0
          )
          || (
            Boolean(
              value
            )
          )
        )
      )
      : (
        (
          value
          === inputValue
        )
        ? (
          (
            value
            === 0
          )
          || (
            Boolean(
              value
            )
          )
        )
        : false
      )
    ),
    isVisited,
    updateFieldValue,
    value: (
      (
        isMultipleElement
        && (
          value
          === ''
        )
        && (
          (
            inputValue
            === ''
          )
          || (
            inputValue
            === null
          )
          || (
            inputValue
            === undefined
          )
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
