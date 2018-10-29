import * as React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import { ChangeEvent } from 'react';
import { AppActionTags } from '../../../interfaces';

interface AppAddTag {
  newTag: string;
  maxLength: number;
  tagButtonDisabled: boolean;
  onTagChange(e: ChangeEvent<HTMLInputElement>): void;
  addCustomTag(tag: string): AppActionTags;
  resetNewTag(): void;
  addNewTag(): void;
}

const AddTag: React.StatelessComponent<AppAddTag> =
  ({newTag, maxLength, tagButtonDisabled, onTagChange, addCustomTag, resetNewTag, addNewTag}) => {
  return (
    <Grid container={true} spacing={8} alignItems="flex-end">
      <Grid item={true}>
        <Label/>
      </Grid>
      <Grid item={true}>
        <TextField
          id="input-tag"
          label="Add your tag here..."
          value={newTag}
          onChange={onTagChange}
          inputProps={{
            maxLength: maxLength,
          }}
        />
        <Button
          disabled={tagButtonDisabled}
          onClick={() => {
            addCustomTag(newTag);
            addNewTag();
            resetNewTag();
          }}
        >
          Add tag
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTag;
