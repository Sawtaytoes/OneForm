import {
  useCallback,
} from 'react'

import {
  FieldName,
} from './useFieldName'
import useStrippedIdentifer from './useStrippedIdentifer'
import useUpdateEffect from './useUpdateEffect'

export const validationsSymbol = (
  Symbol()
)

export type ValidationsType = {
  [fieldName: string]: {
    errorMessage: string,
    getIsValid: (value: any) => boolean
  }
}

const defaultProps = {
  getAllIdentifiers: (
    () => []
  ),
  getIsReadyForValidation: (
    () => {}
  ),
  getValidationType: (
    () => {}
  ),
  getValue: (
    () => {}
  ),
  setErrorMessages: (
    () => {}
  ),
  validations: (
    {}
  ),
}

export const useValidationsState = (
  {
    getAllIdentifiers = (
      defaultProps
      .getAllIdentifiers
    ),
    getIsReadyForValidation = (
      defaultProps
      .getIsReadyForValidation
    ),
    getValidationType = (
      defaultProps
      .getValidationType
    ),
    getValue = (
      defaultProps
      .getValue
    ),
    setErrorMessages = (
      defaultProps
      .setErrorMessages
    ),
    validations = (
      defaultProps
      .validations
    ),
  }: {
    getAllIdentifiers?: () => (
      FieldName[]
    ),
    getIsReadyForValidation?: () => (
      void
    ),
    getValidationType?: () => (
      void
    ),
    getValue?: () => (
      void
    ),
    setErrorMessages?: () => (
      void
    ),
    validations?: ValidationsType,
  } = {}
) => {
  const {
    getStrippedIdentifierData,
  } = (
    useStrippedIdentifer()
  )

  const getValidationErrorMessages = (
    useCallback(
      ({
        identifier,
        strippedIdentifier,
      }) => (
        (
          (
            validations
            [strippedIdentifier]
          )
          || []
        )
        .filter(({
          getIsValid,
        }) => (
          !(
            getIsValid({
              identifier,
              validationType: (
                getValidationType()
              ),
              value: (
                getValue(
                  identifier
                )
              ),
            })
          )
        ))
        .map(({
          errorMessage,
        }) => (
          errorMessage
          || true
        ))
      ),
      [
        getValidationType,
        getValue,
        validations,
      ],
    )
  )

  const validate = (
    useCallback(
      (
        identifiers,
      ) => {
        (
          (
            Array
            .isArray(
              identifiers
            )
          )
          ? identifiers
          : [
            identifiers,
          ]
        )
        .filter(
          getIsReadyForValidation
        )
        .map(
          getStrippedIdentifierData
        )
        .map(({
          identifier,
          strippedIdentifier,
        }) => ({
          errorMessages: (
            getValidationErrorMessages({
              identifier,
              strippedIdentifier,
            })
          ),
          identifier,
        }))
        .forEach(({
          errorMessages,
          identifier,
        }) => {
          setErrorMessages(
            identifier,
            {
              errorMessages,
              symbol: validationsSymbol,
            },
          )
        })
      },
      [
        getIsReadyForValidation,
        getStrippedIdentifierData,
        getValidationErrorMessages,
        setErrorMessages,
      ],
    )
  )

  useUpdateEffect(
    () => {
      validate(
        getAllIdentifiers()
      )
    },
    [
      getAllIdentifiers,
      validate,
      // We're listening to this value to tigger an update even if we don't use it.
      validations,
    ]
  )

  return {
    validate,
  }
}
