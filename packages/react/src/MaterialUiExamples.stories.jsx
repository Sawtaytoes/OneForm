/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormHelperText,
  TextField,
} from '@material-ui/core'
import {
  Alert,
} from '@material-ui/lab'
import {
  action,
} from '@storybook/addon-actions'
import {
  useCallback,
} from 'react'

import Field from './Field'
import FieldErrorMessage from './FieldErrorMessage'
import FieldValue from './FieldValue'
import MaterialUiField from './MaterialUiField'
import OneFormProvider from './OneFormProvider'
import SubmitField from './SubmitField'

export default {
  args: {
    onChange: action(),
    onSubmit: action(),
  },
  argTypes: {
    onChange: 'changed',
    onSubmit: 'submitted',
  },
  title: 'Examples/Material UI',
}

export const Basic = (
  args,
) => {
  const formSubmitted = (
    useCallback(
      ({
        registeredValues,
      }) => {
        args
        .onSubmit(
          registeredValues
        )
      },
      [
        args,
      ],
    )
  )

  const getIsSubmitMessageVisible = (
    useCallback(
      ({
        formChangeState,
        submissionState,
      }) => (
        formChangeState === 'committed'
        && submissionState === 'submitted'
      ),
      [],
    )
  )

  return (
    <OneFormProvider
      {...args}
      onSubmit={formSubmitted}
    >
      <Container maxWidth="xs">
        <Card raised>
          <CardContent>
            <MaterialUiField>
              <TextField
                label="Message"
                name="message"
              />
            </MaterialUiField>

            <FormHelperText>
              You typed: <FieldValue name="message" />
            </FormHelperText>

            <div>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </div>
          </CardContent>

          <SubmitField
            fallback={<div />}
            getIsVisible={getIsSubmitMessageVisible}
          >
            <CardActions>
              <Alert severity="success">
                Form Submitted
              </Alert>
            </CardActions>
          </SubmitField>
        </Card>
      </Container>
    </OneFormProvider>
  )
}

Basic
.args = {
  validations: {
    message: [
      {
        errorMessage: 'You need to type something.',
        getIsValid: ({
          value,
        }) => (
          value
        ),
      },
      {
        errorMessage: 'No lowercase letters.',
        getIsValid: ({
          value,
        }) => (
          value
          && (
            value
            === (
              value
              .toUpperCase()
            )
          )
        ),
      },
    ],
  },
}
