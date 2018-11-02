import * as React from 'react';
import { Chip } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import { AppActionTags, AppNote } from '../../../../interfaces';

interface NoteTags {
  tagsList: string[];
  note: AppNote;
  deleteIcon: boolean;
  deleteTag: (tag: string) => AppActionTags;
  handleTagClick: (tag: string) => void;
}

class Tags extends React.Component<NoteTags, {}> {
  render() {
    const {tagsList, note, deleteIcon, handleTagClick, deleteTag} = this.props;

    return tagsList.map((tag: string, index: number) => (
      <Chip
        title={tag}
        key={index}
        label={tag}
        className={`tag ${note.tags.includes(tag) ? 'active' : ''}`}
        onClick={() => handleTagClick(tag)}
        onDelete={() => deleteIcon ? deleteTag(tag) : false}
        deleteIcon={deleteIcon ? undefined : <Clear style={{display: 'none'}}/>}
      />
    ));
  }
}

export default Tags;
