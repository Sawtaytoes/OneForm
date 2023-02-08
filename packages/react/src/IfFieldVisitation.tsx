import {
  Fragment,
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

const IfFieldVisitation = ({
  children,
  fallback = null,
  name,
}: (
  IfFieldVisitationProps
)) => {
  const {
    isVisited,
  } = (
    useFieldVisitation({
      name,
    })
  )

  return (
    <Fragment>
      {
        isVisited
        ? children
        : fallback
      }
    </Fragment>
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
