import {
	act,
	renderHook,
} from '@testing-library/react-hooks'

import useStrippedIdentifer from './useStrippedIdentifer.js'

describe(
	'useStrippedIdentifer',
	() => {
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
							id: '363f',
							name: 'emailId',
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
							id: '4d63',
							name: 'accountId',
						},
						{
							id: '363f',
							name: 'emailId',
						},
					],
					identifier: 'email/accountId:4d63/emailId:363f',
					strippedIdentifier: 'email',
				})
			}
		)
	}
)
