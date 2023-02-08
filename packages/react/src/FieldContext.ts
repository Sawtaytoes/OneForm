import {
  ChangeEventHandler,
  createContext,
  FocusEventHandler,
  InputHTMLAttributes,
} from 'react'

export type FieldContextType = {
  'checked': boolean,
  'data-error': (
    | boolean
    | null
  ),
  'data-visited': (
    | boolean
    | null
  ),
  'name': string,
  'onBlur': (
    | (
      FocusEventHandler<
        | HTMLInputElement
        | HTMLSelectElement
      >
    )
    | (
      () => (
        void
      )
    )
  ),
  'onChange': (
    | (
      ChangeEventHandler<
        | HTMLInputElement
        | HTMLSelectElement
      >
    )
    | (
      (
        value: (
          InputHTMLAttributes<
            HTMLInputElement
          >['value']
        ),
      ) => (
        void
      )
    )
  ),
  'value': (
    InputHTMLAttributes<
      HTMLInputElement
    >['value']
  ),
}

export const defaultFieldContextValue: (
  FieldContextType
) = {
  'checked': false,
  'data-error': null,
  'data-visited': null,
  'name': '',
  'onBlur': () => {},
  'onChange': () => {},
  'value': '',
}

export const FieldContext = (
  createContext(
    defaultFieldContextValue
  )
)
