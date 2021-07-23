describe(
  'OneForm InitialCheckboxValues',
  () => {
    const storybookPath = 'oneform--initial-checkbox-values'

    it(
      'Defaults to checked.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Checkbox with Value 1'
        )
        .should(
          'be.checked',
        )

        cy
        .findByLabelText(
          'Checkbox with Value 2'
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
          'Checkbox with Value 1'
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
          'Checkbox with Value 2'
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
