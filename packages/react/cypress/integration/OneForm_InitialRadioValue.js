describe(
  'OneForm InitialRadioValue',
  () => {
    const storybookPath = 'oneform--initial-radio-value'

    it(
      'Has initial value.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Second'
        )
        .should(
          'be.checked',
        )

        cy
        .findByText(
          'Selected Item:'
        )
        .should(
          'to.have',
          'second',
        )
      },
    )

    it(
      'Changes values when checking radio buttons.',
      () => {
        cy
        .visit(
          storybookPath
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
        .findByLabelText(
          'Second'
        )
        .should(
          'not.be.checked',
        )

        cy
        .findByText(
          'Selected Item:'
        )
        .should(
          'to.have',
          'first',
        )

        cy
        .findByLabelText(
          'Second'
        )
        .click()
        .should(
          'be.checked',
        )

        cy
        .findByLabelText(
          'First'
        )
        .should(
          'not.be.checked',
        )

        cy
        .findByText(
          'Selected Item:'
        )
        .should(
          'to.have',
          'second',
        )
      },
    )

    it(
      'Retains value after being selected twice.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByLabelText(
          'Second'
        )
        .click()
        .should(
          'be.checked',
        )

        cy
        .findByLabelText(
          'First'
        )
        .should(
          'not.be.checked',
        )

        cy
        .findByText(
          'Selected Item:'
        )
        .should(
          'to.have',
          'second',
        )
      },
    )
  }
)
