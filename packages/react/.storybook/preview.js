import { Fragment } from 'react'

export const decorators = [
	(
		Story,
	) => (
		<Fragment>
			<Story />

			<style>
				{
					`
						*,
						*::before,
						*::after {
							box-sizing: border-box;
							color: #333;
							font-family: sans-serif;
							font-size: 24px;
						}

						button,
						input {
							border: 0;
							margin-bottom: 6px;
							margin-top: 6px;
							outline: 0;
							padding: 10px;
						}

						button {
							background-color: #ccc;
							border-radius: 10px;
						}

						button:hover {
							background-color: #eee;
						}

						button:focus {
							background-color: #ddd;
						}

						input {
							background-color: #ddd;
							border-radius: 10px;
						}

						input:hover,
						input:focus {
							background-color: #eee;
						}

						input[data-error] {
							background-color: tomato;
						}
					`
				}
			</style>
		</Fragment>
	)
]

export const parameters = {
	actions: {
		argTypesRegex: '^on[A-Z].*',
	},
}
