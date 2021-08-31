describe(
  'OneForm InitialMultiSelect',
  () => {
    const storybookPath = 'forms-oneform--initial-multi-select'

    it(
      'Has the initial values set.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByText(
          'Red'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Yellow'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'Green'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'Blue'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Selected colors:'
        )
        .should(
          'to.have',
          'yellowgreen',
        )
      },
    )

    it(
      'Unselect selected values.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Select zero to many colors.'
        )
        .select('')

        cy
        .findByText(
          'Red'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Yellow'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Green'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Blue'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Selected colors:'
        )
        .should(
          'to.be',
          'Selected colors: ',
        )
      },
    )

    it(
      'Changes value when selecting.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByText(
          'Blue'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByLabelText(
          'Select zero to many colors.'
        )
        .select(
          'Blue'
        )

        cy
        .findByText(
          'Yellow'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Green'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Blue'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'Selected colors:'
        )
        .should(
          'to.be',
          'blue',
        )
      },
    )

    it(
      'Multi-selects values.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Select zero to many colors.'
        )
        .select([
          'red',
          'green',
        ])

        cy
        .findByText(
          'Red'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'Yellow'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Green'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'Blue'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByText(
          'Selected colors:'
        )
        .should(
          'to.be',
          'greenred',
        )
      },
    )
  }
)
