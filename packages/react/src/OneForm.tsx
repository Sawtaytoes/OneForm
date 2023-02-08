import {
  memo, ReactNode,
} from 'react'

import { Form } from './Form'
import OneFormProvider from './OneFormProvider'

export type OneFormType = {
  children: ReactNode,
  formElementProps?: Record<any, any>,
  oneFormProviderProps?: Record<any, any>,
}

const defaultProps = {
  formElementProps: {},
  oneFormProviderProps: {},
}

const OneForm = ({
  children,
  formElementProps = (
    defaultProps
    .formElementProps
  ),
  ...oneFormProviderProps
}: (
  OneFormType
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
