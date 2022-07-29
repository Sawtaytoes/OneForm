import {
  useEffect,
} from 'react'

import {
  useFieldRegistration,
} from './useFieldRegistration'

const useRegisteredFieldEffect = ({
  name,
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
