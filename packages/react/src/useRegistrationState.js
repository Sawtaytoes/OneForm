import {
	useCallback,
	useRef,
} from 'react'

const initialRegistrations = {}

const useRegistrationState = (
	{
		onRegister = (
			Function
			.prototype
		),
		onUnregister = (
			Function
			.prototype
		),
	} = {}
) => {
	const onRegisterRef = (
		useRef()
	)

	onRegisterRef
	.current = (
		onRegister
	)

	const onUnregisterRef = (
		useRef()
	)

	onUnregisterRef
	.current = (
		onUnregister
	)

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

				onRegisterRef
				.current(
					identifier
				)

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

					onUnregisterRef
					.current(
						identifier
					)
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
