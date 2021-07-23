describe(
  'OneForm SelectValue',
  () => {
    it(
      'Defaults to unselected.',
      () => {
        cy
        .visit(
          'oneform--select-value'
        )

        cy
        .findByRole(
          'option'
        )
        .should(
          'to.be',
          'Select a color.',
        )
      },
    )

    it(
      'Selects values.',
      () => {
        cy
        .visit(
          'oneform--select-value'
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

        cy
        .findByRole(
          'combobox'
        )
        .select(
          'Blue'
        )

        cy
        .findByRole(
          'option'
        )
        .should(
          'to.be',
          'Blue',
        )
      },
    )
  }
)
