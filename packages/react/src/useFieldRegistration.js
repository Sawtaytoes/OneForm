import {
	useCallback,
	useContext,
} from 'react'

import RegistrationContext from './RegistrationContext.js'

const useFieldRegistration = ({
	fieldName,
}) => {
	const {
		registerFieldName,
	} = (
		useContext(
			RegistrationContext
		)
	)

	const register = (
		useCallback(
			() => (
				registerFieldName(
					fieldName,
				)
			),
			[
				fieldName,
				registerFieldName,
			],
		)
	)

	return {
		register,
	}
}

export default useFieldRegistration
