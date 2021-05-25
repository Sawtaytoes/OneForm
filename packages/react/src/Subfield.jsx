import PropTypes from 'prop-types'
import {
	Children,
	cloneElement,
	memo,
	useMemo,
} from 'react'

import useSubfield from './useSubfield.js'

const propTypes = {
	children: PropTypes.node.isRequired,
}

const Subfield = ({
	children,
}) => {
	const {
		isHtmlElement,
		isSelected,
	} = (
		useSubfield({
			children,
		})
	)

	const childProps = (
		useMemo(
			() => (
				isHtmlElement
				? {
					selected: isSelected,
				}
				: {
					isSelected,
					selected: isSelected,
				}
			),
			[
				isHtmlElement,
				isSelected,
			],
		)
	)

	return (
		cloneElement(
			(
				Children
				.only(
					children
				)
			),
			childProps,
		)
	)
}

Subfield.propTypes = propTypes

const MemoizedSubfield = memo(Subfield)

export default MemoizedSubfield
