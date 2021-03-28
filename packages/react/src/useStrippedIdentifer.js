import {
	useCallback,
	useRef,
} from 'react'

const initialStrippedIdentifiers = {}

const useStrippedIdentifer = () => {
	const strippedIdentifiersRef = (
		useRef(
			initialStrippedIdentifiers
		)
	)

	const getStrippedIdentifierData = (
		useCallback(
			(
				identifier,
			) => {
				if (
					!(
						strippedIdentifiersRef
						.current
						[identifier]
					)
				) {
					const [
						strippedIdentifier,
						...groupStrings
					] = (
						identifier
						.split(
							'/'
						)
					)

					const groupEntries = (
						groupStrings
						.map((
							groupString,
						) => (
							groupString
							.split(':')
						))
					)

					const groupsList = (
						groupEntries
						.map(([
							name,
							id,
						]) => ({
							id,
							name,
						}))
					)

					const groups = (
						Object
						.fromEntries(
							groupEntries
						)
					)

					strippedIdentifiersRef
					.current = {
						...(
							strippedIdentifiersRef
							.current
						),
						[identifier]: {
							groups,
							groupsList,
							identifier,
							strippedIdentifier,
						},
					}
				}

				return (
					strippedIdentifiersRef
					.current
					[identifier]
				)
			},
			[],
		)
	)

	return {
		getStrippedIdentifierData,
	}
}

export default useStrippedIdentifer
