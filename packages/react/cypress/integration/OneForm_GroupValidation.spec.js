describe(
  'OneForm GroupValidation',
  () => {
    const storybookPath = 'oneform--group-validation'

    it(
      'Has no initial values.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .should(
          'have.value',
          '',
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .should(
          'have.value',
          '',
        )
      },
    )

    it(
      'Validates multiple fields with a single error message.',
      () => {
        cy
        .visit(
          storybookPath
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
      },
    )

    it(
      'Does not show errors when valid.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .type(
          'aab'
        )
        .should(
          'have.value',
          'aab'
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
        .findByPlaceholderText(
          'Message 1'
        )
        .type(
          '{backspace}'
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
