import {
  useCallback,
  useLayoutEffect,
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
    values,
  } = {}
) => {
  const segmentedValuesRef = (
    useRef(
      initialSegmentedValues
    )
  )

  const valuesRef = (
    useRef()
  )

  valuesRef
  .current = (
    values
  )

  const initialValues = (
    useMemo(
      () => (
        (
          typeof (
            valuesRef
            .current
          )
          === 'function'
        )
        ? (
          () => (
            valuesRef
            .current
          )
        )
        : (
          valuesRef
          .current
        )
      ),
      [],
    )
  )

  useLayoutEffect(
    () => {
      segmentedValuesRef
      .current = (
        new Map(
          segmentedValuesRef
          .current
        )
        .set(
          'root',
          initialValues,
        )
      )
    },
    [
      initialValues,
    ],
  )

  const [
    localValues,
    setLocalValues,
  ] = (
    useState(
      initialValues
    )
  )

  const updateLocalValues = (
    useCallback(
      () => {
        setLocalValues(
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

  const addValues = (
    useCallback(
      (
        identifier,
        values,
      ) => {
        segmentedValuesRef
        .current = (
          new Map(
            segmentedValuesRef
            .current
          )
          .set(
            identifier,
            values,
          )
        )

        updateLocalValues()
      },
      [
        updateLocalValues,
      ],
    )
  )

  const removeValues = (
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

        updateLocalValues()
      },
      [
        updateLocalValues,
      ],
    )
  )

  useUpdateEffect(
    () => {
      if (
        values
        && (
          typeof values
          !== 'function'
        )
      ) {
        addValues(
          'root',
          values,
        )
      }

      return () => {
        removeValues(
          'root',
        )
      }
    },
    [
      addValues,
      removeValues,
      values,
    ]
  )

  return {
    addValues,
    removeValues,
    values: localValues,
  }
}

export default useSubformState
