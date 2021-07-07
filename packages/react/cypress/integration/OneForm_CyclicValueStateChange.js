describe(
  'OneForm CyclicValueStateChange',
  () => {
    it(
      'Handles cyclic state changes.',
      () => {
        cy
        .visit(
          'oneform--cyclic-value-state-change'
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .type(
          'aa'
        )
        .should(
          'have.value',
          'aa'
        )

        cy
        .findByPlaceholderText(
          'Message 2'
        )
        .should(
          'have.value',
          'aa'
        )
        .type(
          'bb'
        )
        .should(
          'have.value',
          'aabb'
        )

        cy
        .findByPlaceholderText(
          'Message 1'
        )
        .should(
          'have.value',
          'aabb'
        )
      },
    )
  }
)
