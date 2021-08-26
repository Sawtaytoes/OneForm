const flattenSegmentedObjectArrayValues = (
  segmentedValuesList,
) => (
  Object
  .fromEntries(
    segmentedValuesList
    .map((
      segmentedValues,
    ) => (
      Object
      .entries(
        segmentedValues
      )
    ))
    .flat()
    .reduce(
      (
        combinedValues,
        [
          key,
          values,
        ],
      ) => (
        new Map(
          combinedValues
        )
        .set(
          key,
          (
            combinedValues
            .has(
              key
            )
            ? (
              combinedValues
              .get(
                key
              )
              .concat(
                values
              )
            )
            : values
          )
        )
      ),
      new Map(),
    )
  )
)

export default flattenSegmentedObjectArrayValues
