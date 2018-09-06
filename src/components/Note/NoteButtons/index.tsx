import * as React              from 'react';
import { Icon }                from 'semantic-ui-react';
import { AppNoteActions, AppNote } from '../../../interfaces/notes';
import { AppModalActions } from '../../../interfaces/modal';
import { Link }                from 'react-router-dom';

interface AppNoteButtonsProps {
    note: AppNote;
    actions: AppNoteActions & AppModalActions;
    fullView?: boolean;
    activeCategory?: string;
}

const NoteButtons: React.StatelessComponent<AppNoteButtonsProps> = ({actions, note, fullView, activeCategory}) => {

    return (
        <React.Fragment>
            <div
                onClick={() => actions.deleteNote(note.id)}
                className="app-note-icon app-note-trash-icon"
                title="Delete note"
            >
                <Icon name="trash alternate outline" className="alternate"/>
            </div>
            <div
                className="app-note-icon app-note-edit-icon"
                title="Edit note"
                onClick={() => actions.openModalForUpdate(note)}
            >
                <Icon name="edit" className="outline"/>
            </div>
            {(!fullView)
                ? <Link to={`/note/${note.id}`}>
                    <div className="app-note-icon app-note-expand-icon" title="Expand note">
                        <Icon name="expand" className="arrows alternate"/>
                    </div>
                </Link>
                : <Link to={`/notes/${activeCategory}`}>
                    <div className="app-note-icon app-note-close-icon" title="Close note">
                        <Icon name="close"/>
                    </div>
                </Link>
            }
        </React.Fragment>
    );
};

export default NoteButtons;
