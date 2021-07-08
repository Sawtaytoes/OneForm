import {
  useContext,
} from 'solid-js'

import ValuesContext from './ValuesContext.js'

const useFieldValue = ({
  name,
}) => {
  const {
    getFieldValue,
  } = (
    useContext(
      ValuesContext
    )
  )

  const {
    getValue,
    setValue,
  } = (
    getFieldValue(
      name
    )
  )

  return {
    getValue,
    setValue,
  }
}

export default useFieldValue
