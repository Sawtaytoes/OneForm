describe(
  'OneForm InitialCheckboxValues',
  () => {
    const storybookPath = 'forms-oneform--initial-checkbox-values'

    it(
      'Defaults to checked.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Checkbox with Value'
        )
        .should(
          'be.checked',
        )

        cy
        .findByLabelText(
          'Checkbox without Value'
        )
        .should(
          'be.checked',
        )
      },
    )

    it(
      'Unchecks, then Checks again.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Checkbox with Value'
        )
        .click()
        .should(
          'not.be.checked',
        )
        .click()
        .should(
          'be.checked'
        )

        cy
        .findByLabelText(
          'Checkbox without Value'
        )
        .click()
        .should(
          'not.be.checked',
        )
        .click()
        .should(
          'be.checked'
        )
      },
    )
  }
)
