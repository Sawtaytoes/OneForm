import PropTypes from 'prop-types'
import { createSignal } from 'solid-js'

import ValuesContext from './ValuesContext'

const propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}

const OneForm = (
  props
) => {
  const [
    getLocalValues,
    setLocalValues,
  ] = (
    createSignal({})
  )

  const fieldChanged = (
    identifier,
    value,
  ) => {
    console.log(
      'field changed',
      identifier,
      value,
    )
  }

  const getFieldValue = (
    identifier,
  ) => {
    if (
      getLocalValues()
      [identifier]
    ) {
      return (
        getLocalValues()
        [identifier]
      )
    }
    else {
      const [
        getValue,
        setValue,
      ] = (
        createSignal()
      )

      const valueState = {
        getValue,
        setValue: (
          value,
        ) => {
          fieldChanged(
            identifier,
            value,
          )

          setValue(
            value
          )
        },
      }

      setLocalValues((
        localValues,
      ) => ({
        ...localValues,
        [identifier]: (
          valueState
        ),
      }))

      return valueState
    }
  }

  const submitForm = (
    event,
  ) => {
    event
    .preventDefault()

    props
    .onSubmit({
      allFields: getLocalValues(),
      registeredFields: getLocalValues(),
    })
  }

  return (
    <ValuesContext.Provider
      value={{
        getFieldValue,
      }}
    >
      <form
        onSubmit={submitForm}
        role="form"
      >
        {
          props
          .children
        }
      </form>
    </ValuesContext.Provider>
  )
}

OneForm.propTypes = propTypes

export default OneForm
