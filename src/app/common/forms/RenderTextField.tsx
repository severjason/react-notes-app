import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import TextField from '@material-ui/core/TextField';

interface TextInputProps {
  label: string;
  className?: string;
}

const RenderTextField: React.StatelessComponent<WrappedFieldProps & TextInputProps> =
  ({input, label, validator, meta: {touched, error}, ...custom}: any) => (
    <TextField
      hinttext={label}
      label={label}
      helperText={(!!error && touched) && error}
      error={touched && !!error}
      validate={validator && validator}
      {...input}
      {...custom}
    />
  );

export default RenderTextField;
