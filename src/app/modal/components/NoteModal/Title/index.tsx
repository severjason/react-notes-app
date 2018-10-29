import * as React from 'react';
import { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { TitleOutlined } from '@material-ui/icons';

interface AppModalTitle {
  title: string;
  maxLength: number;
  onTitleChange(e: ChangeEvent<HTMLInputElement>): void;
}

const ModalTitle: React.StatelessComponent<AppModalTitle> = ({title, maxLength, onTitleChange}) => {
  return (
    <Grid container={true} spacing={8} alignItems="flex-end">
      <Grid item={true}>
        <TitleOutlined/>
      </Grid>
      <Grid item={true}>
        <TextField
          id="input-title"
          label="Note title"
          value={title}
          required={true}
          onChange={onTitleChange}
          inputProps={{maxLength}}
        />
      </Grid>
    </Grid>
  );
};

export default ModalTitle;
