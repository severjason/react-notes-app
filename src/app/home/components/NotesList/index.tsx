import * as React from 'react';
import { AppAllActions, AppNote } from '../../../interfaces';
import { EmptyPage } from '../../../common';
import { Note } from '../../../note/components';
import { ReactNode } from 'react';
import NotesListStyles from './styles';

interface AppNoteListProps {
  notes: AppNote[];
  actions: AppAllActions;
  activatedCategory: string;
  routeCategory: string;
  routeCategoryId: string;
}

class NotesList extends React.Component<AppNoteListProps, {}> {

  componentDidMount() {
    const {activatedCategory, routeCategory, routeCategoryId, actions} = this.props;
    if (activatedCategory !== routeCategory) {
      actions.activateCategory({id: routeCategoryId, name: routeCategory});
    }
  }

  private renderFilterNotes = (): ReactNode[] => {
    const {notes, actions, activatedCategory} = this.props;
    return notes.map((note: AppNote, index: number) => {
      return (activatedCategory === 'all' || note.category && note.category.name === activatedCategory )
        ? <Note key={index} {...note} actions={actions}/>
        : null;
    });
  }

  render() {
    const notes: ReactNode[] = this.renderFilterNotes();
    const {activatedCategory} = this.props;
    return (notes.length > 0)
      ? <NotesListStyles>{notes}</NotesListStyles>
      : <EmptyPage category={activatedCategory}/>;
  }
}

export default NotesList;
