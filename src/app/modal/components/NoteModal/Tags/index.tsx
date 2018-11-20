import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Clear from '@material-ui/icons/Clear';
import { AppNote } from '../../../../interfaces';
import { AppTag } from '../../../../nav/interfaces';

interface NoteTags {
  tagsList: AppTag[];
  note: AppNote;
  deleteIcon: boolean;
  deleteTag: (tag: AppTag) => any;
  handleTagClick: (tag: AppTag) => void;
}

class Tags extends React.Component<NoteTags, {}> {
  render() {
    const {tagsList, deleteIcon, handleTagClick, deleteTag} = this.props;

    return tagsList.map((tag: AppTag, index: number) => (
      <Chip
        title={tag.name}
        key={index}
        label={tag}
/*
        className={`tag ${note.tags.includes(tag) ? 'active' : ''}`}
*/
        onClick={() => handleTagClick(tag)}
        onDelete={() => deleteIcon ? deleteTag(tag) : false}
        deleteIcon={deleteIcon ? undefined : <Clear style={{display: 'none'}}/>}
      />
    ));
  }
}

export default Tags;
