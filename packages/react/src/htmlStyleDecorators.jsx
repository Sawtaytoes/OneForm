import { Fragment } from 'react'

import GlobalStyles from './GlobalStyles.jsx'

const htmlStyleDecorators = [
  (
    Story,
  ) => (
    <Fragment>
      <GlobalStyles />
      <Story />
    </Fragment>
  ),
]

export default htmlStyleDecorators
