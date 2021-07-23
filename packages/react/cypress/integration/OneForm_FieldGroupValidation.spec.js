describe(
  'OneForm FieldGroupValidation',
  () => {
    const storybookPath = 'oneform--field-group-validation'

    it(
      'Has initial values.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message'
        )
        .should(
          'have.value',
          'Time is fun and amazing.',
        )

        cy
        .findByPlaceholderText(
          'Prohibited Word 1'
        )
        .should(
          'have.value',
          'amazing',
        )

        cy
        .findByPlaceholderText(
          'Prohibited Word 2'
        )
        .should(
          'have.value',
          'fun',
        )
      },
    )

    it(
      'Validates fields with their own error messages.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByRole(
          'button'
        )
        .click()

        cy
        .findAllByText(
          'You cannot have prohibited words in your message.'
        )
        .should(
          'exist',
        )
        .should(
          'have.length',
          2,
        )
      },
    )

    it(
      'Validates single field with an error message.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message'
        )
        .type(
          '{selectall}{backspace}Time is amazing.'
        )
        .should(
          'have.value',
          'Time is amazing.',
        )

        cy
        .findByRole(
          'button'
        )
        .click()

        cy
        .findAllByText(
          'You cannot have prohibited words in your message.'
        )
        .should(
          'exist',
        )
        .should(
          'have.length',
          1,
        )
      },
    )

    it(
      'Has no errors when fields are valid.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message'
        )
        .type(
          '{selectall}{backspace}Time is awful.'
        )
        .should(
          'have.value',
          'Time is awful.',
        )

        cy
        .findByRole(
          'button'
        )
        .click()

        cy
        .findAllByText(
          'You cannot have prohibited words in your message.'
        )
        .should(
          'not.exist',
        )
      },
    )
  }
)
