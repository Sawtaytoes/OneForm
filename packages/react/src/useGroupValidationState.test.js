import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useGroupValidationsState from './useGroupValidationsState.js'

const getSymbol = (
	values
) => (
	Symbol
	.for(
		values
		.map((
			value,
		) => (
			JSON
			.stringify(
				value
			)
		))
		.join('')
	)
)

describe(
	'useGroupValidationsState',
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
						useGroupValidationsState,
					)
				)

				act(() => {
					result
					.current
					.validateGroups()
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
				const getErrorMessages = (
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
						useGroupValidationsState,
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
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages,
									},
								],
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
				})

				expect(
					getErrorMessages
				)
				.toHaveBeenCalledTimes(
					0
				)
			}
		)

		test(
			'sets no error messages when valid',
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
						useGroupValidationsState,
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
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages: () => {},
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
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
						useGroupValidationsState,
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
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages: ({
											values,
										}) => {
											if (
												!(
													values
													.email
													.includes('@')
												)
											) {
												return {
													email: errorMessage,
												}
											}
										},
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
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
						errorMessages: errorMessage,
						symbol: (
							getSymbol([
								[
									'email',
								],
								[
									'email',
								],
							])
						),
					},
				)
			}
		)

		test(
			'sets new error messages when invalid a second time',
			() => {
				const setErrorMessages = (
					jest
					.fn()
				)

				const errorMessage = 'Still missing an `@` sign.'

				const errorMessagesIterator = (
					[
						'Missing `@` sign.',
						errorMessage,
					]
					.entries()
				)

				const values = {
					email: 'john.smithtest.com',
				}

				const {
					result,
				} = (
					renderHook(
						useGroupValidationsState,
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
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages: ({
											values,
										}) => {
											if (
												!(
													values
													.email
													.includes('@')
												)
											) {
												return {
													email: (
														errorMessagesIterator
														.next()
														.value
														[1]
													),
												}
											}
										},
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
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
					2,
					'email',
					{
						errorMessages: errorMessage,
						symbol: (
							getSymbol([
								[
									'email',
								],
								[
									'email',
								],
							])
						),
					},
				)
			}
		)

		test(
			'resets error messages when valid a second time',
			() => {
				const setErrorMessages = (
					jest
					.fn()
				)

				const errorMessage = 'Still missing an `@` sign.'

				const valuesIterator = (
					[
						'john.smithtest.com',
						'john.smith@test.com',
					]
					.entries()
				)

				const {
					result,
				} = (
					renderHook(
						useGroupValidationsState,
						{
							initialProps: {
								getIsReadyForValidation: () => (
									true
								),
								getValue: () => (
									valuesIterator
									.next()
									.value
									[1]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages: ({
											values,
										}) => {
											if (
												!(
													values
													.email
													.includes('@')
												)
											) {
												return {
													email: errorMessage,
												}
											}
										},
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
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
					2,
					'email',
					{
						errorMessages: [],
						symbol: (
							getSymbol([
								[
									'email',
								],
								[
									'email',
								],
							])
						),
					},
				)
			}
		)

		test(
			'sets error message when not defined',
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
						useGroupValidationsState,
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
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages: ({
											values,
										}) => {
											if (
												!(
													values
													.email
													.includes('@')
												)
											) {
												return {
													email: true,
												}
											}
										},
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
				})

				expect(
					setErrorMessages
				)
				.toHaveBeenCalledWith(
					'email',
					{
						errorMessages: true,
						symbol: (
							getSymbol([
								[
									'email',
								],
								[
									'email',
								],
							])
						),
					},
				)
			}
		)

		test(
			'sets all error messages when multiple invalid',
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
						useGroupValidationsState,
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
								groupValidations: [
									{
										fieldNames: [
											'email',
										],
										getErrorMessages: ({
											values,
										}) => ({
											email: [
												(
													!(
														values
														.email
														.includes('@')
													)
													&& (
														errorMessage1
													)
												),
												(
													!(
														values
														.email
														.includes('.com')
													)
													&& (
														errorMessage2
													)
												),
											],
										}),
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					result
					.current
					.registerIdentifierForGroupValidation(
						'email'
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'email'
					)
				})

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
						symbol: (
							getSymbol([
								[
									'email',
								],
								[
									'email',
								],
							])
						),
					},
				)
			}
		)

		test(
			'processes multiple group validations on only ready fields',
			() => {
				const setErrorMessages = (
					jest
					.fn()
				)

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
						useGroupValidationsState,
						{
							initialProps: {
								getAllFieldNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsReadyForValidation: (
									fieldName,
								) => (
									readyForValidation
									[fieldName]
								),
								getValue: (
									identifier,
								) => (
									values
									[identifier]
								),
								groupValidations: [
									{
										fieldNames: [
											'email',
											'firstName',
										],
										getErrorMessages: () => ({
											'errorMessage.emailName': (
												'You cannot have an `email` and `name`.'
											),
										}),
									},
									{
										fieldNames: [
											'firstName',
											'lastName',
										],
										getErrorMessages: ({
											values,
										}) => {
											const errors = {}

											if (
												(
													values
													.firstName
												)
												=== 'John'
											) {
												errors
												.firstName = (
													firstNameErrorMessage
												)
											}

											if (
												(
													values
													.lastName
												)
												=== 'Smith'
											) {
												errors
												.lastName = (
													lastNameErrorMessage
												)
											}

											return (
												errors
											)
										},
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					Object
					.keys(
						values
					)
					.forEach(
						result
						.current
						.registerIdentifierForGroupValidation
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						'firstName'
					)
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
					'firstName',
					{
						errorMessages: firstNameErrorMessage,
						symbol: (
							getSymbol([
								[
									'firstName',
									'lastName',
								],
								[
									'firstName',
									'lastName',
								],
							])
						),
					},
				)

				expect(
					setErrorMessages
				)
				.toHaveBeenNthCalledWith(
					2,
					'lastName',
					{
						errorMessages: lastNameErrorMessage,
						symbol: (
							getSymbol([
								[
									'firstName',
									'lastName',
								],
								[
									'firstName',
									'lastName',
								],
							])
						),
					},
				)
			}
		)

		test(
			'do a database-style `GROUP BY` when given multiple group names',
			() => {
				const setErrorMessages = (
					jest
					.fn()
				)

				const values = {
					'accountName': 'KG',
					'email/accountId:a1/emailId:e1': 'john.smith@test.com',
					'email/accountId:a1/emailId:e2': 'johnsmith1970@testmail.com',
					'email/accountId:a2/emailId:e3': 'phil.collins@test.com',
					'firstName/accountId:a1': 'John',
					'firstName/accountId:a2': 'Phil',
					'lastName/accountId:a1': 'Smith',
					'lastName/accountId:a2': 'Collins',
				}

				const getErrorMessages1 = (
					jest
					.fn()
				)

				const getErrorMessages2 = (
					jest
					.fn()
				)

				const getErrorMessages3 = (
					jest
					.fn()
				)

				const getErrorMessages4 = (
					jest
					.fn()
				)

				const {
					result,
				} = (
					renderHook(
						useGroupValidationsState,
						{
							initialProps: {
								getAllNames: () => (
									Object
									.keys(
										values
									)
								),
								getIsReadyForValidation: () => (
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
											'accountName',
											'email',
										],
										getErrorMessages: getErrorMessages1,
									},
									{
										fieldNames: [
											'email',
											'firstName',
											'lastName',
										],
										getErrorMessages: getErrorMessages2,
										groupNames: [
											'accountId',
										],
									},
									{
										fieldNames: [
											'accountName',
											'email',
										],
										getErrorMessages: getErrorMessages3,
										groupNames: [
											'emailId',
										],
									},
									{
										fieldNames: [
											'email',
											'firstName',
											'lastName',
										],
										getErrorMessages: getErrorMessages4,
										groupNames: [
											'accountId',
											'emailId',
										],
									},
								],
								setErrorMessages,
							},
						},
					)
				)

				act(() => {
					Object
					.keys(
						values
					)
					.forEach(
						result
						.current
						.registerIdentifierForGroupValidation
					)
				})

				act(() => {
					result
					.current
					.validateGroups(
						Object
						.keys(
							values
						)
					)
				})

				expect(
					getErrorMessages1
				)
				.toHaveBeenCalledTimes(
					1
				)

				expect(
					getErrorMessages1
				)
				.toHaveBeenCalledWith({
					groups: {},
					groupsString: '',
					reverseLookup: {
						accountName: (
							'accountName'
						),
					},
					validationType: 'submit',
					values: {
						accountName: (
							values
							['accountName']
						),
						email: [
							{
								name: (
									'email/accountId:a1/emailId:e1'
								),
								value: (
									values
									['email/accountId:a1/emailId:e1']
								),
							},
							{
								name: (
									'email/accountId:a1/emailId:e2'
								),
								value: (
									values
									['email/accountId:a1/emailId:e2']
								),
							},
							{
								name: (
									'email/accountId:a2/emailId:e3'
								),
								value: (
									values
									['email/accountId:a2/emailId:e3']
								),
							},
						],
					},
				})

				expect(
					getErrorMessages2
				)
				.toHaveBeenCalledTimes(
					2
				)

				expect(
					getErrorMessages2
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						groups: {
							accountId: {
								groupId: 'a1',
								groupName: 'accountId',
								groupString: '/accountId:a1',
							},
						},
						groupsString: '/accountId:a1',
						reverseLookup: {
							firstName: (
								'firstName/accountId:a1'
							),
							lastName: (
								'lastName/accountId:a1'
							),
						},
						validationType: 'submit',
						values: {
							email: [
								{
									name: (
										'email/accountId:a1/emailId:e1'
									),
									value: (
										values
										['email/accountId:a1/emailId:e1']
									),
								},
								{
									name: (
										'email/accountId:a1/emailId:e2'
									),
									value: (
										values
										['email/accountId:a1/emailId:e2']
									),
								},
							],
							firstName: (
								values
								['firstName/accountId:a1']
							),
							lastName: (
								values
								['lastName/accountId:a1']
							),
						},
					},
				)

				expect(
					getErrorMessages2
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						groups: {
							accountId: {
								groupId: 'a2',
								groupName: 'accountId',
								groupString: '/accountId:a2',
							},
						},
						groupsString: '/accountId:a2',
						reverseLookup: {
							firstName: (
								'firstName/accountId:a2'
							),
							lastName: (
								'lastName/accountId:a2'
							),
						},
						validationType: 'submit',
						values: {
							email: [
								{
									name: (
										'email/accountId:a2/emailId:e3'
									),
									value: (
										values
										['email/accountId:a2/emailId:e3']
									),
								},
							],
							firstName: (
								values
								['firstName/accountId:a2']
							),
							lastName: (
								values
								['lastName/accountId:a2']
							),
						},
					},
				)

				expect(
					getErrorMessages3
				)
				.toHaveBeenCalledTimes(
					3
				)

				expect(
					getErrorMessages3
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						groups: {
							emailId: {
								groupId: 'e1',
								groupName: 'emailId',
								groupString: '/emailId:e1',
							},
						},
						groupsString: '/emailId:e1',
						reverseLookup: {
							accountName: (
								'accountName'
							),
						},
						validationType: 'submit',
						values: {
							accountName: (
								values
								.accountName
							),
							email: [
								{
									name: (
										'email/accountId:a1/emailId:e1'
									),
									value: (
										values
										['email/accountId:a1/emailId:e1']
									),
								},
							],
						},
					},
				)

				expect(
					getErrorMessages3
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						groups: {
							emailId: {
								groupId: 'e2',
								groupName: 'emailId',
								groupString: '/emailId:e2',
							},
						},
						groupsString: '/emailId:e2',
						reverseLookup: {
							accountName: (
								'accountName'
							),
						},
						validationType: 'submit',
						values: {
							accountName: (
								values
								.accountName
							),
							email: [
								{
									name: (
										'email/accountId:a1/emailId:e2'
									),
									value: (
										values
										['email/accountId:a1/emailId:e2']
									),
								},
							],
						},
					},
				)

				expect(
					getErrorMessages3
				)
				.toHaveBeenNthCalledWith(
					3,
					{
						groups: {
							emailId: {
								groupId: 'e3',
								groupName: 'emailId',
								groupString: '/emailId:e3',
							},
						},
						groupsString: '/emailId:e3',
						reverseLookup: {
							accountName: (
								'accountName'
							),
						},
						validationType: 'submit',
						values: {
							accountName: (
								values
								.accountName
							),
							email: [
								{
									name: (
										'email/accountId:a2/emailId:e3'
									),
									value: (
										values
										['email/accountId:a2/emailId:e3']
									),
								},
							],
						},
					},
				)

				expect(
					getErrorMessages4
				)
				.toHaveBeenCalledTimes(
					3
				)

				expect(
					getErrorMessages4
				)
				.toHaveBeenNthCalledWith(
					1,
					{
						groups: {
							accountId: {
								groupId: 'a1',
								groupName: 'accountId',
								groupString: '/accountId:a1',
							},
							emailId: {
								groupId: 'e1',
								groupName: 'emailId',
								groupString: '/emailId:e1',
							},
						},
						groupsString: '/accountId:a1/emailId:e1',
						reverseLookup: {
							email: (
								'email/accountId:a1/emailId:e1'
							),
							firstName: (
								'firstName/accountId:a1'
							),
							lastName: (
								'lastName/accountId:a1'
							),
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/accountId:a1/emailId:e1']
							),
							firstName: (
								values
								['firstName/accountId:a1']
							),
							lastName: (
								values
								['lastName/accountId:a1']
							),
						},
					},
				)

				expect(
					getErrorMessages4
				)
				.toHaveBeenNthCalledWith(
					2,
					{
						groups: {
							accountId: {
								groupId: 'a1',
								groupName: 'accountId',
								groupString: '/accountId:a1',
							},
							emailId: {
								groupId: 'e2',
								groupName: 'emailId',
								groupString: '/emailId:e2',
							},
						},
						groupsString: '/accountId:a1/emailId:e2',
						reverseLookup: {
							email: (
								'email/accountId:a1/emailId:e2'
							),
							firstName: (
								'firstName/accountId:a1'
							),
							lastName: (
								'lastName/accountId:a1'
							),
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/accountId:a1/emailId:e2']
							),
							firstName: (
								values
								['firstName/accountId:a1']
							),
							lastName: (
								values
								['lastName/accountId:a1']
							),
						},
					},
				)

				expect(
					getErrorMessages4
				)
				.toHaveBeenNthCalledWith(
					3,
					{
						groups: {
							accountId: {
								groupId: 'a2',
								groupName: 'accountId',
								groupString: '/accountId:a2',
							},
							emailId: {
								groupId: 'e3',
								groupName: 'emailId',
								groupString: '/emailId:e3',
							},
						},
						groupsString: '/accountId:a2/emailId:e3',
						reverseLookup: {
							email: (
								'email/accountId:a2/emailId:e3'
							),
							firstName: (
								'firstName/accountId:a2'
							),
							lastName: (
								'lastName/accountId:a2'
							),
						},
						validationType: 'submit',
						values: {
							email: (
								values
								['email/accountId:a2/emailId:e3']
							),
							firstName: (
								values
								['firstName/accountId:a2']
							),
							lastName: (
								values
								['lastName/accountId:a2']
							),
						},
					},
				)
			}
		)
	}
)
