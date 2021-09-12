import PropTypes from 'prop-types'
import {
  Children,
  cloneElement,
  memo,
  useMemo,
} from 'react'

import useSubfield from './useSubfield.js'
import useIsHtmlElement from './useIsHtmlElement.js'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const Subfield = ({
  children,
}) => {
  const {
    value: inputValue,
  } = (
    children
    .props
  )

  const isHtmlElement = (
    useIsHtmlElement(
      children
    )
  )

  const {
    isSelected,
  } = (
    useSubfield({
      inputValue,
    })
  )

  const childProps = (
    useMemo(
      () => (
        isHtmlElement
        ? {
          checked: isSelected,
          selected: isSelected,
        }
        : {
          checked: isSelected,
          isChecked: isSelected,
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
