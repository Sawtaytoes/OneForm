import PropTypes from 'prop-types'
import {
  memo,
} from 'react'

import Form from './Form.jsx'
import OneFormProvider from './OneFormProvider.jsx'

const propTypes = {
  children: PropTypes.node.isRequired,
  formElementProps: PropTypes.object,
  oneFormProviderProps: PropTypes.object,
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
}) => (
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

OneForm.propTypes = propTypes

const MemoizedOneForm = (
  memo(
    OneForm
  )
)

export default MemoizedOneForm
