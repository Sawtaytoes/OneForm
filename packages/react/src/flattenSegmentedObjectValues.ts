export const flattenSegmentedObjectValues = <
  ValueType extends (
    Record<
      any,
      any
    >
  )
>(
  segmentedValuesList: (
    ValueType[]
  ),
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
