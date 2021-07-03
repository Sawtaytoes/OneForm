describe(
  'OneForm InitialRadioValue',
  () => {
    it(
      'OneForm state checks radio.',
      () => {
        cy
        .visit(
          'oneform--initial-radio-value'
        )

        cy
        .findByText(
          'second'
        )
        .should(
          'exist',
        )
      },
    )

    it(
      'Changes value when checking radio.',
      () => {
        cy
        .visit(
          'oneform--initial-radio-value'
        )

        cy
        .findByLabelText(
          'Second'
        )
        .should(
          'be.checked',
        )

        cy
        .findByLabelText(
          'First'
        )
        .click()
        .should(
          'be.checked',
        )

        cy
        .findByText(
          'first'
        )
        .should(
          'exist',
        )
      },
    )
  }
)
