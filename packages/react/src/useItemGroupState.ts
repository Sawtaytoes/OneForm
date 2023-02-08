import {
  useCallback,
  useRef,
} from 'react'

const initialItemGroups = new Map()

const useItemGroupState = () => {
  const itemGroupsRef = (
    useRef(
      initialItemGroups
    )
  )

  const getItemGroup = (
    useCallback(
      (
        groupIdentifier,
      ) => (
        itemGroupsRef
        .current
        .get(
          groupIdentifier
        )
      ),
      [],
    )
  )

  const setItemGroup = (
    useCallback(
      ({
        groupIdentifiers,
        item,
      }) => {
        itemGroupsRef
        .current = (
          groupIdentifiers
          .reduce(
            (
              itemGroups,
              groupIdentifier,
            ) => (
              new Map(
                itemGroups
              )
              .set(
                groupIdentifier,
                (
                  new Set(
                    itemGroups
                    .get(
                      groupIdentifier
                    )
                  )
                  .add(
                    item
                  )
                )
              )
            ),
            (
              itemGroupsRef
              .current
            ),
          )
        )
      },
      [],
    )
  )

  const resetItemGroups = (
    useCallback(
      () => {
        itemGroupsRef
        .current = (
          initialItemGroups
        )
      },
      [],
    )
  )

  return {
    getItemGroup,
    resetItemGroups,
    setItemGroup,
  }
}

export default useItemGroupState
