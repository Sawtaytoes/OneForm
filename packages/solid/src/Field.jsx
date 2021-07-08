import {
  children as solidChildren,
  createEffect,
} from 'solid-js'
import {
  spread,
} from 'solid-js/web'

import useFieldValue from './useFieldValue'

const Field = (
  props,
) => {
  const getChildren = (
    solidChildren(
      () => (
        props
        .children
      )
    )
  )

  const {
    getValue,
    setValue,
  } = (
    useFieldValue({
      name: (
        props
        .children
        .name
      ),
    })
  )

  createEffect(() => {
    const children = (
      getChildren()
    )

    const childProps = {
      onInput: (
        event,
      ) => {
        setValue(
          event
          .target
          .value
        )
      },
      value: getValue(),
    }

    spread(
      children,
      childProps,
    )
  })

  return (
    getChildren()
  )
}

export default Field
