import { createRoot } from 'solid-js'
import { render } from 'solid-js/web'

import GlobalStyles from '../src/GlobalStyles.jsx'

export const decorators = [
	Story => {
		const rootElement = (
			document
			.createElement(
				'div'
			)
		)

		const dispose = (
			render(
				() => ([
					GlobalStyles(),
					Story(),
				]),
				rootElement,
			)
		)

		const mutationObserver = (
			new MutationObserver(() => {
				dispose()

				mutationObserver
				.disconnect()
			})
		)

		Promise
		.resolve()
		.then(() => {
			mutationObserver
			.observe(
				(
					rootElement
					.parentElement
				),
				{
					childList: true,
				},
			)
		})

		return rootElement
	},
]

export const parameters = {
	actions: {
		argTypesRegex: '^on[A-Z].*',
	},
}
