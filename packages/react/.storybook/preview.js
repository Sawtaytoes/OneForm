import { Fragment } from 'react'

export const decorators = [
	(
		Story,
	) => (
		<Fragment>
			<style>
				{
					`
						*,
						*::before,
						*::after {
							box-sizing: border-box;
							font-family: sans-serif;
							font-size: 24px;
						}

						input {
							padding: 10px;
						}
					`
				}
			</style>

			<Story />
		</Fragment>
	)
]

export const parameters = {
	actions: {
		argTypesRegex: '^on[A-Z].*',
	},
}
