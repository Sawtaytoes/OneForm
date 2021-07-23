describe(
  'OneForm SelectOptionGroupValue',
  () => {
    const storybookPath = 'oneform--select-option-group-value'

    it(
      'Defaults to unselected.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByRole(
          'option'
        )
        .should(
          'to.be',
          'Select a color.',
        )

        cy
        .findByText(
          'Selected Color:'
        )
        .should(
          'to.be',
          'Selected Color: ',
        )
      },
    )

    it(
      'Selects values.',
      () => {
        cy
        .visit(
          storybookPath
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
        .findByText(
          'Selected Color:'
        )
        .should(
          'to.have',
          'red',
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
        .findByText(
          'Selected Color:'
        )
        .should(
          'to.have',
          'blue',
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
        .findByText(
          'Selected Color:'
        )
        .should(
          'to.have',
          'green',
        )
      },
    )
  }
)
