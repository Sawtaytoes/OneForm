import {
  useCallback,
  useRef,
} from 'react'

const initialItemGroups = (
  new Map()
)

export const useItemGroupState = <
  GroupIdentifierType,
  ItemType,
>() => {
  const itemGroupsRef = (
    useRef<
      Map<
        GroupIdentifierType,
        (
          Set<
            ItemType
          >
        )
      >
    >(
      initialItemGroups
    )
  )

  const getItemGroup = (
    useCallback(
      (
        groupIdentifier: GroupIdentifierType,
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
      }: {
        groupIdentifiers: GroupIdentifierType[],
        item: ItemType,
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
