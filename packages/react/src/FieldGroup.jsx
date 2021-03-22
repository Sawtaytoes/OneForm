import PropTypes from 'prop-types'
import {
	memo,
	useMemo,
} from 'react'

import FieldGroupContext from './FieldGroupContext.js'
import useFieldGroup from './useFieldGroup.js'

const propTypes = {
	children: PropTypes.node.isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
}

const FieldGroup = ({
	children,
	id,
	name,
}) => {
	const {
		fieldGroups,
	} = (
		useFieldGroup({
			id,
			name,
		})
	)

	const fieldGroupProviderValue = (
		useMemo(
			() => ({
				fieldGroups,
			}),
			[
				fieldGroups,
			],
		)
	)

	return (
		<FieldGroupContext.Provider
			value={fieldGroupProviderValue}
		>
			{children}
		</FieldGroupContext.Provider>
	)
}

FieldGroup.propTypes = propTypes

const MemoizedFieldGroup = memo(FieldGroup)

export default MemoizedFieldGroup
