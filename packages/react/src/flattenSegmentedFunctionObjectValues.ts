import {
  flattenSegmentedObjectValues,
} from './flattenSegmentedObjectValues'

export const flattenSegmentedFunctionObjectValues = <
  FunctionArgumentsType extends any[]
>(
  segmentedValuesList: (
    (
      ...args: FunctionArgumentsType
    ) => (
      object
    )
  )[],
) => (
  ...args: FunctionArgumentsType
) => (
  flattenSegmentedObjectValues(
    segmentedValuesList
    .map((
      func,
    ) => (
      func(
        ...args
      )
    ))
  )
)
