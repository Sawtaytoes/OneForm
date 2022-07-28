import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import {
  ObservableIdentifier,
  ObservableState,
  useObservableState,
} from './useObservableState'

const initialLocalValues = {}
const initialSubsequentValues = {}

export type Values<
  ValueType
> = (
  Record<
    ObservableIdentifier,
    (
      | ValueType
      | undefined
    )
  >
)

export type OnChange<
  ValueType
> = (
  | (
    ({
      identifier,
      value,
      values,
    }: {
      identifier: ObservableIdentifier,
      value: (
        | ValueType
        | undefined
      ),
      values: (
        Values<
          ValueType
        >
      ),
    }) => (
      Values<
        ValueType
      >
    )
  )
  | (
    () => void
  )
)

export type ValuesState<
  ValueType,
> = {
  getAllValues: () => (
    Values<
      ValueType
    >
  ),
  getValue: (
    identifier: ObservableIdentifier,
  ) => (
    | ValueType
    | undefined
  ),
  setValue: (
    identifier: ObservableIdentifier,
    value: (
      | ValueType
      | undefined
    ),
  ) => (
    void
  ),
  subscribeToValue: (
    ObservableState<
      | ValueType
      | undefined
    >["subscribeToValue"]
  ),
}

const defaultProps = {
  onChange: () => {},
  updatedValues: {},
  values: {},
}

export const useValuesState = <
  ValueType
>(
  {
    onChange = (
      defaultProps
      .onChange
    ),
    updatedValues = (
      defaultProps
      .updatedValues
    ),
    values = (
      defaultProps
      .values
    ),
  }: {
    onChange?: (
      OnChange<
        ValueType
      >
    ),
    updatedValues?: (
      Values<
        ValueType
      >
    ),
    values?: (
      Values<
        ValueType
      >
    ),
  } = {}
) => {
  const onChangeRef = (
    useRef(
      onChange
    )
  )

  useEffect(
    () => {
      onChangeRef
      .current = (
        onChange
      )
    },
    [
      onChange,
    ]
  )

  const {
    publishValue,
    subscribeToValue,
  } = (
    useObservableState<
      | ValueType
      | undefined
    >()
  )

  const localValuesRef = (
    useRef<(
      Values<
        ValueType
      >
    )>(
      initialLocalValues
    )
  )

  const getAllLocalValues: (
    ValuesState<
      ValueType
    >["getAllValues"]
  ) = (
    useCallback(
      () => (
        localValuesRef
        .current
      ),
      [],
    )
  )

  const getLocalValue: (
    ValuesState<
      ValueType
    >["getValue"]
  ) = (
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
    useRef<
      Values<
        ValueType
      >
    >(
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

  const setLocalValue: (
    ValuesState<
      ValueType
    >["setValue"]
  ) = (
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
        identifier: ObservableIdentifier,
        value: (
          | ValueType
          | (
            (
              value: ValueType,
            ) => (
              ValueType
            )
          )
        ),
      ) => {
        if (
          typeof value
          === 'function'
        ) {
          setLocalValue(
            identifier,
            value(
              getLocalValue(
                identifier
              )
            ),
          )
        }
        else {
          setLocalValue(
            identifier,
            value,
          )
        }

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
              undefined,
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
