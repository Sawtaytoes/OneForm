import {
  FunctionComponent,
  memo,
  ReactNode,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import {
  useFieldVisitation,
} from './useFieldVisitation'

export type IfFieldVisitationProps = {
  children: ReactNode,
  fallback?: ReactNode,
  name: FieldName,
}

const IfFieldVisitation: (
  FunctionComponent<
    IfFieldVisitationProps
  >
) = ({
  children,
  fallback = null,
  name,
}) => {
  const {
    isVisited,
  } = (
    useFieldVisitation({
      name,
    })
  )

  return (
    isVisited
    ? children
    : fallback
  )
}

const MemoizedIfFieldVisitation = (
  memo(
    IfFieldVisitation
  )
)

export {
  MemoizedIfFieldVisitation as IfFieldVisitation
}
