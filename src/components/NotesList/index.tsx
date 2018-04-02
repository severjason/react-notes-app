import * as React from 'react';
import { AppNote } from '../../interfaces';
import { Note } from '../../components';

const NotesList: React.StatelessComponent = (props: any) => {

    const notes: AppNote[] = props.notes.map((note: AppNote, index: number) => {
        return (
            <Note
                key={index}
                content={note}
            />
        );
    });

    return (
        <div>
            {notes}
        </div>
    );
};

export default NotesList;
