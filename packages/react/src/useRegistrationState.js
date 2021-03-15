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
					registrationsRef
					.current = {
						...(
							registrationsRef
							.current
						),
						[identifier]: (
							(
								registrationsRef
								.current
								[identifier]
							)
							- 1
						),
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

// Method to register and unregister a fieldName.
// Method to register and unregister a validationName.
// Fields you want to validate.
// Fields you want to submit.
// Is an array because we don't care about order.
// Should probably be an object with counts of how many have been registered with that name.

export default useRegistrationState
