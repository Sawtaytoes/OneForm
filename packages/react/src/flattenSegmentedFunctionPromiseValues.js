const flattenSegmentedFunctionPromiseValues = (
  segmentedValuesList,
) => () => ( // Extra function is a hack for `useState`.
  ...args
) => (
  Promise
  .all(
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

export default flattenSegmentedFunctionPromiseValues
