import {
  useContext,
} from 'react'

import FieldContext from './FieldContext.js'

const useSubfield = ({
  inputValue,
}) => {
  const {
    value,
  } = (
    useContext(
      FieldContext
    )
  )

  return {
    isSelected: (
      value
      .includes(
        inputValue
      )
    ),
  }
}

export default useSubfield
