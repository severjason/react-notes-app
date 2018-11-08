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
}

class NotesList extends React.Component<AppNoteListProps, {}> {

  componentDidMount() {
    const {activatedCategory, routeCategory, actions} = this.props;
    if (activatedCategory !== routeCategory) {
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
    const {activatedCategory} = this.props;
    return (notes.length > 0)
      ? <NotesListStyles>{notes}</NotesListStyles>
      : <EmptyPage category={activatedCategory}/>;
  }
}

export default NotesList;
