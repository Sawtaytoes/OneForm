describe(
  'OneForm Validation',
  () => {
    const storybookPath = 'forms-oneformprovider--validation'

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
          'to.be',
          '',
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .should(
          'to.be',
          '',
        )
      },
    )

    it(
      'Validates a single field.',
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
          'No lowercase letters.'
        )
        .should(
          'to.exist'
        )
      },
    )

    it(
      'Validates multiple fields individually.',
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
        .findByPlaceholderText(
          'Message 2'
        )
        .type(
          'BB'
        )
        .should(
          'have.value',
          'BB'
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
        .findByText(
          'No uppercase letters.'
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
          'aa'
        )
        .should(
          'have.value',
          'aa'
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .type(
          'BB'
        )
        .should(
          'have.value',
          'BB'
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .type(
          '{backspace}{backspace}AA'
        )
        .should(
          'have.value',
          'AA'
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .type(
          '{backspace}{backspace}bb'
        )
        .should(
          'have.value',
          'bb'
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
          'not.to.exist'
        )

        cy
        .findByText(
          'No uppercase letters.'
        )
        .should(
          'not.to.exist'
        )
      },
    )
  }
)
