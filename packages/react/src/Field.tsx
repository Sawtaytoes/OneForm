import {
  Children,
  cloneElement,
  JSXElementConstructor,
  memo,
  ReactElement,
  useMemo,
} from 'react'

import {
  FieldContext,
} from './FieldContext'
import {
  useField,
} from './useField'
import {
  useIsCheckboxElement,
} from './useIsCheckboxElement'
import {
  useIsMultipleElement,
} from './useIsMultipleElement'


declare function FieldType<
  TranslatePropsReturnType
>(
  props: {
    children: (
      ReactElement<
        JSXElementConstructor<{
          name: string,
          onBlur?: () => void,
          onChange?: () => void,
          value?: string,
        }>
      >
    ),
    isCheckboxElement?: boolean,
    isMultipleElement?: boolean,
    translateProps?: (
      props: (
        ReturnType<
          typeof useField<
            string
          >
        >
      )
    ) => (
      | TranslatePropsReturnType
      | void
    ),
  }
): (
  JSX
  .Element
)

type FieldType = typeof FieldType

const defaultProps = {
  translateProps: () => {}
}

const Field: FieldType = ({
  children,
  isCheckboxElement = false,
  isMultipleElement = false,
  translateProps = (
    defaultProps
    .translateProps
  ),
}) => {
  const {
    name,
    // @ts-expect-error ts(2339)
    onBlur: onVisit,
    // @ts-expect-error ts(2339)
    onChange,
    // This should only be relevant to checkboxes and radio buttons.
    // @ts-expect-error ts(2339)
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
    setValue,
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
      }),
      [
        errorMessages,
        fieldName,
        isChecked,
        isVisited,
        updateFieldValue,
        value,
        visitField,
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
            setValue,
            updateFieldValue,
            value,
            visitField,
          })
        )
        || providerValue
      ),
      [
        errorMessages,
        fieldName,
        isChecked,
        isVisited,
        providerValue,
        setValue,
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

const MemoizedField = (
  memo(
    Field
  )
)

export {
  MemoizedField as Field,
}
