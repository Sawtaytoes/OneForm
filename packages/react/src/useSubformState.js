import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import useUpdateEffect from './useUpdateEffect.js'

const initialSegmentedValues = (
  new Map()
)

const initialFlattenSegmentedValues = (
  Function
  .prototype
)

const useSubformState = (
  {
    flattenSegmentedValues = (
      initialFlattenSegmentedValues
    ),
    hasPermanentValues = false,
    value,
  } = {}
) => {
  const segmentedValuesRef = (
    useRef(
      initialSegmentedValues
    )
  )

  const valueRef = (
    useRef()
  )

  valueRef
  .current = (
    value
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
        setLocalValue(
          flattenSegmentedValues(
            Array
            .from(
              segmentedValuesRef
              .current
              .values()
            )
          )
        )
      },
      [
        flattenSegmentedValues,
      ],
    )
  )

  const addValue = (
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

  const removeValue = (
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
    useRef()
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

export default useSubformState
