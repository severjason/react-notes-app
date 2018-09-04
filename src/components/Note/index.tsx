import * as React from 'react';
import './index.css';
import { AppActions, AppNote } from '../../interfaces';
import { SegmentGroup, Segment, Icon, Label, Divider } from 'semantic-ui-react/';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface AppNoteProps {
    note: AppNote;
    actions: AppActions;
    fullView?: boolean;
    activeCategory?: string;
}

const Note: React.StatelessComponent<AppNoteProps> = (props: AppNoteProps) => {
    const note: AppNote = props.note;
    const noteExpandedClass: string = (note.expanded || props.fullView) ? 'expanded' : '';
    const addDots: string = (note.text.length > 300 ? '...' : '');
    const noteTags: ReactNode = note.tags.map((tag: string, index: number) => {
        return (
            <Label
                title={tag}
                as="a"
                key={index}
                tag={true}
            >
                {tag}
            </Label>
        );
    });
    const noteCategories: ReactNode = note.categories.map((category: string, index: number) => {
        return (
            <Label
                title={category}
                as="a"
                key={index}
                basic={true}
                className={note.color}
            >
                {category}
            </Label>
        );
    });
    const editOrCloseIcon = (): ReactNode => {
        return (!props.fullView)
            ? (
                <Link to={`/note/${note.id}`}>
                    <div
                        className="app-note-expand-icon"
                        title="Expand note"
                    >
                        <Icon name="expand" className="arrows alternate"/>
                    </div>
                </Link>
            )
            : (
                <Link to={`/notes/${props.activeCategory}`}>
                    <div
                        className="app-note-close-icon"
                        title="Close note"
                    >
                        <Icon name="close"/>
                    </div>
                </Link>
            );
    };
    return (
        <SegmentGroup className={`app-note-container ${(props.fullView ? 'full app-border-' + props.note.color : '')}`}>
            <div
                onClick={() => props.actions.deleteNote(note.id)}
                className="app-note-trash-icon"
                title="Delete note"
            >
                <Icon name="trash alternate outline" className="alternate"/>
            </div>
            <div
                className="app-note-edit-icon"
                title="Edit note"
                onClick={() => props.actions.openModalForUpdate(note)}
            >
                <Icon name="edit" className="outline"/>
            </div>
            {editOrCloseIcon()}
            <Segment
                onClick={() => props.fullView ? null : props.actions.toggleNote(note.id)}
                className={`${props.fullView ? '' : note.color} app-note-title-container`}
            >
                <div className="app-note-title-text">
                    <strong>{note.title}</strong>
                </div>
            </Segment>
            <Segment className={`app-note-info ${noteExpandedClass}`}>
                <div className={`${note.tags.length > 0 ? '' : 'hidden'} app-note-tags`}>
                    {props.fullView ? 'Tags: ' : ''}
                    {noteTags}
                    <Divider/>
                </div>
                <div className={`${note.categories.length > 0 && props.fullView ? '' : 'hidden'} app-note-tags`}>
                    Categories: {noteCategories}
                    <Divider/>
                </div>

                <div className={`app-note-text `}>
                    <p>
                        {(props.fullView) ? note.text : note.text.slice(0, 300) + addDots}
                    </p>
                </div>

            </Segment>

        </SegmentGroup>
    );
};

export default Note;
