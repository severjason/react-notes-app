import * as React from 'react';
import { IconButton, Input, withStyles } from '@material-ui/core';
import { Add, Check, Close } from '@material-ui/icons';
import AddCategoryStyles from './styles';
import { ChangeEvent } from 'react';
import { mainTheme } from '../../../styles/themes';

interface AddCategoryProps {
  inputShowed: boolean;
  inputValue: string;
  showInput: () => void;
  hideInput: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addCategory: (category: string) => void;
  inputIsDisabled: boolean;
  classes?: any;
}

const inputStyles = (): any => ({
  cssUnderline: {
    '&:after': {
      borderBottomColor: mainTheme.colors.mainColor,
    },
  },
});

const AddCategory: React.StatelessComponent<AddCategoryProps> = (
  {
    inputShowed,
    inputValue,
    showInput,
    hideInput,
    onInputChange,
    inputIsDisabled,
    addCategory,
    classes
  }) => (
  <AddCategoryStyles>
    <IconButton className={`category-add-button ${inputShowed ? 'hidden' : ''}`} onClick={showInput}>
      <Add className="add-category-toggle-icon"/>
    </IconButton>
    <div className={`add-category-input-container ${inputShowed ? '' : 'hidden'}`}>
      <Input
        value={inputValue}
        type="text"
        inputProps={{
          maxLength: 20,
        }}
        placeholder="New category.."
        onChange={onInputChange}
        className={classes.cssUnderline}
        classes={{
          underline: classes.cssUnderline,
        }}
      />
      <IconButton onClick={() => addCategory(inputValue)} disabled={inputIsDisabled} className="add-category-button">
        <Check className="add-category-icon"/>
      </IconButton>
      <IconButton onClick={hideInput}>
        <Close className="close-add-category-icon"/>
      </IconButton>
    </div>
  </AddCategoryStyles>
);

export default withStyles(inputStyles)(AddCategory);
