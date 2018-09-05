import * as React                             from 'react';
import { AppActions, AppCategories, AppNote } from '../../interfaces';
import { Note, EmptyPage }                    from '../../components';
import { ReactNode }                          from 'react';
import NotesListStyles                        from './styles';

interface AppNoteListProps {
    notes: AppNote[];
    actions: AppActions;
    categories: AppCategories;
    routeCategory: string;
}

class NotesList extends React.Component<AppNoteListProps, {}> {

    componentDidMount() {
        const {categories, routeCategory, actions} = this.props;
        if (categories.activated !== routeCategory) {
            actions.activateCategory(routeCategory);
        }
    }

    private filterNotes(notes: AppNote[], categories: AppCategories): AppNote[] {
        return (categories.activated === 'all')
            ? notes
            : notes.filter(note => note.categories.includes(categories.activated));
    }

    private renderFilterNotes = (): ReactNode[] => {
        const {notes, categories, actions} = this.props;
        return this.filterNotes(notes, categories).map((note: AppNote, index: number) => (
            <Note key={index} note={note} actions={actions}/>
        ));
    }

    render() {
        const notes = this.renderFilterNotes();
        const {categories} = this.props;
        return (notes.length > 0)
            ? <NotesListStyles>{notes}</NotesListStyles>
            : <EmptyPage category={categories.activated}/>;
    }
}

export default NotesList;
