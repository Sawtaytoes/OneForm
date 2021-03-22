import {
	useContext,
	useMemo,
} from 'react'

import FieldGroupContext from './FieldGroupContext'

const useFieldGroup = ({
	id,
	name,
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
					id,
					name,
				})
			),
			[
				id,
				name,
				parentFieldGroups,
			],
		)
	)

	return {
		fieldGroups,
	}
}

export default useFieldGroup
