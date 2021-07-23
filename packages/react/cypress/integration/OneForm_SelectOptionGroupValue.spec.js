describe(
  'OneForm SelectOptionGroupValue',
  () => {
    it(
      'Defaults to unselected.',
      () => {
        cy
        .visit(
          'oneform--select-option-group-value'
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
          'oneform--select-option-group-value'
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
      },
    )
  }
)
