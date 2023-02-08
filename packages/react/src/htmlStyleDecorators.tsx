import {
  Story,
} from '@storybook/react'
import {
  Fragment,
} from 'react'

import {
  GlobalStyles,
} from './GlobalStyles'

export const htmlStyleDecorators = [
  (
    StoryComponent: Story,
  ) => (
    <Fragment>
      <GlobalStyles />
      <StoryComponent />
    </Fragment>
  ),
]
