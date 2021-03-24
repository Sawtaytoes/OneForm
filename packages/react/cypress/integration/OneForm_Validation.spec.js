describe(
	'OneForm Validation',
	() => {
		it(
			'Validates a single field.',
			() => {
				const urlSearchParams = (
					new URLSearchParams()
				)

				urlSearchParams
				.append(
					'id',
					'oneform--validation'
				)

				urlSearchParams
				.append(
					'viewMode',
					'story'
				)

				cy
				.visit(
					'/iframe.html'
					.concat('?')
					.concat(
						urlSearchParams
					)
				)

				cy
				.findByRole(
					'textbox'
				)
				.type(
					'aa'
				)
				.should(
					'have.value',
					'aa'
				)

				cy
				.findByRole(
					'button'
				)
				.click()

				cy
				.findByText(
					'No lowercase letters.'
				)
				.should(
					'to.exist'
				)

				cy
				.findByRole(
					'textbox'
				)
				.type(
					'{selectall}{backspace}B'
				)
				.should(
					'have.value',
					'B'
				)

				cy
				.findByRole(
					'button'
				)
				.click()

				cy
				.findByText(
					'No lowercase letters.'
				)
				.should(
					'to.not.exist'
				)
			},
		)
	}
)
