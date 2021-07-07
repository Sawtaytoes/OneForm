describe(
  'OneForm InitialMultiSelect',
  () => {
    it(
      'OneForm state checks radio.',
      () => {
        cy
        .visit(
          'oneform--initial-multi-select'
        )

        cy
        .findByText(
          'Red'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'red'
        )
        .should(
          'exist',
        )
      },
    )

    it(
      'Changes value when selecting.',
      () => {
        cy
        .visit(
          'oneform--initial-multi-select'
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
          'Select one of many values.'
        )
        .select(
          'Blue'
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
          'blue'
        )
        .should(
          'exist',
        )
      },
    )

    it(
      'Multi-selects values.',
      () => {
        cy
        .visit(
          'oneform--initial-multi-select'
        )

        cy
        .findByText(
          'Red'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'Green'
        )
        .should(
          'not.be.selected'
        )

        cy
        .findByLabelText(
          'Select one of many values.'
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
          'Green'
        )
        .should(
          'be.selected'
        )

        cy
        .findByText(
          'greenred'
        )
        .should(
          'exist',
        )
      },
    )
  }
)
