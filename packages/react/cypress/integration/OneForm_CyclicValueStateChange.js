describe(
  'OneForm CyclicValueStateChange',
  () => {
    const storybookPath = 'forms-oneform--cyclic-value-state-change'

    it(
      'Has no initial values.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .should(
          'have.value',
          '',
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .should(
          'have.value',
          '',
        )
      },
    )

    it(
      'Handles cyclic state changes.',
      () => {
        cy
        .visit(
          storybookPath
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .type(
          'aa'
        )
        .should(
          'to.be',
          'aa',
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .should(
          'to.be',
          'aa',
        )
        .type(
          'bb'
        )
        .should(
          'to.be',
          'aabb',
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .should(
          'to.be',
          'aabb',
        )
      },
    )
  }
)
