export const flattenSegmentedFunctionPromiseValues = <
  FunctionArgumentsType extends any[],
  PromiseValueType
>(
  segmentedValuesList: (
    (
      ...args: FunctionArgumentsType
    ) => (
      Promise<
        PromiseValueType
      >
    )
  )[],
) => (
  ...args: FunctionArgumentsType
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
