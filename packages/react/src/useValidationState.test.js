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
					.getValidationErrorMessages()
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
											validate: (
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
					.getValidationErrorMessages(
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
								getIsReadyForValidation: () => (
									true
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
											errorMessage,
											validate: (
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
					.getValidationErrorMessages(
						'email'
					)
				)
				.toEqual([
					{
						errorMessages: [
							errorMessage,
						],
						identifier: 'email',
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
								getIsReadyForValidation: () => (
									true
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
											validate: (
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
					.getValidationErrorMessages(
						'email'
					)
				)
				.toEqual([
					{
						errorMessages: [
							' ',
						],
						identifier: 'email',
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
								getIsReadyForValidation: () => (
									true
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
											errorMessage: (
												errorMessage1
											),
											validate: (
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
											validate: (
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
					.getValidationErrorMessages(
						'email'
					)
				)
				.toEqual([
					{
						errorMessages: [
							errorMessage1,
							errorMessage2,
						],
						identifier: 'email',
					},
				])
			}
		)

		test(
			'processes multiple and only gives error messages when invalid',
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
								getIsReadyForValidation: () => (
									true
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
											errorMessage: (
												'Missing `@` sign.'
											),
											validate: (
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
											validate: (
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
											validate: (
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
											validate: (
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
					.getValidationErrorMessages([
						'email',
						'name',
					])
				)
				.toEqual([
					{
						errorMessages: [
							emailErrorMessage,
						],
						identifier: 'email',
					},
					{
						errorMessages: [
							nameErrorMessage1,
							nameErrorMessage2,
						],
						identifier: 'name',
					},
				])
			}
		)

		test(
			'processes multiple and only gives error messages when ready for validation',
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
								validations: {
									email: [
										{
											errorMessage: (
												'Missing `@` sign.'
											),
											validate: (
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
											validate: (
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
											validate: (
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
											validate: (
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
					.getValidationErrorMessages([
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
						identifier: 'name',
					},
				])
			}
		)
	}
)
