import {
  memo, ReactNode,
} from 'react'

import {
  Form,
  FormType,
} from './Form'
import {
  OneFormProvider ,
} from './OneFormProvider '

export type OneFormProps = {
  children: ReactNode,
  formElementProps?: Omit<FormType, 'children'>,
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
