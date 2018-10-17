import * as React from 'react';
import { AppAction, AppActionNote, AppNote } from '../../../../interfaces';
import { Button } from '@material-ui/core';

interface AppModalButtons {
  openedForUpdate: boolean;
  isDisabled: boolean;
  note: AppNote;
  onClose(): AppAction;
  addNote(): void;
  updateNote(note: AppNote): AppActionNote;
  resetForm(): void;
}

const ModalButtons: React.StatelessComponent<AppModalButtons> =
  ({onClose, addNote, resetForm, updateNote, note, openedForUpdate, isDisabled}) => (
    <React.Fragment>
      <Button onClick={onClose}>
        Close
      </Button>
      <Button
        style={{color: note.color}}
        onClick={() => {
          openedForUpdate ? updateNote(note) : addNote();
          resetForm();
          onClose();
        }}
        disabled={isDisabled}
      >
        {openedForUpdate ? 'Update' : 'Add'}
      </Button>
    </React.Fragment>
  );

export default ModalButtons;
