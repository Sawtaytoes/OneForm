import {
	useCallback,
	useRef,
} from 'react'

const initialMemoizedIdentifierGroups = {}
const initialStrippedIdentifiers = {}

const useStrippedIdentifer = () => {
	const identifierGroupsRef = (
		useRef(
			initialMemoizedIdentifierGroups
		)
	)

	const strippedIdentifiersRef = (
		useRef(
			initialStrippedIdentifiers
		)
	)

	const getIdentifierGroup = (
		useCallback(
			(
				groupString,
			) => {
				if (
					!(
						identifierGroupsRef
						.current
						[groupString]
					)
				) {
					const [
						groupName,
						groupId,
					] = (
						groupString
						.split(':')
					)

					identifierGroupsRef
					.current = {
						...(
							identifierGroupsRef
							.current
						),
						[groupString]: {
							groupId,
							groupName,
							groupNameString: (
								'/'
								.concat(
									groupName
								)
								.concat(
									':'
								)
							),
							groupString: (
								'/'
								.concat(
									groupString
								)
							),
						},
					}
				}

				return (
					identifierGroupsRef
					.current
					[groupString]
				)
			},
			[],
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

					const groupsList = (
						groupStrings
						.map(
							getIdentifierGroup
						)
					)

					const groups = (
						Object
						.fromEntries(
							groupsList
							.map(({
								groupId,
								groupName,
							}) => ([
								groupName,
								groupId,
							]))
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
			[
				getIdentifierGroup,
			],
		)
	)

	return {
		getStrippedIdentifierData,
	}
}

export default useStrippedIdentifer
