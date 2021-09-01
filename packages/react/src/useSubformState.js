import {
  useCallback,
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

        console.log(
          segmentedValuesRef
          .current
        );

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
      if (
        value
        && (
          typeof value
          !== 'function'
        )
      ) {
        addValue(
          'root',
          value,
        )
      }

      return () => {
        removeValue(
          'root',
        )
      }
    },
    [
      addValue,
      removeValue,
      value,
    ]
  )

  return {
    addValue,
    removeValue,
    value: localValue,
  }
}

export default useSubformState
