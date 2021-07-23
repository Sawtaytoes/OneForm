describe(
  'OneForm InitialCheckboxValues',
  () => {
    it(
      'Defaults to checked.',
      () => {
        cy
        .visit(
          'oneform--initial-checkbox-values'
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
      },
    )

    it(
      'Unchecks, then Checks again.',
      () => {
        cy
        .visit(
          'oneform--initial-checkbox-values'
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
      },
    )
  }
)
