import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  FieldName,
} from './useFieldName'

import {
  useUpdateEffect,
} from './useUpdateEffect'

const initialSegmentedValues = (
  new Map()
)

export type SubformState<
  ValueType,
> = {
  addValue: (
    identifier: FieldName,
    value: ValueType,
  ) => (
    void
  ),
  removeValue: (
    identifier: FieldName,
  ) => (
    void
  ),
  value: ValueType,
}

export const useSubformState = <
  ValueType
>({
  flattenSegmentedValues,
  hasPermanentValues = false,
  value,
}: {
  flattenSegmentedValues: (
    segmentedValues: ValueType[],
  ) => (
    ValueType
  ),
  hasPermanentValues: (
    boolean
  ),
  value: (
    ValueType
  ),
}) => {
  const segmentedValuesRef = (
    useRef<
      Map<
        FieldName,
        ValueType
      >
    >(
      initialSegmentedValues
    )
  )

  const valueRef = (
    useRef(
      value
    )
  )

  useEffect(
    () => {
      valueRef
      .current = (
        value
      )
    },
    [
      value,
    ],
  )

  // This function initializes without updating the already-initialized `localValue`.
  // `useMemo` side-effect because `useLayoutEffect` doesn't run on the server.
  useMemo(
    () => {
      segmentedValuesRef
      .current = (
        new Map(
          segmentedValuesRef
          .current
        )
        .set(
          'root',
          (
            valueRef
            .current
          ),
        )
      )
    },
    [],
  )

  const initialRootValue = (
    useMemo(
      () => (
        (
          typeof (
            valueRef
            .current
          )
          === 'function'
        )
        ? (
          () => (
            valueRef
            .current
          )
        )
        : (
          valueRef
          .current
        )
      ),
      [],
    )
  )

  const [
    localValue,
    setLocalValue,
  ] = (
    useState(
      initialRootValue
    )
  )

  const updateLocalValue = (
    useCallback(
      () => {
        setLocalValue(() => (
          flattenSegmentedValues(
            Array
            .from(
              segmentedValuesRef
              .current
              .values()
            )
          )
        ))
      },
      [
        flattenSegmentedValues,
      ],
    )
  )

  const addValue: (
    SubformState<
      ValueType
    >["addValue"]
  ) = (
    useCallback(
      (
        identifier,
        value,
      ) => {
        segmentedValuesRef
        .current = (
          new Map(
            segmentedValuesRef
            .current
          )
          .set(
            identifier,
            value,
          )
        )

        updateLocalValue()
      },
      [
        updateLocalValue,
      ],
    )
  )

  const removeValue: (
    SubformState<
      ValueType
    >["removeValue"]
  ) = (
    useCallback(
      (
        identifier,
      ) => {
        segmentedValuesRef
        .current = (
          new Map(
            segmentedValuesRef
            .current
          )
        )

        segmentedValuesRef
        .current
        .delete(
          identifier,
        )

        updateLocalValue()
      },
      [
        updateLocalValue,
      ],
    )
  )

  useUpdateEffect(
    () => {
      if (value) {
        addValue(
          'root',
          value,
        )
      }
    },
    [
      addValue,
      value,
    ]
  )

  const hasPermanentValuesRef = (
    useRef(
      hasPermanentValues
    )
  )

  useEffect(() => {
    hasPermanentValuesRef
    .current = (
      hasPermanentValues
    )
  })

  useUpdateEffect(
    () => {
      if (
        localValue
        && (
          !(
            hasPermanentValuesRef
            .current
          )
        )
      ) {
        segmentedValuesRef
        .current = (
          new Map()
        )
      }
    },
    [
      // We only want this to run when `localValue` changes.
      localValue,
    ]
  )

  return {
    addValue,
    removeValue,
    value: localValue,
  }
}
