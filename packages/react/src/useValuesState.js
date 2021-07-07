import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import useObservableState from './useObservableState.js'

const initialValues = {}
const initialLocalValues = {}
const initialSubsequentValues = {}

const useValuesState = (
  {
    onChange = (
      Function
      .prototype
    ),
    updatedValues = (
      initialValues
    ),
    values = (
      initialValues
    ),
  } = {}
) => {
  const onChangeRef = (
    useRef()
  )

  onChangeRef
  .current = (
    onChange
  )

  const {
    publishValue,
    subscribeToValue,
  } = (
    useObservableState()
  )

  const localValuesRef = (
    useRef(
      initialLocalValues
    )
  )

  const getAllLocalValues = (
    useCallback(
      () => (
        localValuesRef
        .current
      ),
      [],
    )
  )

  const getLocalValue = (
    useCallback(
      (
        identifier,
      ) => (
        getAllLocalValues()
        [identifier]
      ),
      [
        getAllLocalValues,
      ],
    )
  )

  const subsequentValuesRef = (
    useRef(
      initialSubsequentValues
    )
  )

  const queueSubsequentChanges = (
    useCallback(
      (
        subsequentValues,
      ) => {
        subsequentValuesRef
        .current = {
          ...(
            subsequentValuesRef
            .current
          ),
          ...subsequentValues,
        }
      },
      [],
    )
  )

  const setLocalValue = (
    useCallback(
      (
        identifier,
        value,
      ) => {
        if (
          value
          === (
            localValuesRef
            .current
            [identifier]
          )
        ) {
          return
        }

        if (
          value
          === undefined
        ) {
          const copiedAllLocalValues = {
            ...getAllLocalValues(),
          }

          Reflect
          .deleteProperty(
            copiedAllLocalValues,
            identifier,
          )

          localValuesRef
          .current = (
            copiedAllLocalValues
          )
        }
        else {
          localValuesRef
          .current = {
            ...getAllLocalValues(),
            [identifier]: (
              value
            ),
          }
        }

        queueSubsequentChanges(
          onChangeRef
          .current({
            identifier,
            value,
            values: (
              getAllLocalValues()
            ),
          })
        )

        publishValue(
          identifier,
          value,
        )
      },
      [
        getAllLocalValues,
        publishValue,
        queueSubsequentChanges,
      ],
    )
  )

  const processSubsequentChanges = (
    useCallback(
      () => {
        const subsequentValue = (
          Object
          .entries(
            subsequentValuesRef
            .current
          )
          .find(
            Boolean
          )
        )

        if (!subsequentValue) {
          return
        }

        const [
          identifier,
          value,
        ] = (
          subsequentValue
        )

        subsequentValuesRef
        .current = {
          ...(
            subsequentValuesRef
            .current
          ),
        }

        Reflect
        .deleteProperty(
          (
            subsequentValuesRef
            .current
          ),
          identifier,
        )

        setLocalValue(
          identifier,
          value,
        )

        processSubsequentChanges()
      },
      [
        setLocalValue,
      ],
    )
  )

  const changeLocalValue = (
    useCallback(
      (
        identifier,
        value,
      ) => {
        typeof value === 'function'
        ? (
          setLocalValue(
            identifier,
            value(
              getLocalValue(
                identifier
              )
            ),
          )
        )
        : (
          setLocalValue(
            identifier,
            value,
          )
        )

        processSubsequentChanges()
      },
      [
        getLocalValue,
        processSubsequentChanges,
        setLocalValue,
      ],
    )
  )

  useEffect(
    () => {
      Object
      .entries({
        ...(
          Object
          .fromEntries(
            Object
            .entries(
              localValuesRef
              .current
            )
            .map(([
              identifier,
            ]) => ([
              identifier,
            ]))
          )
        ),
        ...values,
      })
      .forEach(([
        identifier,
        value,
      ]) => {
        setLocalValue(
          identifier,
          value,
        )
      })

      processSubsequentChanges()
    },
    [
      processSubsequentChanges,
      setLocalValue,
      values,
    ],
  )

  useEffect(
    () => {
      Object
      .entries(
        updatedValues
      )
      .forEach(([
        identifier,
        value,
      ]) => {
        setLocalValue(
          identifier,
          value,
        )
      })

      processSubsequentChanges()
    },
    [
      processSubsequentChanges,
      setLocalValue,
      updatedValues,
    ],
  )

  return {
    getAllValues: getAllLocalValues,
    getValue: getLocalValue,
    setValue: changeLocalValue,
    subscribeToValue: subscribeToValue,
  }
}

export default useValuesState
