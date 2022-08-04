import {
  useCallback,
  useEffect,
  useRef,
} from 'react'

import {
  FieldName,
} from './useFieldName'

export type Unregister = () => (
  void
)

export type Registrations = (
  Record<
    string,
    number
  >
)

export type RegistrationState = {
  getAllRegistrations: () => (
    Registrations
  ),
  getIsRegistered: () => (
    boolean
  ),
  register: (
    identifier: (
      FieldName
    ),
  ) => (
    Unregister
  ),
}

const initialRegistrations = {}

const defaultProps = {
  onRegister: (
    () => {}
  ),
  onUnregister: (
    () => {}
  ),
}

export const useRegistrationState = (
  {
    onRegister = (
      defaultProps
      .onRegister
    ),
    onUnregister = (
      defaultProps
      .onUnregister
    ),
  }: {
    onRegister?: (
      identifier: (
        FieldName
      )
    ) => (
      void
    ),
    onUnregister?: (
      identifier: (
        FieldName
      )
    ) => (
      void
    ),
  } = {}
) => {
  const onRegisterRef = (
    useRef(
      onRegister
    )
  )

  useEffect(
    () => {
      onRegisterRef
      .current = (
        onRegister
      )
    },
    [
      onRegister,
    ],
  )

  const onUnregisterRef = (
    useRef(
      onUnregister
    )
  )

  useEffect(
    () => {
      onUnregisterRef
      .current = (
        onUnregister
      )
    },
    [
      onUnregister,
    ],
  )

  const registrationsRef = (
    useRef<
      Registrations
    >(
      initialRegistrations
    )
  )

  const getAllRegistrations = (
    useCallback(
      () => (
        registrationsRef
        .current
      ),
      [],
    )
  )

  const getIsRegistered = (
    useCallback(
      (
        identifier,
      ) => (
        Boolean(
          registrationsRef
          .current
          [identifier]
        )
      ),
      [],
    )
  )

  const register = (
    useCallback(
      (
        identifier,
      ) => {
        registrationsRef
        .current = {
          ...(
            registrationsRef
            .current
          ),
          [identifier]: (
            (
              (
                registrationsRef
                .current
                [identifier]
              )
              || 0
            )
            + 1
          ),
        }

        onRegisterRef
        .current(
          identifier
        )

        return () => {
          const {
            [identifier]: numberOfRegistrations,
            ...otherRegistrations
          } = (
            registrationsRef
            .current
          )

          if (
            numberOfRegistrations
            === 1
          ) {
            registrationsRef
            .current = (
              otherRegistrations
            )
          }
          else {
            registrationsRef
            .current = {
              ...otherRegistrations,
              [identifier]: (
                numberOfRegistrations
                - 1
              ),
            }
          }

          onUnregisterRef
          .current(
            identifier
          )
        }
      },
      [],
    )
  )

  const returnType = {
    getAllRegistrations,
    getIsRegistered,
    register,
  }

  return returnType
}
