describe(
  'OneForm InitialSelectValue',
  () => {
    const storybookPath = 'forms-oneformprovider--initial-select-value'

    it(
      'Defaults to selected.',
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
          'Yellow',
        )

        cy
        .findByText(
          'Selected Color:'
        )
        .should(
          'to.have',
          'yellow',
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
      },
    )
  }
)
