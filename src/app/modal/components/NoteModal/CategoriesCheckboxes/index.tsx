import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import { AppNote } from '../../../../note/interfaces';
import { AppCategory } from '../../../../nav/interfaces';

interface AppCheckboxes {
  note: AppNote;
  categories: AppCategory[];
  onCategoryChange(category: AppCategory): void;
}

const CategoriesCheckboxes: React.StatelessComponent<AppCheckboxes> = ({note, categories, onCategoryChange}): any =>
  categories.map((category: AppCategory, index: number) => {
    return (
      <Chip
        style={{borderColor: note.color}}
        label={category.name.toUpperCase()}
        className={`category-chip ${(note.category && (note.category.id === category.id)) ? 'active' : ''}`}
        key={index}
        variant="outlined"
        clickable={true}
        onClick={() => onCategoryChange(category)}
      />

    );
  });

export default CategoriesCheckboxes;
