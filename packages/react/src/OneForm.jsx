import PropTypes from 'prop-types'
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import ErrorMessagesContext from './ErrorMessagesContext.js'
import FieldGroupContext from './FieldGroupContext.js'
import RegistrationContext from './RegistrationContext.js'
import SubmissionContext from './SubmissionContext.js'
import useErrorMessagesState from './useErrorMessagesState.js'
import useFormChangeState, {
  formChangeStates,
} from './useFormChangeState.js'
import useFormValidationState from './useFormValidationState.js'
import useFormVisitationState from './useFormVisitationState.js'
import useGroupValidationsState from './useGroupValidationsState.js'
import useRegistrationState from './useRegistrationState.js'
import useSubmissionState from './useSubmissionState.js'
import useUpdateEffect from './useUpdateEffect.js'
import useValidationType, {
  validationTypes,
} from './useValidationType.js'
import useValidationsState from './useValidationsState.js'
import useValuesState from './useValuesState.js'
import useVisitationState from './useVisitationState.js'
import ValuesContext from './ValuesContext.js'
import VisitationContext from './VisitationContext.js'

const propTypes = {
  children: PropTypes.node.isRequired,
  errorMessages: PropTypes.object,
  groupValidations: PropTypes.array,
  hasFieldChangeValidation: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  updatedErrorMessages: PropTypes.object,
  updatedValues: PropTypes.object,
  validations: PropTypes.object,
  values: PropTypes.object,
}

const initialProps = {
  errorMessages: {},
  groupValidations: [],
  hasFieldChangeValidation: true,
  onChange: Function.prototype,
  onSubmit: Function.prototype,
  updatedErrorMessages: {},
  updatedValues: {},
  validations: {},
  values: {},
}

const OneForm = ({
  children,
  errorMessages = (
    initialProps
    .errorMessages
  ),
  groupValidations = (
    initialProps
    .groupValidations
  ),
  hasFieldChangeValidation = (
    initialProps
    .hasFieldChangeValidation
  ),
  onChange = (
    initialProps
    .onChange
  ),
  onSubmit = (
    initialProps
    .onSubmit
  ),
  updatedErrorMessages = (
    initialProps
    .updatedErrorMessages
  ),
  updatedValues = (
    initialProps
    .updatedValues
  ),
  validations = (
    initialProps
    .validations
  ),
  values = (
    initialProps
    .values
  ),
}) => {
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
    getErrorMessages: getFieldErrorMessages,
    setErrorMessages: setFieldErrorMessages,
    subscribeToErrorMessages: subscribeToFieldErrorMessages,
  } = (
    useErrorMessagesState({
      errorMessages,
      onErrorMessages: ({
        identifier,
        value,
      }) => {
        if (value) {
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
                validationTypes
                .change
              )
            )
            && hasFieldChangeValidation
          )
          || (
            getValidationType()
            === (
              validationTypes
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
          formChangeStates
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

      // setFormVisitationStateRef
      // .current()
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

      // setFormVisitationStateRef
      // .current()
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
      getAllFieldNames: (
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
      getAllFieldNames: (
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
        groupValidations
        || validations
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
          formChangeStates
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

  const submissionProviderValue = (
    useMemo(
      () => ({
        getErrorMessages: getAllErrorMessages,
        getFormChangeState,
        getFormValidationState,
        getFormVisitationState,
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
        getAllErrorMessages,
        getFormChangeState,
        getFormValidationState,
        getFormVisitationState,
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
          <SubmissionContext.Provider
            value={submissionProviderValue}
          >
            <ValuesContext.Provider
              value={valuesProviderValue}
            >
              <VisitationContext.Provider
                value={visitationProviderValue}
              >
                <form
                  onSubmit={submitForm}
                  role="form"
                >
                  {children}
                </form>
              </VisitationContext.Provider>
            </ValuesContext.Provider>
          </SubmissionContext.Provider>
        </RegistrationContext.Provider>
      </FieldGroupContext.Provider>
    </ErrorMessagesContext.Provider>
  )
}

OneForm.propTypes = propTypes

const MemoizedOneForm = memo(OneForm)

export default MemoizedOneForm
