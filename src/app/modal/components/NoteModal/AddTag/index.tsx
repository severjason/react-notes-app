import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Label from '@material-ui/icons/Label';
import { ChangeEvent } from 'react';
import AddTagStyles from './styles';

interface AppAddTag {
  newTag: string;
  maxLength: number;
  tagButtonDisabled: boolean;

  onTagChange(e: ChangeEvent<HTMLInputElement>): void;

  addCustomTag(tag: string): any;

  resetNewTag(): void;

  addNewTag(): void;
}

const AddTag: React.FunctionComponent<AppAddTag> =
  ({newTag, maxLength, tagButtonDisabled, onTagChange, addCustomTag, resetNewTag, addNewTag}) => {
    return (
      <AddTagStyles>
        <Grid container={true} spacing={8} alignItems="flex-end">
          <Grid item={true} className="label">
            <Label/>
          </Grid>
          <Grid item={true} className="tag-input-container">
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
      </AddTagStyles>
    );
  };

export default AddTag;
