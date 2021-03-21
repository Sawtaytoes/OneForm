import {
	useCallback,
	useRef,
} from 'react'

const initialRegistrations = {}

const useRegistrationState = () => {
	const registrationsRef = (
		useRef(
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
				}
			},
			[],
		)
	)

	return {
		getAllRegistrations,
		getIsRegistered,
		register,
	}
}

export default useRegistrationState
