import {
  act,
  renderHook,
} from '@testing-library/react'

import useValidationsState, {
  validationsSymbol,
} from './useValidationsState.js'

describe(
  'useValidationsState',
  () => {
    test(
      'does not set error messages when nothing is invalid',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                setErrorMessages,
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate()
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          0
        )
      }
    )

    test(
      'does not check validation when not ready',
      () => {
        const getIsValid = (
          jest
          .fn()
        )

        const values = {
          email: 'john.smithtest.com',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: () => (
                  false
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                validations: {
                  email: [
                    {
                      getIsValid,
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate(
            'email'
          )
        })

        expect(
          getIsValid
        )
        .toHaveBeenCalledTimes(
          0
        )
      }
    )

    test(
      'set null error messages when valid',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const values = {
          email: 'john.smith@test.com',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: () => (
                  true
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                setErrorMessages,
                validations: {
                  email: [
                    {
                      errorMessage: 'Missing `@` sign.',
                      getIsValid: () => (
                        true
                      ),
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate(
            'email'
          )
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledWith(
          'email',
          {
            errorMessages: [],
            symbol: validationsSymbol,
          },
        )
      }
    )

    test(
      'sets error messages when invalid',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const errorMessage = 'Missing `@` sign.'

        const values = {
          email: 'john.smithtest.com',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: () => (
                  true
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                setErrorMessages,
                validations: {
                  email: [
                    {
                      errorMessage,
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('@')
                      ),
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate(
            'email'
          )
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledWith(
          'email',
          {
            errorMessages: [
              errorMessage,
            ],
            symbol: validationsSymbol,
          },
        )
      }
    )

    test(
      'set truthy error message when an error message is not defined',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const values = {
          email: 'john.smithtest.com',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: () => (
                  true
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                setErrorMessages,
                validations: {
                  email: [
                    {
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('@')
                      ),
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate(
            'email'
          )
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledWith(
          'email',
          {
            errorMessages: [
              true,
            ],
            symbol: validationsSymbol,
          },
        )
      }
    )

    test(
      'gives all error messages when multiple invalid',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const errorMessage1 = 'Missing `@` sign.'
        const errorMessage2 = 'Missing `.com`.'

        const values = {
          email: 'john.smithtest',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: () => (
                  true
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                setErrorMessages,
                validations: {
                  email: [
                    {
                      errorMessage: (
                        errorMessage1
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('@')
                      ),
                    },
                    {
                      errorMessage: (
                        errorMessage2
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('.com')
                      ),
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate(
            'email'
          )
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledWith(
          'email',
          {
            errorMessages: [
              errorMessage1,
              errorMessage2,
            ],
            symbol: validationsSymbol,
          },
        )
      }
    )

    test(
      'processes multiple validations when fields ready',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const emailErrorMessage = 'Missing `.com`.'
        const nameErrorMessage1 = 'Name cannot start with `J`.'
        const nameErrorMessage2 = 'Cannot use generic name.'

        const values = {
          email: 'john.smith@test',
          name: 'John Smith',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: () => (
                  true
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                setErrorMessages,
                validations: {
                  email: [
                    {
                      errorMessage: (
                        'Missing `@` sign.'
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('@')
                      ),
                    },
                    {
                      errorMessage: (
                        emailErrorMessage
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('.com')
                      ),
                    },
                  ],
                  name: [
                    {
                      errorMessage: (
                        nameErrorMessage1
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        !(
                          value
                          .trim()
                          .startsWith(
                            'J'
                          )
                        )
                      ),
                    },
                    {
                      errorMessage: (
                        nameErrorMessage2
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        !== 'John Smith'
                      ),
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate([
            'email',
            'name',
          ])
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          2
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenNthCalledWith(
          1,
          'email',
          {
            errorMessages: [
              emailErrorMessage,
            ],
            symbol: validationsSymbol,
          },
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenNthCalledWith(
          2,
          'name',
          {
            errorMessages: [
              nameErrorMessage1,
              nameErrorMessage2,
            ],
            symbol: validationsSymbol,
          },
        )
      }
    )

    test(
      'processes multiple validations on only ready fields',
      () => {
        const setErrorMessages = (
          jest
          .fn()
        )

        const nameErrorMessage1 = 'Name cannot start with `J`.'
        const nameErrorMessage2 = 'Cannot use generic name.'

        const readyForValidation = {
          email: false,
          name: true,
        }

        const values = {
          email: 'john.smith@test',
          name: 'John Smith',
        }

        const {
          result,
        } = (
          renderHook(
            useValidationsState,
            {
              initialProps: {
                getIsReadyForValidation: (
                  identifier,
                ) => (
                  readyForValidation
                  [identifier]
                ),
                getValue: (
                  identifier,
                ) => (
                  values
                  [identifier]
                ),
                setErrorMessages,
                validations: {
                  email: [
                    {
                      errorMessage: (
                        'Missing `@` sign.'
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('@')
                      ),
                    },
                    {
                      errorMessage: (
                        'Missing `.com`.'
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        .includes('.com')
                      ),
                    },
                  ],
                  name: [
                    {
                      errorMessage: (
                        nameErrorMessage1
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        !(
                          value
                          .trim()
                          .startsWith(
                            'J'
                          )
                        )
                      ),
                    },
                    {
                      errorMessage: (
                        nameErrorMessage2
                      ),
                      getIsValid: ({
                        value,
                      }) => (
                        value
                        !== 'John Smith'
                      ),
                    },
                  ],
                },
              },
            },
          )
        )

        act(() => {
          result
          .current
          .validate([
            'email',
            'name',
          ])
        })

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledTimes(
          1
        )

        expect(
          setErrorMessages
        )
        .toHaveBeenCalledWith(
          'name',
          {
            errorMessages: [
              nameErrorMessage1,
              nameErrorMessage2,
            ],
            symbol: validationsSymbol,
          },
        )
      }
    )
  }
)
