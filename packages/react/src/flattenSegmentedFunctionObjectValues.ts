import {
  flattenSegmentedObjectValues,
} from './flattenSegmentedObjectValues'

export const flattenSegmentedFunctionObjectValues = (
  segmentedValuesList: (
    () => object
  )[],
) => () => (
  flattenSegmentedObjectValues(
    segmentedValuesList
    .map((
      func,
    ) => (
      func()
    ))
  )
)
