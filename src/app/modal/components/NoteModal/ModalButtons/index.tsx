import * as React from 'react';
import { AppAction } from '../../../../interfaces';
import Button from '@material-ui/core/Button';

interface AppModalButtons {
  openedForUpdate: boolean;
  isDisabled: boolean;
  noteColor: string;
  onClose(): AppAction;
  updateNote(): void;
}

const ModalButtons: React.FunctionComponent<AppModalButtons> =
  ({onClose, updateNote, noteColor, openedForUpdate, isDisabled}) => (
    <React.Fragment>
      <Button onClick={onClose}>
        Close
      </Button>
      <Button
        style={{color: noteColor}}
        onClick={updateNote}
        disabled={isDisabled}
      >
        {openedForUpdate ? 'Update' : 'Add'}
      </Button>
    </React.Fragment>
  );

export default ModalButtons;
