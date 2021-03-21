import {
	useContext,
	useMemo,
} from 'react'

import FieldGroupContext from './FieldGroupContext'

const useFieldName = ({
	name,
}) => {
	const {
		fieldGroups,
	} = (
		useContext(
			FieldGroupContext
		)
	)

	const fieldName = (
		useMemo(
			() => (
				[
					name,
				]
				.concat(
					fieldGroups
					.map(({
						name,
						value,
					}) => (
						`/${name}:${value}`
					))
				)
				.join('/')
			),
			[
				fieldGroups,
				name,
			],
		)
	)

	return {
		fieldName,
	}
}

export default useFieldName
