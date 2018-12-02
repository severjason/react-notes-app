import * as React from 'react';
import TagsWrapperStyles from './styles';
import { AppNavActions, AppTag } from '../../interfaces';
import { Tags } from '../../components';

interface TagsWrapperProps {
  allTags: AppTag[];
  filteredTags: AppTag[];
  userId: string;
  actions: AppNavActions;
}

class TagsWrapper extends React.Component<TagsWrapperProps, {}> {
  render() {
    const {allTags, userId, filteredTags, actions} = this.props;
    return (
      <TagsWrapperStyles>
        <div className="title">
          Tags:
        </div>
        <div className="tags-container">
          <Tags
            allTags={allTags}
            noteTags={filteredTags}
            userId={userId}
            onTagClick={actions.filterTag}
            deleteTag={actions.deleteCustomTag}
            addTag={actions.addTag}
            heightLimit={217}
          />
        </div>
      </TagsWrapperStyles>
    );
  }
}

export default TagsWrapper;
