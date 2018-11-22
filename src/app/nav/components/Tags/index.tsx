import * as React from 'react';
import { AppTag } from '../../interfaces';
import TagsStyles from './styles';
import Chip from '@material-ui/core/Chip/Chip';
import Cancel from '@material-ui/icons/Cancel';
import { AppNote } from '../../../note/interfaces';
import AddTag from './AddTag';
import { ChangeEvent } from 'react';
import { AppAction } from '../../../interfaces';

interface TagsContainerProps {
  tags: AppTag[];
  note: AppNote;
  userId: string;
  handleTagClick: (tag: AppTag) => void;
  deleteTag: (id: string) => void;
  addTag(tag: AppTag): AppAction;
}

interface TagState {
  newTag: string;
}

class Tags extends React.Component<TagsContainerProps, TagState> {

  private maxNewTagLength: number = 20;

  constructor(props: TagsContainerProps) {
    super(props);
    this.state = {
      newTag: '',
    };
  }

  private resetNewTag = (): void => this.setState({newTag: ''});

  private addNewTag = (): void => {
    const {newTag} = this.state;
    const {userId, addTag} = this.props;
    const tag = {name: newTag, uid: userId};
    addTag(tag);
    this.resetNewTag();
  }

  private isTagExists = (tags: AppTag[], tagToCheck: AppTag): boolean => {
    return tags.filter(tag => tag.name === tagToCheck.name.toLowerCase()).length !== 0;
  }

  private handleNewTagChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    this.setState({newTag: value});
  }

  render() {
    const {tags, note, handleTagClick, deleteTag} = this.props;
    const {newTag} = this.state;
    return (
      <TagsStyles>
        <div>
          {
            tags.map((tag: AppTag, index: number) => (
              <Chip
                title={tag.name}
                key={index}
                label={tag.name}
                className={`tag ${this.isTagExists(note.tags, tag) ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
                onDelete={() => tag.id ? deleteTag(tag.id) : false}
                deleteIcon={tag.uid !== 'all' ? <Cancel/> : <Cancel style={{display: 'none'}}/>}
              />
            ))
          }
        </div>
        <AddTag
          newTag={newTag}
          maxLength={this.maxNewTagLength}
          tagButtonDisabled={this.isTagExists(tags, {name: newTag}) || !newTag}
          onTagChange={this.handleNewTagChange}
          addNewTag={this.addNewTag}
        />
      </TagsStyles>
    );
  }
}
export default Tags;
