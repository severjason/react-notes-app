import * as React from 'react';
import { AppTag } from '../../interfaces';
import TagsStyles from './styles';
import Chip from '@material-ui/core/Chip/Chip';
import Cancel from '@material-ui/icons/Cancel';
import AddTag from './AddTag';
import { ChangeEvent } from 'react';
import { AppAction } from '../../../interfaces';
import { ExpandableContainer } from '../../../common';
// @ts-ignore
import _uniqBy from 'lodash/uniqBy';
// @ts-ignore
import _isEqual from 'lodash/isEqual';

interface TagsContainerProps {
  allTags: AppTag[];
  noteTags: AppTag[];
  userId: string;
  heightLimit?: number;
  onTagClick: (tag: AppTag) => void;
  deleteTag: (id: string) => void;
  addTag(tag: AppTag): AppAction;
}

interface TagState {
  newTag: string;
}

class Tags extends React.Component<TagsContainerProps, TagState> {

  private maxNewTagLength: number = 20;

  shouldComponentUpdate(nextProps: TagsContainerProps, nextState: TagState) {
    const {allTags, noteTags} = this.props;
    const {newTag} = this.state;
    return !_isEqual(allTags, nextProps.allTags)
      || !_isEqual(noteTags, nextProps.noteTags)
      || newTag !== nextState.newTag;
  }

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
    const {allTags, noteTags, onTagClick, deleteTag, heightLimit} = this.props;
    const {newTag} = this.state;
    const uniqTags = _uniqBy([...allTags, ...noteTags], 'id');
    return (
      <TagsStyles>
        <ExpandableContainer heightLimit={heightLimit} >
          {
            uniqTags.map((tag: AppTag, index: number) => (
              <Chip
                title={tag.name}
                key={index}
                label={tag.name}
                className={`tag ${this.isTagExists(noteTags, tag) ? 'active' : ''}`}
                onClick={() => onTagClick(tag)}
                onDelete={() => tag.id ? deleteTag(tag.id) : false}
                deleteIcon={tag.uid !== 'all' && this.isTagExists(allTags, tag)
                  ? <Cancel/>
                  : <Cancel style={{display: 'none'}}/>}
              />
            ))
          }
        </ExpandableContainer>
        <AddTag
          newTag={newTag}
          maxLength={this.maxNewTagLength}
          tagButtonDisabled={this.isTagExists(uniqTags, {name: newTag}) || !newTag}
          onTagChange={this.handleNewTagChange}
          addNewTag={this.addNewTag}
        />
      </TagsStyles>
    );
  }
}
export default Tags;
