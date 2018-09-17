import * as React        from 'react';
import { ReactNode }     from 'react';
import { Icon, Label }   from 'semantic-ui-react';
import { AppActionTags, AppNote } from '../../../../interfaces';

interface NoteTags {
    tagsList: string[];
    note: AppNote;
    deleteIcon: boolean;
    deleteTag: (tag: string) => AppActionTags;
    handleTagClick: (tag: string) => void;
}

class Tags extends React.Component<NoteTags, {}> {

    private getIcon = (tag: string): ReactNode => {
        const {deleteTag, deleteIcon} = this.props;
        return (
            <Icon
                name="delete"
                className="app-tag-delete-icon"
                onClick={() => deleteIcon ? deleteTag(tag) : false}
            />
        );
    }

    render() {
        const {tagsList, note, deleteIcon, handleTagClick} = this.props;

        return tagsList.map((tag: string, index: number) => (
            <Label
                title={tag}
                as="a"
                key={index}
                tag={true}
                className={`${note.tags.includes(tag) ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
            >
                {tag}
                {(deleteIcon ? this.getIcon(tag) : '')}
            </Label>
        ));
    }
}

export default Tags;