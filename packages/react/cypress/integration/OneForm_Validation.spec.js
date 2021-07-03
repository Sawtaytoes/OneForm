describe(
  'OneForm Validation',
  () => {
    it(
      'Validates a single field.',
      () => {
        cy
        .visit(
          'oneform--validation'
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
        .findByText(
          'No lowercase letters.'
        )
        .should(
          'to.not.exist'
        )

        cy
        .findByRole(
          'button'
        )
        .click()
      },
    )
  }
)
