import {
  useEffect,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import {
  useFieldRegistration,
} from './useFieldRegistration'

const useRegisteredFieldEffect = ({
  name,
}: {
  name: FieldName
}) => {
  const {
    register,
  } = (
    useFieldRegistration({
      name,
    })
  )

  useEffect(
    () => {
      const unregister = (
        register()
      )

      return () => {
        unregister()
      }
    },
    [
      register,
    ]
  )
}

export default useRegisteredFieldEffect
