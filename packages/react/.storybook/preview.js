import { Fragment } from 'react'

import GlobalStyles from '../src/GlobalStyles.jsx'

export const decorators = [
  (
    Story,
  ) => (
    <Fragment>
      <GlobalStyles />
      <Story />
    </Fragment>
  )
]

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
}
