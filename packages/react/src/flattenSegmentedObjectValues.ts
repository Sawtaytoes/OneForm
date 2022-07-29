export const flattenSegmentedObjectValues = (
  segmentedValuesList: object[],
) => (
  segmentedValuesList
  .reduce(
    (
      combinedValues,
      values,
    ) => ({
      ...combinedValues,
      ...values,
    }),
    {},
  )
)
