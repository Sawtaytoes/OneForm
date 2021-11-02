import {
  createContext,
} from 'react'

const SubformContext = (
  createContext({
    addErrorMessages: () => {},
    addGroupValidations: () => {},
    addOnChange: () => {},
    addOnSubmit: () => {},
    addUpdatedErrorMessages: () => {},
    addUpdatedValues: () => {},
    addValidations: () => {},
    addValues: () => {},
    removeErrorMessages: () => {},
    removeGroupValidations: () => {},
    removeOnChange: () => {},
    removeOnSubmit: () => {},
    removeUpdatedErrorMessages: () => {},
    removeUpdatedValues: () => {},
    removeValidations: () => {},
    removeValues: () => {},
  })
)

export default SubformContext
