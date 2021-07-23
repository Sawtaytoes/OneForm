describe(
  'OneForm CheckboxWithValue',
  () => {
    it(
      'Sets value when checked.',
      () => {
        cy
        .visit(
          'oneform--checkbox-value'
        )

        cy
        .findByText(
          'The Checkbox Value'
        )
        .should(
          'not.exist',
        )

        cy
        .findByLabelText(
          'Checkbox with Value'
        )
        .click()
        .should(
          'be.checked',
        )

        cy
        .findByText(
          'The Checkbox Value'
        )
        .should(
          'exist',
        )
      },
    )
  }
)
