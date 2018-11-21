import * as  React from 'react';
import { AppNote } from '../../../../note/interfaces';
import Radio from '@material-ui/core/Radio';
import { ChangeEvent } from 'react';

interface AppCheckboxes {
  colors: string[];
  note: AppNote;
  onColorChange (e: ChangeEvent<HTMLInputElement>): void;
}

const ColorCheckboxes: React.StatelessComponent<AppCheckboxes> = ({colors, note, onColorChange}): any =>
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

export default ColorCheckboxes;
