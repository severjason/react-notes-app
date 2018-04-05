import * as React from 'react';
import './index.css';
import { AppActions, AppNote } from '../../interfaces';
import { SegmentGroup, Segment, Icon } from 'semantic-ui-react/';

interface AppNoteProps {
    note: AppNote;
    actions: AppActions;
}

const Note: React.StatelessComponent<AppNoteProps> = (props: AppNoteProps) => {
    const note: AppNote = props.note;
    const noteExpandedClass: string = (note.expanded) ? 'expanded' : '';
    return (
        <SegmentGroup className="app-note-container">
            <div
                onClick={() => props.actions.deleteNote(note.id)}
                className="app-note-trash-icon"
                title="Delete note"
            >
                <Icon name="trash outline" className="alternate"/>
            </div>
            <div
                className="app-note-edit-icon"
                title="Edit note"
                onClick={() => props.actions.openModalForUpdate(note)}
            >
                <Icon name="edit" className="outline"/>
            </div>
            <Segment
                onClick={() => props.actions.toggleNote(note.id)}
                className={`${note.color} app-note-title-container`}
            >
                <div className="app-note-title-text">
                    <strong>{note.title}</strong>
                </div>
            </Segment>
            <Segment className={`app-note-info ${noteExpandedClass}`}>
                <p>{note.text}</p>
            </Segment>

        </SegmentGroup>
    );
};

export default Note;
