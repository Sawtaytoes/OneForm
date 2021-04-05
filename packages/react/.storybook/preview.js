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
							color: #333;
							font-family: sans-serif;
							font-size: 24px;
						}

						label {
							align-items: center;
							display: flex;
						}

						button,
						input,
						option,
						select {
							background-color: #ddd;
							border-radius: 10px;
							border: 0;
							margin-bottom: 6px;
							margin-top: 6px;
							outline: 0;
							padding: 10px;
						}

						button {
							box-shadow: rgb(170, 170, 170) 0 4px 0 0;
						}

						button:hover {
							box-shadow: rgb(170, 170, 170) 0 2px 0 0;
							position: relative;
							top: 2px;
						}

						button:active {
							box-shadow: rgb(170, 170, 170) 0 0 0 0;
							position: relative;
							top: 4px;
						}

						input:focus,
						input:hover {
							background-color: #eee;
						}

						input[type="checkbox"] {
							height: 20px;
							margin-right: 10px;
							width: 20px;
						}

						[data-visited] {
							background-color: limegreen;
						}

						input[data-error] {
							background-color: tomato;
						}

						option {
							background-color: rgba(128, 128, 128, 0.5);
						}

						[data-loading]::before {
							content: '⌛ ';
						}

						[data-submission-state="invalidSubmission"] {
							background-color: tomato;
							box-shadow: rgb(128, 0, 0) 0 4px 0 0;
						}

						[data-submission-state="invalidSubmission"]:hover {
							background-color: tomato;
							box-shadow: rgb(128, 0, 0) 0 2px 0 0;
						}

						[data-submission-state="invalidSubmission"]:active {
							background-color: tomato;
							box-shadow: rgb(128, 0, 0) 0 0 0 0;
						}

						[data-submission-state="pendingSubmission"] {
							background-color: yellow;
							box-shadow: rgb(128, 128, 0) 0 4px 0 0;
						}

						[data-submission-state="pendingSubmission"]:hover {
							background-color: yellow;
							box-shadow: rgb(128, 128, 0) 0 2px 0 0;
						}

						[data-submission-state="pendingSubmission"]:active {
							background-color: yellow;
							box-shadow: rgb(128, 128, 0) 0 0 0 0;
						}

						[data-submission-state="submitted"] {
							background-color: limegreen;
							box-shadow: rgb(0, 128, 0) 0 4px 0 0;
						}

						[data-submission-state="submitted"]:hover {
							background-color: limegreen;
							box-shadow: rgb(0, 128, 0) 0 2px 0 0;
						}

						[data-submission-state="submitted"]:active {
							background-color: limegreen;
							box-shadow: rgb(0, 128, 0) 0 0 0 0;
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
