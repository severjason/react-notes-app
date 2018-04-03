import * as React from 'react';
import './index.css';
import { AppActions, AppNote } from '../../interfaces';
import { SegmentGroup, Segment, Icon } from 'semantic-ui-react/';

interface AppNoteProps {
    content: AppNote;
    actions: AppActions;
}

const Note: React.StatelessComponent<any> = (props: AppNoteProps) => {
    const note: AppNote = props.content;
    const noteExpandedClass: string = (note.expanded) ? 'expanded' : '';
    return (
        <SegmentGroup className="app-note-container">
            <div
                onClick={() => props.actions.deleteNote(note.id)}
                className="app-note-trash-icon"
            >
                <Icon name="trash outline" className="alternate"/>
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
