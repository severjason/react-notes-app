import * as  React from 'react';
import { AppNote } from '../../../../Note/interfaces';
import { Radio } from '@material-ui/core';
import { ChangeEvent } from 'react';

interface AppCheckboxes {
  colors: string[];
  note: AppNote;
  onColorChange (e: ChangeEvent<HTMLInputElement>): void;
}

const Checkboxes: React.StatelessComponent<AppCheckboxes> = ({colors, note, onColorChange}): any =>
  colors.map((color: string, index: number) => {
    return (
      <Radio
        key={index}
        name="color-checkbox"
        value={color}
        style={{color: color}}
        checked={note.color === color}
        onChange={onColorChange}
      />
    );
  });

export default Checkboxes;
