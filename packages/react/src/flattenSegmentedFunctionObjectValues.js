import flattenSegmentedObjectValues from './flattenSegmentedObjectValues.js'

const flattenSegmentedFunctionObjectValues = (
  segmentedValuesList,
) => () => ( // Extra function is a hack for `useState`.
  ...args
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

export default flattenSegmentedFunctionObjectValues
