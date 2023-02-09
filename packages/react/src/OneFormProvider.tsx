import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import {
  ErrorMessagesContext,
} from './ErrorMessagesContext'
import {
  FieldGroupContext,
} from './FieldGroupContext'
import {
  flattenSegmentedArrayValues,
} from './flattenSegmentedArrayValues'
import {
  flattenSegmentedFunctionObjectValues,
} from './flattenSegmentedFunctionObjectValues'
import {
  flattenSegmentedFunctionPromiseValues,
} from './flattenSegmentedFunctionPromiseValues'
import {
  flattenSegmentedObjectArrayValues,
} from './flattenSegmentedObjectArrayValues'
import {
  flattenSegmentedObjectValues,
} from './flattenSegmentedObjectValues'
import {
  RegistrationContext,
} from './RegistrationContext'
import {
  OnSubmit,
  SubformContext,
} from './SubformContext'
import {
  SubmissionContext,
} from './SubmissionContext'
import {
  Errors,
  useErrorMessagesState
} from './useErrorMessagesState'
import {
  FormChangeState,
  useFormChangeState,
} from './useFormChangeState'
import {
  useFormValidationState,
} from './useFormValidationState'
import {
  useFormVisitationState,
} from './useFormVisitationState'
import {
  GroupValidation,
  useGroupValidationsState,
} from './useGroupValidationsState'
import {
  useRegistrationState,
} from './useRegistrationState'
import {
  useSubformState,
} from './useSubformState'
import {
  useSubmissionState
} from './useSubmissionState'
import {
  useUpdateEffect,
} from './useUpdateEffect'
import {
  useValidationType,
  ValidationType,
} from './useValidationType'
import {
  useValidationsState,
  ValidationsType,
} from './useValidationsState'
import {
  OnChange,
  useValuesState,
  Values,
} from './useValuesState'
import {
  useVisitationState,
} from './useVisitationState'
import {
  ValuesContext,
} from './ValuesContext'
import {
  VisitationContext,
} from './VisitationContext'

export type OneFormProviderProps = {
  children: (
    ReactNode
  ),
  errorMessages?: (
    Errors
  ),
  groupValidations?: (
    GroupValidation[]
  ),
  hasFieldChangeValidation?: (
    boolean
  ),
  onChange?: (
    OnChange
  ),
  onSubmit?: (
    OnSubmit
  ),
  updatedErrorMessages?: (
    Errors
  ),
  updatedValues?: (
    Values<
      any
    >
  ),
  validations?: (
    ValidationsType
  ),
  values?: (
    Values<
      any
    >
  ),
}

const defaultProps = {
  errorMessages: {},
  groupValidations: [],
  hasFieldChangeValidation: true,
  onChange: () => {},
  onSubmit: () => {},
  updatedErrorMessages: {},
  updatedValues: {},
  validations: {},
  values: {},
}

const OneFormProvider = ({
  children,
  errorMessages: rootErrorMessages = (
    defaultProps
    .errorMessages
  ),
  groupValidations: rootGroupValidations = (
    defaultProps
    .groupValidations
  ),
  hasFieldChangeValidation = (
    defaultProps
    .hasFieldChangeValidation
  ),
  onChange: rootOnChange = (
    defaultProps
    .onChange
  ),
  onSubmit: rootOnSubmit = (
    defaultProps
    .onSubmit
  ),
  updatedErrorMessages: rootUpdatedErrorMessages = (
    defaultProps
    .updatedErrorMessages
  ),
  updatedValues: rootUpdatedValues = (
    defaultProps
    .updatedValues
  ),
  validations: rootValidations = (
    defaultProps
    .validations
  ),
  values: rootValues = (
    defaultProps
    .values
  ),
}: (
  OneFormProviderProps
)) => {
  const {
    addValue: addErrorMessages,
    removeValue: removeErrorMessages,
    value: errorMessages,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedObjectArrayValues
      ),
      hasPermanentValues: true,
      value: rootErrorMessages,
    })
  )

  const {
    addValue: addGroupValidations,
    removeValue: removeGroupValidations,
    value: groupValidations,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedArrayValues
      ),
      hasPermanentValues: true,
      value: rootGroupValidations,
    })
  )

  const {
    addValue: addOnChange,
    removeValue: removeOnChange,
    value: onChange,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedFunctionObjectValues
      ),
      hasPermanentValues: true,
      value: rootOnChange,
    })
  )

  const {
    addValue: addOnSubmit,
    removeValue: removeOnSubmit,
    value: onSubmit,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedFunctionPromiseValues
      ),
      hasPermanentValues: true,
      value: rootOnSubmit,
    })
  )

  const {
    addValue: addUpdatedErrorMessages,
    removeValue: removeUpdatedErrorMessages,
    value: updatedErrorMessages,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedObjectArrayValues
      ),
      hasPermanentValues: false,
      value: rootUpdatedErrorMessages,
    })
  )

  const {
    addValue: addUpdatedValues,
    removeValue: removeUpdatedValues,
    value: updatedValues,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedObjectValues
      ),
      hasPermanentValues: false,
      value: rootUpdatedValues,
    })
  )

  const {
    addValue: addValidations,
    removeValue: removeValidations,
    value: validations,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedObjectArrayValues
      ),
      hasPermanentValues: true,
      value: rootValidations,
    })
  )

  const {
    addValue: addValues,
    removeValue: removeValues,
    value: values,
  } = (
    useSubformState({
      flattenSegmentedValues: (
        flattenSegmentedObjectValues
      ),
      hasPermanentValues: true,
      value: rootValues,
    })
  )

  const registerIdentifierForGroupValidationRef = (
    useRef()
  )

  const setFormVisitationStateRef = (
    useRef()
  )

  const validateFieldsRef = (
    useRef()
  )

  const {
    getFormChangeState,
    setFormChangeState,
    subscribeToFormChangeState,
  } = (
    useFormChangeState()
  )

  const {
    getFormValidationState,
    setFormValidationState,
    subscribeToFormValidationState,
  } = (
    useFormValidationState()
  )

  const {
    getValidationType,
    setValidationTypeChange,
    setValidationTypeSubmit,
  } = (
    useValidationType()
  )

  const {
    getAllErrorMessages: getAllFieldErrorMessages,
    getAllErrorMessagesByField,
    getErrorMessages: getFieldErrorMessages,
    setErrorMessages: setFieldErrorMessages,
    subscribeToErrorMessages: subscribeToFieldErrorMessages,
  } = (
    useErrorMessagesState({
      errorMessages,
      onErrorMessages: ({
        errorMessages,
        identifier,
      }) => {
        if (errorMessages) {
          setFieldVisited(
            identifier
          )
        }
      },
      updatedErrorMessages,
    })
  )

  const getAllErrorMessages = (
    useCallback(
      () => (
        Object
        .values(
          getAllFieldErrorMessages()
        )
        .flat()
      ),
      [
        getAllFieldErrorMessages,
      ],
    )
  )

  const updateErrorMessages = (
    useCallback(
      (
        identifiers,
      ) => {
        if (
          (
            (
              getValidationType()
              === (
                ValidationType
                .change
              )
            )
            && hasFieldChangeValidation
          )
          || (
            getValidationType()
            === (
              ValidationType
              .submit
            )
          )
        ) {
          validateFieldsRef
          .current(
            identifiers
          )
        }
      },
      [
        getValidationType,
        hasFieldChangeValidation,
      ],
    )
  )

  const {
    getAllValues: getAllFieldValues,
    getValue: getFieldValue,
    setValue: setFieldValue,
    subscribeToValue: subscribeToFieldValue,
  } = (
    useValuesState({
      onChange: ({
        identifier,
        value,
        values,
      }) => {
        setFormChangeState(
          FormChangeState
          .staged
        )

        const subsequentValues = (
          onChange({
            fieldName: identifier,
            value,
            values,
          })
        )

        const subsequentValueKeys = (
          subsequentValues
          && (
            Object
            .keys(
              subsequentValues
            )
          )
        )

        subsequentValueKeys
        ?.forEach(
          setFieldVisited
        )

        updateErrorMessages([
          identifier,
          ...(
            subsequentValueKeys
            || []
          ),
        ])

        return subsequentValues
      },
      updatedValues,
      values,
    })
  )

  const {
    getAllVisitations: getAllFieldVisitations,
    getIsVisited: getIsFieldVisited,
    resetAllVisitations: resetAllFieldVisitations,
    setVisited: setFieldVisited,
    subscribeToIsVisited: subscribeToIsFieldVisited,
  } = (
    useVisitationState({
      onVisit: (
        identifier,
      ) => {
        updateErrorMessages(
          identifier
        )

        setFormVisitationStateRef
        .current()
      },
    })
  )

  useEffect(
    () => {
      resetAllFieldVisitations()

      const fieldNames = (
        Object
        .keys(
          values
        )
      )

      fieldNames
      .forEach(
        setFieldVisited
      )
    },
    [
      resetAllFieldVisitations,
      setFieldVisited,
      values,
    ],
  )

  useUpdateEffect(
    () => {
      const fieldNames = (
        Object
        .keys(
          values
        )
      )

      fieldNames
      .forEach(
        setFieldVisited
      )
    },
    [
      setFieldVisited,
      updatedValues,
    ],
  )

  const {
    getAllRegistrations: getAllFieldNameRegistrations,
    getIsRegistered: getIsFieldRegistered,
    register: registerFieldName,
  } = (
    useRegistrationState({
      onRegister: (
        identifier,
      ) => {
        registerIdentifierForGroupValidationRef
        .current(
          identifier
        )

        updateErrorMessages(
          identifier
        )
      },
    })
  )

  const getRegisteredFieldNames = (
    useCallback(
      () => (
        Object
        .keys(
          getAllFieldNameRegistrations()
        )
      ),
      [
        getAllFieldNameRegistrations,
      ],
    )
  )

  const getRegisteredFieldValues = (
    useCallback(
      () => (
        Object
        .fromEntries(
          Object
          .keys(
            getAllFieldNameRegistrations()
          )
          .map(
            (fieldName) => [
              fieldName,
              getFieldValue(
                fieldName
              ),
            ]
          )
        )
      ),
      [
        getAllFieldNameRegistrations,
        getFieldValue,
      ],
    )
  )

  const getIsFieldReadyForValidation = (
    useCallback(
      (
        fieldName,
      ) => (
        (
          getIsFieldRegistered(
            fieldName
          )
        )
        && (
          getIsFieldVisited(
            fieldName
          )
        )
      ),
      [
        getIsFieldRegistered,
        getIsFieldVisited,
      ],
    )
  )

  const {
    registerIdentifierForGroupValidation,
    validateGroups,
  } = (
    useGroupValidationsState({
      getAllIdentifiers: (
        getRegisteredFieldNames
      ),
      getIsReadyForValidation: (
        getIsFieldReadyForValidation
      ),
      getValidationType,
      getValue: (
        getFieldValue
      ),
      groupValidations,
      setErrorMessages: (
        setFieldErrorMessages
      ),
    })
  )

  registerIdentifierForGroupValidationRef
  .current = (
    registerIdentifierForGroupValidation
  )

  const {
    validate,
  } = (
    useValidationsState({
      getAllIdentifiers: (
        getRegisteredFieldNames
      ),
      getIsReadyForValidation: (
        getIsFieldReadyForValidation
      ),
      getValidationType,
      getValue: (
        getFieldValue
      ),
      setErrorMessages: (
        setFieldErrorMessages
      ),
      validations,
    })
  )

  const validateFields = (
    useCallback(
      (
        fieldNames,
      ) => {
        validateGroups(
          fieldNames
        )

        validate(
          fieldNames
        )

        const errorMessagesLength = (
          getAllErrorMessages()
          .length
        )

        setFormValidationState({
          errorMessagesLength,
        })
      },
      [
        getAllErrorMessages,
        setFormValidationState,
        validate,
        validateGroups,
      ],
    )
  )

  validateFieldsRef
  .current = (
    validateFields
  )

  const validateAllFields = (
    useCallback(
      () => {
        updateErrorMessages(
          getRegisteredFieldNames()
        )
      },
      [
        getRegisteredFieldNames,
        updateErrorMessages,
      ],
    )
  )

  useEffect(
    () => {
      if (
        validations
        || groupValidations
      ) {
        validateAllFields()
      }
    },
    [
      groupValidations,
      validateAllFields,
      validations,
    ],
  )

  const {
    getFormVisitationState,
    setFormVisitationState,
    setRequiredFieldNames,
    subscribeToFormVisitationState,
  } = (
    useFormVisitationState({
      getAllFieldVisitations,
      getIsFieldVisited,
      getRegisteredFieldNames,
    })
  )

  setFormVisitationStateRef
  .current = (
    setFormVisitationState
  )

  const getIsFormValid = (
    useCallback(
      () => (
        (
          getAllErrorMessages()
          .length
        )
        === 0
      ),
      [
        getAllErrorMessages,
      ],
    )
  )

  const {
    formSubmitted,
    getSubmissionState,
    subscribeToSubmissionState,
  } = (
    useSubmissionState({
      getAllIdentifiers: (
        getAllFieldNameRegistrations
      ),
      getAllValues: (
        getAllFieldValues
      ),
      getIsValid: getIsFormValid,
      onBeforeSubmit: () => {
        Object
        .keys(
          getAllFieldNameRegistrations()
        )
        .forEach(
          setFieldVisited
        )

        setValidationTypeSubmit()
        validateAllFields()
      },
      onInvalidSubmit: () => {
        setValidationTypeChange()
      },
      onSubmit: (
        ...args
      ) => {
        const promise = (
          onSubmit(
            ...args
          )
        )

        setFormChangeState(
          FormChangeState
          .committed
        )

        return (
          promise
        )
      },
    })
  )

  const submitForm = (
    useCallback(
      (
        event,
      ) => {
        event
        ?.preventDefault()

        formSubmitted()
      },
      [
        formSubmitted,
      ],
    )
  )

  const errorMessagesProviderValue = (
    useMemo(
      () => ({
        getFieldErrorMessages,
        setFieldErrorMessages,
        subscribeToFieldErrorMessages,
      }),
      [
        getFieldErrorMessages,
        setFieldErrorMessages,
        subscribeToFieldErrorMessages,
      ],
    )
  )

  const fieldGroupProviderValue = (
    useMemo(
      () => ({
        fieldGroups: [],
      }),
      [],
    )
  )

  const registrationProviderValue = (
    useMemo(
      () => ({
        registerFieldName,
      }),
      [
        registerFieldName,
      ],
    )
  )

  const subformProviderValue = (
    useMemo(
      () => ({
        addErrorMessages,
        addGroupValidations,
        addOnChange,
        addOnSubmit,
        addUpdatedErrorMessages,
        addUpdatedValues,
        addValidations,
        addValues,
        removeErrorMessages,
        removeGroupValidations,
        removeOnChange,
        removeOnSubmit,
        removeUpdatedErrorMessages,
        removeUpdatedValues,
        removeValidations,
        removeValues,
      }),
      [
        addErrorMessages,
        addGroupValidations,
        addOnChange,
        addOnSubmit,
        addUpdatedErrorMessages,
        addUpdatedValues,
        addValidations,
        addValues,
        removeErrorMessages,
        removeGroupValidations,
        removeOnChange,
        removeOnSubmit,
        removeUpdatedErrorMessages,
        removeUpdatedValues,
        removeValidations,
        removeValues,
      ],
    )
  )

  const submissionProviderValue = (
    useMemo(
      () => ({
        getAllFieldValues,
        getErrorMessages: getAllErrorMessages,
        getErrors: getAllErrorMessagesByField,
        getFormChangeState,
        getFormValidationState,
        getFormVisitationState,
        getRegisteredFieldValues,
        getSubmissionState,
        setFormVisitationState,
        setRequiredFieldNames,
        submitForm,
        subscribeToFormChangeState,
        subscribeToFormValidationState,
        subscribeToFormVisitationState,
        subscribeToSubmissionState,
      }),
      [
        getAllFieldValues,
        getAllErrorMessages,
        getAllErrorMessagesByField,
        getFormChangeState,
        getFormValidationState,
        getFormVisitationState,
        getRegisteredFieldValues,
        getSubmissionState,
        setFormVisitationState,
        setRequiredFieldNames,
        submitForm,
        subscribeToFormChangeState,
        subscribeToFormValidationState,
        subscribeToFormVisitationState,
        subscribeToSubmissionState,
      ],
    )
  )

  const valuesProviderValue = (
    useMemo(
      () => ({
        getFieldValue,
        setFieldValue,
        subscribeToFieldValue,
      }),
      [
        getFieldValue,
        setFieldValue,
        subscribeToFieldValue,
      ],
    )
  )

  const visitationProviderValue = (
    useMemo(
      () => ({
        getIsFieldVisited,
        setFieldVisited,
        subscribeToIsFieldVisited,
      }),
      [
        getIsFieldVisited,
        setFieldVisited,
        subscribeToIsFieldVisited,
      ],
    )
  )

  return (
    <ErrorMessagesContext.Provider
      value={errorMessagesProviderValue}
    >
      <FieldGroupContext.Provider
        value={fieldGroupProviderValue}
      >
        <RegistrationContext.Provider
          value={registrationProviderValue}
        >
          <SubformContext.Provider
            value={subformProviderValue}
          >
            <SubmissionContext.Provider
              value={submissionProviderValue}
            >
              <ValuesContext.Provider
                value={valuesProviderValue}
              >
                <VisitationContext.Provider
                  value={visitationProviderValue}
                >
                  {children}
                </VisitationContext.Provider>
              </ValuesContext.Provider>
            </SubmissionContext.Provider>
          </SubformContext.Provider>
        </RegistrationContext.Provider>
      </FieldGroupContext.Provider>
    </ErrorMessagesContext.Provider>
  )
}

const MemoizedOneFormProvider = (
  memo(
    OneFormProvider
  )
)

export {
  MemoizedOneFormProvider as OneFormProvider
}
