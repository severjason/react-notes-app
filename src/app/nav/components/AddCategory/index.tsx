import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import AddCategoryStyles from './styles';
import { ChangeEvent } from 'react';
import { mainTheme } from '../../../../styles/themes';

interface AddCategoryProps {
  inputShowed: boolean;
  inputValue: string;
  showInput: () => void;
  hideInput: () => void;
  onKeyPress: (e: any) => void;
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

const AddCategory: React.FunctionComponent<AddCategoryProps> = (
  {
    inputShowed,
    inputValue,
    showInput,
    hideInput,
    onInputChange,
    inputIsDisabled,
    addCategory,
    classes,
    onKeyPress,
  }) => (
  <AddCategoryStyles>
    <Tooltip title="Add new category">
      <IconButton className={`category-add-button ${inputShowed ? 'hidden' : ''}`} onClick={showInput}>
        <Add className="add-category-toggle-icon"/>
      </IconButton>
    </Tooltip>
    <div className={`add-category-input-container ${inputShowed ? '' : 'hidden'}`}>
      <Input
        autoFocus={true}
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
        onKeyPress={onKeyPress}
      />
      <IconButton
        onClick={() => addCategory(inputValue)}
        disabled={inputIsDisabled}
        className="add-category-button"
      >
        <Check className="add-category-icon"/>
      </IconButton>
      <IconButton onClick={hideInput}>
        <Close className="close-add-category-icon"/>
      </IconButton>
    </div>
  </AddCategoryStyles>
);
// @ts-ignore
export default withStyles(inputStyles)(React.memo(AddCategory));
