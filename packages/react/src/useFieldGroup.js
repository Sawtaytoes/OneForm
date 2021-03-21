import {
	useContext,
	useMemo,
} from 'react'

import FieldGroupContext from './FieldGroupContext'

const useFieldGroup = ({
	name,
	value,
}) => {
	const {
		fieldGroups: parentFieldGroups,
	} = (
		useContext(
			FieldGroupContext
		)
	)

	const fieldGroups = (
		useMemo(
			() => (
				parentFieldGroups
				.concat({
					name,
					value,
				})
			),
			[
				parentFieldGroups,
				name,
				value,
			],
		)
	)

	return {
		fieldGroups,
	}
}

export default useFieldGroup
