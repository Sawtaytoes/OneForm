import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useValidationState from './useValidationState.js'

describe(
	'useValidationState',
	() => {
		test(
			'does not give error messages when nothing is invalid',
			() => {
				const {
					result,
				} = (
					renderHook(
						useValidationState,
					)
				)

				expect(
					result
					.current
					.getFieldValidationErrorMessages()
				)
				.toEqual(
					[]
				)
			}
		)

		test(
			'only validates when ready for validation',
			() => {
				const values = {
					email: 'john.smithtest.com',
				}

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getIsFieldReadyForValidation: () => (
									false
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								validations: {
									email: [
										{
											getIsValid: (
												value,
											) => (
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

				expect(
					result
					.current
					.getFieldValidationErrorMessages(
						'email'
					)
				)
				.toEqual(
					[]
				)
			}
		)

		test(
			'gives error messages when invalid',
			() => {
				const errorMessage = 'Missing `@` sign.'

				const values = {
					email: 'john.smithtest.com',
				}

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getIsFieldReadyForValidation: () => (
									true
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								validations: {
									email: [
										{
											errorMessage,
											getIsValid: (
												value,
											) => (
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

				expect(
					result
					.current
					.getFieldValidationErrorMessages(
						'email'
					)
				)
				.toEqual([
					{
						errorMessages: [
							errorMessage,
						],
						fieldName: 'email',
					},
				])
			}
		)

		test(
			'gives truthy error message when not defined',
			() => {
				const values = {
					email: 'john.smithtest.com',
				}

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getIsFieldReadyForValidation: () => (
									true
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								validations: {
									email: [
										{
											getIsValid: (
												value,
											) => (
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

				expect(
					result
					.current
					.getFieldValidationErrorMessages(
						'email'
					)
				)
				.toEqual([
					{
						errorMessages: [
							' ',
						],
						fieldName: 'email',
					},
				])
			}
		)

		test(
			'gives all error messages when multiple invalid',
			() => {
				const errorMessage1 = 'Missing `@` sign.'
				const errorMessage2 = 'Missing `.com`.'

				const values = {
					email: 'john.smithtest',
				}

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getIsFieldReadyForValidation: () => (
									true
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								validations: {
									email: [
										{
											errorMessage: (
												errorMessage1
											),
											getIsValid: (
												value,
											) => (
												value
												.includes('@')
											),
										},
										{
											errorMessage: (
												errorMessage2
											),
											getIsValid: (
												value,
											) => (
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

				expect(
					result
					.current
					.getFieldValidationErrorMessages(
						'email'
					)
				)
				.toEqual([
					{
						errorMessages: [
							errorMessage1,
							errorMessage2,
						],
						fieldName: 'email',
					},
				])
			}
		)

		test(
			'processes multiple validations when fields ready',
			() => {
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
						useValidationState,
						{
							initialProps: {
								getIsFieldReadyForValidation: () => (
									true
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								validations: {
									email: [
										{
											errorMessage: (
												'Missing `@` sign.'
											),
											getIsValid: (
												value,
											) => (
												value
												.includes('@')
											),
										},
										{
											errorMessage: (
												emailErrorMessage
											),
											getIsValid: (
												value,
											) => (
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
											getIsValid: (
												value,
											) => (
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
											getIsValid: (
												value,
											) => (
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

				expect(
					result
					.current
					.getFieldValidationErrorMessages([
						'email',
						'name',
					])
				)
				.toEqual([
					{
						errorMessages: [
							emailErrorMessage,
						],
						fieldName: 'email',
					},
					{
						errorMessages: [
							nameErrorMessage1,
							nameErrorMessage2,
						],
						fieldName: 'name',
					},
				])
			}
		)

		test(
			'processes multiple validations on only ready fields',
			() => {
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
						useValidationState,
						{
							initialProps: {
								getIsFieldReadyForValidation: (
									fieldName,
								) => (
									readyForValidation
									[fieldName]
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								validations: {
									email: [
										{
											errorMessage: (
												'Missing `@` sign.'
											),
											getIsValid: (
												value,
											) => (
												value
												.includes('@')
											),
										},
										{
											errorMessage: (
												'Missing `.com`.'
											),
											getIsValid: (
												value,
											) => (
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
											getIsValid: (
												value,
											) => (
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
											getIsValid: (
												value,
											) => (
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

				expect(
					result
					.current
					.getFieldValidationErrorMessages([
						'email',
						'name',
					])
				)
				.toEqual([
					{
						errorMessages: [
							nameErrorMessage1,
							nameErrorMessage2,
						],
						fieldName: 'name',
					},
				])
			}
		)

		test(
			'processes multiple group validations on only ready fields',
			() => {
				const firstNameErrorMessage = (
					'Cannot use generic first name.'
				)

				const lastNameErrorMessage = (
					'Cannot use generic last name.'
				)

				const readyForValidation = {
					email: false,
					firstName: true,
					lastName: true,
				}

				const values = {
					email: 'john.smith@test.com',
					firstName: 'John',
					lastName: 'Smith',
				}

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getAllFieldNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsFieldReadyForValidation: (
									fieldName,
								) => (
									readyForValidation
									[fieldName]
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
											'firstName',
										],
										validate: () => ([
											{
												errorMessage: (
													'You cannot have an `email` and `name`.'
												),
												fieldName: (
													'errorMessage.emailName'
												),
											},
										]),
									},
									{
										fieldNames: [
											'firstName',
											'lastName',
										],
										validate: ({
											values,
										}) => {
											const errors = []

											if (
												(
													values
													.firstName
												)
												=== 'John'
											) {
												errors
												.push({
													errorMessage: (
														firstNameErrorMessage
													),
													fieldName: (
														'firstName'
													),
												})
											}

											if (
												(
													values
													.lastName
												)
												=== 'Smith'
											) {
												errors
												.push({
													errorMessage: (
														lastNameErrorMessage
													),
													fieldName: (
														'lastName'
													),
												})
											}

											return (
												errors
											)
										},
									},
								],
							},
						},
					)
				)

				expect(
					result
					.current
					.getFieldValidationErrorMessages(
						'firstName',
					)
				)
				.toEqual([
					{
						errorMessages: [
							firstNameErrorMessage,
						],
						fieldName: 'firstName',
					},
					{
						errorMessages: [
							lastNameErrorMessage,
						],
						fieldName: 'lastName',
					},
				])
			}
		)

		test(
			'groups related fields in group validation',
			() => {
				const values = {
					'email/emailId:1': 'john.smith@test.com',
					'email/emailId:2': 'johnsmith1970@testmail.com',
					'firstName': 'John',
					'lastName': 'Smith',
				}

				const validate = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getAllFieldNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsFieldReadyForValidation: () => (
									true
								),
								getValidationType: () => (
									'submit'
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
											'firstName',
											'lastName',
										],
										groupNames: [
											'emailId',
										],
										validate,
									},
								],
							},
						},
					)
				)

				act(() => {
					result
					.current
					.getFieldValidationErrorMessages(
						'firstName',
					)
				})

				expect(
					validate
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						reverseLookup: {
							email: 'email/emailId:1',
							firstName: 'firstName',
							lastName: 'lastName',
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/emailId:1']
							),
							firstName: (
								values
								.firstName
							),
							lastName: (
								values
								.lastName
							),
						},
					},
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						reverseLookup: {
							email: 'email/emailId:2',
							firstName: 'firstName',
							lastName: 'lastName',
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/emailId:2']
							),
							firstName: (
								values
								.firstName
							),
							lastName: (
								values
								.lastName
							),
						},
					},
				)
			}
		)

		test(
			'deduplicates calls to validate when the group validation is shared',
			() => {
				const values = {
					'email/emailId:1': 'john.smith@test.com',
					'email/emailId:2': 'johnsmith1970@testmail.com',
					'firstName': 'John',
					'lastName': 'Smith',
				}

				const validate = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getAllFieldNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsFieldReadyForValidation: () => (
									true
								),
								getValidationType: () => (
									'submit'
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
											'firstName',
											'lastName',
										],
										groupNames: [
											'emailId',
										],
										validate,
									},
								],
							},
						},
					)
				)

				act(() => {
					result
					.current
					.getFieldValidationErrorMessages([
						'email/emailId:1',
						'email/emailId:2',
						'firstName',
						'lastName',
					])
				})

				expect(
					validate
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						reverseLookup: {
							email: 'email/emailId:1',
							firstName: 'firstName',
							lastName: 'lastName',
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/emailId:1']
							),
							firstName: (
								values
								.firstName
							),
							lastName: (
								values
								.lastName
							),
						},
					},
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						reverseLookup: {
							email: 'email/emailId:2',
							firstName: 'firstName',
							lastName: 'lastName',
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/emailId:2']
							),
							firstName: (
								values
								.firstName
							),
							lastName: (
								values
								.lastName
							),
						},
					},
				)
			}
		)

		test(
			'gets all fields with the given field name in the form',
			() => {
				const values = {
					'email/accountId:1/emailId:1': 'john.smith@test.com',
					'email/accountId:1/emailId:2': 'johnsmith1970@testmail.com',
					'email/accountId:2/emailId:3': 'phil.collins@test.com',
				}

				const validate = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getAllFieldNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsFieldReadyForValidation: () => (
									true
								),
								getValidationType: () => (
									'submit'
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										validate,
									},
								],
							},
						},
					)
				)

				act(() => {
					result
					.current
					.getFieldValidationErrorMessages([
						'email/accountId:1/emailId:1',
						'email/accountId:1/emailId:2',
						'email/accountId:2/emailId:3',
					])
				})

				expect(
					validate
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						reverseLookup: {
							'email/accountId:1/emailId:1': (
								'email/accountId:1/emailId:1'
							),
							'email/accountId:1/emailId:2': (
								'email/accountId:1/emailId:2'
							),
							'email/accountId:2/emailId:3': (
								'email/accountId:2/emailId:3'
							),
						},
						validationType: 'submit',
						values: {
							email: [
								{
									name: (
										'email/accountId:1/emailId:1'
									),
									value: (
										values
										['email/accountId:1/emailId:1']
									),
								},
								{
									name: (
										'email/accountId:1/emailId:2'
									),
									value: (
										values
										['email/accountId:1/emailId:2']
									),
								},
								{
									name: (
										'email/accountId:2/emailId:3'
									),
									value: (
										values
										['email/accountId:2/emailId:3']
									),
								},
							],
						},
					},
				)
			}
		)

		test(
			'do a database-style `GROUP BY` when given multiple group names',
			() => {
				const values = {
					'accountName': 'KG',
					'email/accountId:1/emailId:1': 'john.smith@test.com',
					'email/accountId:1/emailId:2': 'johnsmith1970@testmail.com',
					'email/accountId:2/emailId:3': 'phil.collins@test.com',
					'firstName/accountId:1': 'John',
					'firstName/accountId:2': 'Phil',
					'lastName/accountId:1': 'Smith',
					'lastName/accountId:2': 'Collins',
				}

				const validate = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useValidationState,
						{
							initialProps: {
								getAllFieldNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsFieldReadyForValidation: () => (
									true
								),
								getValidationType: () => (
									'submit'
								),
								getValue: (
									fieldName,
								) => (
									values
									[fieldName]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
											'firstName',
											'lastName',
										],
										groupNames: [
											'accountId',
											'emailId',
										],
										validate,
									},
								],
							},
						},
					)
				)

				act(() => {
					result
					.current
					.getFieldValidationErrorMessages([
						'accountName',
						'email/accountId:1/emailId:1',
						'email/accountId:1/emailId:2',
						'email/accountId:2/emailId:3',
						'firstName/accountId:1',
						'firstName/accountId:2',
						'lastName/accountId:1',
						'lastName/accountId:2',
					])
				})

				expect(
					validate
				)
				.toHaveBeenCalledTimes(
					3
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						reverseLookup: {
							email: (
								'email/accountId:1/emailId:1'
							),
							firstName: (
								'firstName/accountId:1'
							),
							lastName: (
								'lastName/accountId:1'
							),
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/accountId:1/emailId:1']
							),
							firstName: (
								values
								['firstName/accountId:1']
							),
							lastName: (
								values
								['lastName/accountId:1']
							),
						},
					},
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						reverseLookup: {
							email: (
								'email/accountId:1/emailId:2'
							),
							firstName: (
								'firstName/accountId:1'
							),
							lastName: (
								'lastName/accountId:1'
							),
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/accountId:1/emailId:2']
							),
							firstName: (
								values
								['firstName/accountId:1']
							),
							lastName: (
								values
								['lastName/accountId:1']
							),
						},
					},
				)

				expect(
					validate
				)
				.toHaveBeenNthCalledWith(
					3,
					{
						reverseLookup: {
							email: (
								'email/accountId:2/emailId:3'
							),
							firstName: (
								'firstName/accountId:2'
							),
							lastName: (
								'lastName/accountId:2'
							),
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/accountId:2/emailId:3']
							),
							firstName: (
								values
								['firstName/accountId:2']
							),
							lastName: (
								values
								['lastName/accountId:2']
							),
						},
					},
				)
			}
		)
	}
)
