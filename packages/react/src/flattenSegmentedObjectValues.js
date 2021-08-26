const flattenSegmentedObjectValues = (
  segmentedValuesList,
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

export default flattenSegmentedObjectValues
