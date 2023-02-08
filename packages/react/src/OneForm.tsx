import {
  memo, ReactNode,
} from 'react'

import {
  Form,
  FormType,
} from './Form'
import {
  OneFormProvider, OneFormProviderProps,
} from './OneFormProvider'

export type OneFormProps = (
  Omit<
    OneFormProviderProps,
    'children'
  >
  & {
    children: (
      ReactNode
    ),
    formElementProps?: (
      Omit<
        FormType,
        'children'
      >
    ),
  }
)

const defaultProps = {
  formElementProps: {},
}

const OneForm = ({
  children,
  formElementProps = (
    defaultProps
    .formElementProps
  ),
  ...oneFormProviderProps
}: (
  OneFormProps
)) => (
  <OneFormProvider
    {...oneFormProviderProps}
  >
    <Form>
      <form
        {...formElementProps}
        role="form"
      >
        {children}
      </form>
    </Form>
  </OneFormProvider>
)

const MemoizedOneForm = (
  memo(
    OneForm
  )
)

export { MemoizedOneForm as OneForm }
