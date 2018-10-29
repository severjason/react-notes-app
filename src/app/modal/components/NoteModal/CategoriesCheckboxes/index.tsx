import * as React from 'react';
import { Chip } from '@material-ui/core';
import { AppNote } from '../../../../note/interfaces';

interface AppCheckboxes {
  note: AppNote;
  categories: string[];
  onCategoryChange(category: string): void;
}

const CategoriesCheckboxes: React.StatelessComponent<AppCheckboxes> = ({note, categories, onCategoryChange}): any =>
  categories.map((category: string, index: number) => {
    return (
      <Chip
        style={{borderColor: note.color}}
        label={category.toUpperCase()}
        className={`category-chip ${note.categories.includes(category) ? 'active' : ''}`}
        key={index}
        variant="outlined"
        clickable={true}
        onClick={() => onCategoryChange(category)}
      />

    );
  });

export default CategoriesCheckboxes;
