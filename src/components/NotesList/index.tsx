import * as React from 'react';
import { AppActions, AppNote } from '../../interfaces';
import { Note, EmptyPage } from '../../components';
import './index.css';
import { ReactNode } from 'react';

interface AppNoteListProps {
    notes: AppNote[];
    actions: AppActions;
}

const NotesList: React.StatelessComponent<AppNoteListProps> = (props: AppNoteListProps) => {

    const notes: ReactNode[] = props.notes.map((note: AppNote, index: number) => {
        return (
            <Note
                key={index}
                note={note}
                actions={props.actions}
            />
        );
    });

    return (notes.length > 0)
        ? (<div className="app-notes-container">{notes}</div>)
        : (<EmptyPage/>);
};

export default NotesList;
