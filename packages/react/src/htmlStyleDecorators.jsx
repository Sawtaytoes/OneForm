import { Fragment } from 'react'

import {
  GlobalStyles,
} from './GlobalStyles'

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
