describe(
  'OneForm GroupValidation',
  () => {
    it(
      'Validates a single field.',
      () => {
        cy
        .visit(
          'oneform--group-validation'
        )

        cy
        .findByPlaceholderText(
          'Message 1'
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
          'Messages need to be identical.'
        )
        .should(
          'to.exist'
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .type(
          'aa'
        )
        .should(
          'have.value',
          'aa'
        )

        cy
        .findByText(
          'Messages need to be identical.'
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
