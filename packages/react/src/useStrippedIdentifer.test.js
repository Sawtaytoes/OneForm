import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useStrippedIdentifer from './useStrippedIdentifer.js'

describe(
	'useStrippedIdentifer',
	() => {
		// test(
		// 	'memoizes identifier groups',
		// 	() => {
		// 		const {
		// 			result,
		// 		} = (
		// 			renderHook(
		// 				useStrippedIdentifer
		// 			)
		// 		)

		// 		const identifierGroupRef = {
		// 			current: null,
		// 		}

		// 		act(() => {
		// 			identifierGroupRef
		// 			.current = (
		// 				result
		// 				.current
		// 				.getIdentifierGroup(
		// 					'emailId:363f'
		// 				)
		// 			)
		// 		})

		// 		expect(
		// 			result
		// 			.current
		// 			.getIdentifierGroup(
		// 				'emailId:363f'
		// 			)
		// 		)
		// 		.toBe(
		// 			identifierGroupRef
		// 			.current
		// 		)
		// 	}
		// )

		test(
			'has no groups when nothing to strip',
			() => {
				const {
					result,
				} = (
					renderHook(
						useStrippedIdentifer
					)
				)

				expect(
					result
					.current
					.getStrippedIdentifierData(
						'email'
					)
				)
				.toEqual({
					groups: {},
					groupsList: [],
					identifier: 'email',
					strippedIdentifier: 'email',
				})
			}
		)

		test(
			'has a group when there is one group',
			() => {
				const {
					result,
				} = (
					renderHook(
						useStrippedIdentifer
					)
				)

				expect(
					result
					.current
					.getStrippedIdentifierData(
						'email/emailId:363f'
					)
				)
				.toEqual({
					groups: {
						emailId: '363f',
					},
					groupsList: [
						{
							groupId: '363f',
							groupName: 'emailId',
							groupNameString: '/emailId:',
							groupString: '/emailId:363f',
						},
					],
					identifier: 'email/emailId:363f',
					strippedIdentifier: 'email',
				})
			}
		)

		test(
			'has many groups when there are many',
			() => {
				const {
					result,
				} = (
					renderHook(
						useStrippedIdentifer
					)
				)

				expect(
					result
					.current
					.getStrippedIdentifierData(
						'email/accountId:4d63/emailId:363f'
					)
				)
				.toEqual({
					groups: {
						accountId: '4d63',
						emailId: '363f',
					},
					groupsList: [
						{
							groupId: '4d63',
							groupName: 'accountId',
							groupNameString: '/accountId:',
							groupString: '/accountId:4d63',
						},
						{
							groupId: '363f',
							groupName: 'emailId',
							groupNameString: '/emailId:',
							groupString: '/emailId:363f',
						},
					],
					identifier: 'email/accountId:4d63/emailId:363f',
					strippedIdentifier: 'email',
				})
			}
		)
	}
)
