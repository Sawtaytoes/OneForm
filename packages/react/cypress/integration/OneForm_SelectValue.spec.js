describe(
  'OneForm SelectValue',
  () => {
    const storybookPath = 'forms-oneform--select-value'

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
      },
    )
  }
)
