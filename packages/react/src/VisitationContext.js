import {
  createContext,
} from 'react'

const VisitationContext = (
  createContext({
    getIsFieldVisited: () => {},
    setFieldVisited: () => {},
    subscribeToIsFieldVisited: () => {},
  })
)

export default VisitationContext
