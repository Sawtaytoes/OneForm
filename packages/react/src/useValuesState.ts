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

// export type NotUndefined = (
//   | {} // Accounts for all non-nullable.
//   | null
// )

export type Values<
  ValueType,
> = (
  Record<
    ObservableIdentifier,
    ValueType
  >
)

export type OnChange<
  ValueType = any
> = (
  | (
    ({
      identifier,
      value,
      values,
    }: {
      identifier: (
        ObservableIdentifier
      ),
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
    identifier: (
      ObservableIdentifier
    ),
  ) => (
    | ValueType
  ),
  setValue: (
    identifier: (
      ObservableIdentifier
    ),
    value: (
      | ValueType
      | (
        (
          value: (
            | ValueType
          ),
        ) => (
          | ValueType
        )
      )
    ),
  ) => (
    void
  ),
  subscribeToValue: (
    ObservableState<
      | ValueType
    >["subscribeToValue"]
  ),
}

const initialLocalValues = {}
const initialSubsequentValues = {}

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
        subsequentValues: (
          | (
            Values<
              ValueType
            >
          )
          | void
        ),
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
        identifier: (
          ObservableIdentifier
        ),
        value: (
          ValueType
        ),
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

        localValuesRef
        .current = {
          ...getAllLocalValues(),
          [identifier]: (
            value
          ),
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

  const deleteLocalValue = (
    useCallback(
      (
        identifier: (
          ObservableIdentifier
        ),
      ) => {
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

        const value = undefined

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
        getLocalValue,
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

  const configureLocalValue = (
    useCallback(
      (
        identifier: (
          ObservableIdentifier
        ),
        value: (
          | ValueType
          | undefined
        ),
      ) => {
        (
          value
          === undefined
        )
        ? (
          deleteLocalValue(
            identifier
          )
        )
        : (
          setLocalValue(
            identifier,
            value,
          )
        )
      },
      [
        deleteLocalValue,
        setLocalValue,
      ],
    )
  )

  const changeLocalValue: (
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
          (
            typeof value
            === 'function'
          )
        ) {
          configureLocalValue(
            identifier,
            (
              (value as (value: ValueType) => ValueType)(
                getLocalValue(
                  identifier
                )
              )
            ),
          )
        }
        else {
          configureLocalValue(
            identifier,
            value,
          )
        }

        processSubsequentChanges()
      },
      [
        configureLocalValue,
        getLocalValue,
        processSubsequentChanges,
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
        configureLocalValue(
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
        configureLocalValue(
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

  const returnValue: (
    ValuesState<
      ValueType
    >
  ) = {
    getAllValues: (
      getAllLocalValues
    ),
    getValue: (
      getLocalValue
    ),
    setValue: (
      changeLocalValue
    ),
    subscribeToValue,
  }

  return returnValue
}
