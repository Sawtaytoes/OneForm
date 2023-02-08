import {
  renderHook,
} from '@testing-library/react'

import useStrippedIdentifer from './useStrippedIdentifer'

describe(
  'useStrippedIdentifer',
  () => {
    test(
      'has no groups when nothing to strip',
      () => {
        const {
          result,
        } = (
          renderHook(
            useStrippedIdentifer
          )
        )

        expect(
          result
          .current
          .getStrippedIdentifierData(
            'email'
          )
        )
        .toEqual({
          groups: {},
          groupsList: [],
          groupsString: '',
          identifier: 'email',
          strippedIdentifier: 'email',
        })
      }
    )

    test(
      'has a group when there is one group',
      () => {
        const {
          result,
        } = (
          renderHook(
            useStrippedIdentifer
          )
        )

        expect(
          result
          .current
          .getStrippedIdentifierData(
            'email/emailId:363f'
          )
        )
        .toEqual({
          groups: {
            emailId: {
              groupId: '363f',
              groupName: 'emailId',
              groupString: '/emailId:363f',
            },
          },
          groupsList: [
            {
              groupId: '363f',
              groupName: 'emailId',
              groupString: '/emailId:363f',
            },
          ],
          groupsString: '/emailId:363f',
          identifier: 'email/emailId:363f',
          strippedIdentifier: 'email',
        })
      }
    )

    test(
      'has many groups when there are many',
      () => {
        const {
          result,
        } = (
          renderHook(
            useStrippedIdentifer
          )
        )

        expect(
          result
          .current
          .getStrippedIdentifierData(
            'email/accountId:4d63/emailId:363f'
          )
        )
        .toEqual({
          groups: {
            accountId: {
              groupId: '4d63',
              groupName: 'accountId',
              groupString: '/accountId:4d63',
            },
            emailId: {
              groupId: '363f',
              groupName: 'emailId',
              groupString: '/emailId:363f',
            },
          },
          groupsList: [
            {
              groupId: '4d63',
              groupName: 'accountId',
              groupString: '/accountId:4d63',
            },
            {
              groupId: '363f',
              groupName: 'emailId',
              groupString: '/emailId:363f',
            },
          ],
          groupsString: '/accountId:4d63/emailId:363f',
          identifier: 'email/accountId:4d63/emailId:363f',
          strippedIdentifier: 'email',
        })
      }
    )
  }
)
