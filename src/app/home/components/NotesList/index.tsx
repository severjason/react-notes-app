import * as React from 'react';
import { AppAllActions, AppCategories, AppNote } from '../../../interfaces';
import { EmptyPage } from '../../../common';
import { Note } from '../../../note/components';
import { ReactNode } from 'react';
import NotesListStyles from './styles';

interface AppNoteListProps {
  notes: AppNote[];
  actions: AppAllActions;
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

  private renderFilterNotes = (): ReactNode[] => {
    const {notes, actions} = this.props;
    return notes.map((note: AppNote, index: number) => (
      <Note key={index} {...note} actions={actions}/>
    ));
  }

  render() {
    const notes: ReactNode[] = this.renderFilterNotes();
    const {categories} = this.props;
    return (notes.length > 0)
      ? <NotesListStyles>{notes}</NotesListStyles>
      : <EmptyPage category={categories.activated}/>;
  }
}

export default NotesList;
