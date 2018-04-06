import * as React from 'react';
import { AppActions, AppCategories, AppNote } from '../../interfaces';
import { Note, EmptyPage } from '../../components';
import './index.css';
import { ReactNode } from 'react';

interface AppNoteListProps {
    notes: AppNote[];
    actions: AppActions;
    categories: AppCategories;
}

const NotesList: React.StatelessComponent<AppNoteListProps> = (props: AppNoteListProps) => {

    const filteredNotes: AppNote[] = (props.categories.activated === 'all')
        ? props.notes
        : props.notes.filter(note => note.categories.includes(props.categories.activated));

    const notes: ReactNode[] = filteredNotes.map((note: AppNote, index: number) => {
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
        : (<EmptyPage category={props.categories.activated}/>);
};

export default NotesList;
