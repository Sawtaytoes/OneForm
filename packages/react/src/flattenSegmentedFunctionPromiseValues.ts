export const flattenSegmentedFunctionPromiseValues = (
  segmentedValuesList: (
    () => (
      Promise<
        any
      >
    )
  )[],
) => () => (
  Promise
  .all(
    segmentedValuesList
    .map((
      func,
    ) => (
      func()
    ))
  )
)
