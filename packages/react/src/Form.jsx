import PropTypes from 'prop-types'
import {
  Children,
  cloneElement,
  memo,
  useMemo,
} from 'react'

import useFormSubmission from './useFormSubmission.js'

const propTypes = {
  children: PropTypes.node.isRequired,
  translateProps: PropTypes.func,
}

const Form = ({
  children,
  translateProps = (
    Function
    .prototype
  ),
}) => {
  const {
    submitForm,
  } = (
    useFormSubmission()
  )

  const childProps = (
    useMemo(
      () => (
        (
          translateProps({
            submitForm,
          })
        )
        || {
          onSubmit: submitForm,
        }
      ),
      [
        submitForm,
        translateProps,
      ],
    )
  )

  return (
    cloneElement(
      (
        Children
        .only(
          children
        )
      ),
      childProps,
    )
  )
}

Form.propTypes = propTypes

const MemoizedForm = memo(Form)

export default MemoizedForm
