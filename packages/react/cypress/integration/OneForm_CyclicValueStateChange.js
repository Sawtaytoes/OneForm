describe(
  'OneForm CyclicValueStateChange',
  () => {
    const storybookPath = 'oneform--cyclic-value-state-change'

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
          'to.be',
          '',
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .should(
          'to.be',
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
