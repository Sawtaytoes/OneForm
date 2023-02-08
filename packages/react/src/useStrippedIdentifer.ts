import {
  useCallback,
  useRef,
} from 'react'

const initialMemoizedIdentifierGroups = {}
const initialStrippedIdentifiers = {}

export const useStrippedIdentifer = () => {
  const identifierGroupsRef = (
    useRef(
      initialMemoizedIdentifierGroups
    )
  )

  const strippedIdentifiersRef = (
    useRef(
      initialStrippedIdentifiers
    )
  )

  const getIdentifierGroup = (
    useCallback(
      (
        groupString,
      ) => {
        if (
          !(
            identifierGroupsRef
            .current
            [groupString]
          )
        ) {
          const [
            groupName,
            groupId,
          ] = (
            groupString
            .split(':')
          )

          identifierGroupsRef
          .current = {
            ...(
              identifierGroupsRef
              .current
            ),
            [groupString]: {
              groupId,
              groupName,
              groupString: (
                '/'
                .concat(
                  groupString
                )
              ),
            },
          }
        }

        return (
          identifierGroupsRef
          .current
          [groupString]
        )
      },
      [],
    )
  )

  const getStrippedIdentifierData = (
    useCallback(
      (
        identifier,
      ) => {
        if (typeof identifier !== 'string') {
          throw new Error(
            'You\'re trying to get data on an identifier and didn\'t pass in a valid one. You passed in:'
            .concat(
              '\n'
            )
            .concat(
              JSON
              .stringify(
                identifier
              )
            )
          )
        }

        if (
          !(
            strippedIdentifiersRef
            .current
            [identifier]
          )
        ) {
          const [
            strippedIdentifier,
            ...groupStrings
          ] = (
            identifier
            .split(
              '/'
            )
          )

          const groupsList = (
            groupStrings
            .map(
              getIdentifierGroup
            )
          )

          const groups = (
            Object
            .fromEntries(
              groupsList
              .map((
                group,
              ) => ([
                (
                  group
                  .groupName
                ),
                group,
              ]))
            )
          )

          const groupsString = (
            (
              (
                groupStrings
                .length
              )
              > 0
            )
            ? (
              '/'
              .concat(
                groupStrings
                .join('/')
              )
            )
            : ''
          )

          strippedIdentifiersRef
          .current = {
            ...(
              strippedIdentifiersRef
              .current
            ),
            [identifier]: {
              groups,
              groupsList,
              groupsString,
              identifier,
              strippedIdentifier,
            },
          }
        }

        return (
          strippedIdentifiersRef
          .current
          [identifier]
        )
      },
      [
        getIdentifierGroup,
      ],
    )
  )

  return {
    getStrippedIdentifierData,
  }
}
