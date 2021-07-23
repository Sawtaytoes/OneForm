describe(
  'OneForm ValueStateChange',
  () => {
    const storybookPath = 'oneform--value-state-change'

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
      'Updates two fields when typing in one field.',
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
      },
    )

    it(
      'Updates one field when typing in one field.',
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

        cy
        .findByPlaceholderText(
          'Message 2'
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
          'aa'
        )
      },
    )
  }
)
