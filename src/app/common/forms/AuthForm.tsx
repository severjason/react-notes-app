import * as React from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps } from 'redux-form';
import { FormGroup, Grid, IconButton, Typography } from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';

const FormStyles = styled.div`
  .grid-container {
    padding-top: 1rem;
  }
  .form-group {
    width: 100%;
    max-width: 300px;
  }
  .api-error {
    color: ${props => props.theme.colors.errorColor};
    font-size: .75rem;
  }
`;

interface AuthFormProps {
  formTitle: string;
  fields: any[];
  social?: any;
}

interface AuthFormField {
  name: string;
  type?: string;
  component?: any;
  label?: string;
  required?: boolean;
  validate?: any;
}

class AuthForm extends React.Component<InjectedFormProps & AuthFormProps> {
  render() {
    const {
      formTitle,
      fields,
      social,
      handleSubmit,
      pristine,
      reset,
      submitting,
      invalid,
      error
    } = this.props;
    return (
      <FormStyles>
        <form onSubmit={handleSubmit}>
          <Grid container={true} alignItems="center" justify="center" direction="column" className="grid-container">
            <Typography variant="h5">
              {formTitle}
            </Typography>
            <FormGroup className="form-group" >
              {fields && fields.map((field: AuthFormField, index: number) => (
                <Field name={field.name} {...field} key={`${index}${field.name}`}/>
              ))}

              {error && <p className="api-error">{error}</p>}
              <Grid container={true} alignItems="center" justify="space-evenly" className="grid-container">
                <IconButton type="button" disabled={pristine || submitting} onClick={reset}>
                  <Clear/>
                </IconButton>
                <IconButton type="submit" disabled={pristine || submitting || invalid}>
                  <Done/>
                </IconButton>
              </Grid>
            </FormGroup>
            {social}
          </Grid>
        </form>
      </FormStyles>
    );
  }
}

export default AuthForm;
