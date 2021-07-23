describe(
  'OneForm InitialSelectValue',
  () => {
    it(
      'Defaults to selected.',
      () => {
        cy
        .visit(
          'oneform--initial-select-value'
        )

        cy
        .findByRole(
          'option'
        )
        .should(
          'to.be',
          'Yellow',
        )
      },
    )

    it(
      'Selects another value.',
      () => {
        cy
        .visit(
          'oneform--initial-select-value'
        )

        cy
        .findByRole(
          'combobox'
        )
        .select(
          'Green'
        )

        cy
        .findByRole(
          'option'
        )
        .should(
          'to.be',
          'Green',
        )

        cy
        .findByRole(
          'combobox'
        )
        .select(
          'Red'
        )

        cy
        .findByRole(
          'option'
        )
        .should(
          'to.be',
          'Red',
        )
      },
    )
  }
)
