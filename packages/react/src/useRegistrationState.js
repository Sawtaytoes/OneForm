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

	// TODO: When adding validation, we need to add a `getIsRegistered` function.

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
		register,
	}
}

export default useRegistrationState
