import React from 'react';
import { AppAllActions } from '../../../interfaces';
import { EmptyPage } from '../../../common';
import { Note } from '../../../note/components';
import { ReactNode } from 'react';
import NotesListStyles from './styles';
import { AppNote } from '../../../note/interfaces';

interface AppNoteListProps {
  notes: AppNote[];
  actions: AppAllActions;
  activatedCategory: string | null;
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
    const filteredNotes = notes.filter(note =>
      activatedCategory === 'all' || note.category && note.category.id === activatedCategory);
    return filteredNotes.map((note: AppNote, index: number) =>
      <Note key={index} {...note} actions={actions}/>);
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
