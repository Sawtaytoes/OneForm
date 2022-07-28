import {
  createContext,
} from 'react'

export type FieldGroupType = {
  id: string,
  name: string,
}

export type FieldGroupContextType = {
  fieldGroups: FieldGroupType[]
}

export const defaultFieldGroupContextValue: (
  FieldGroupContextType
) = {
  fieldGroups: [],
}

export const FieldGroupContext = (
  createContext(
    defaultFieldGroupContextValue
  )
)
