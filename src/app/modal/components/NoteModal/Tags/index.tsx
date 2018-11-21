import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Cancel from '@material-ui/icons/Cancel';
import { AppNote } from '../../../../interfaces';
import { AppTag } from '../../../../nav/interfaces';

interface NoteTags {
  tagsList: AppTag[];
  note: AppNote;
  isTagExists: (tags: AppTag[], tag: AppTag) => boolean;
  handleTagClick: (tag: AppTag) => void;
  deleteTag: (id: string) => void;
}

const Tags: React.FunctionComponent<NoteTags> = ({tagsList, isTagExists, note, handleTagClick, deleteTag}): any =>
  tagsList.map((tag: AppTag, index: number) => (
    <Chip
      title={tag.name}
      key={index}
      label={tag.name}
      className={`tag ${isTagExists(note.tags, tag) ? 'active' : ''}`}
      onClick={() => handleTagClick(tag)}
      onDelete={() => tag.id ? deleteTag(tag.id) : false}
      deleteIcon={tag.uid !== 'all' ? <Cancel/> : <Cancel style={{display: 'none'}}/>}
    />
  ));

export default Tags;
