import * as React from 'react';
import { AppNoteActions, AppNote } from '../../interfaces/notes';
import { AppModalActions } from '../../interfaces/modal';
import { Card, CardHeader, CardContent, Typography, Divider, Chip, CardActionArea } from '@material-ui/core';
import { ReactNode } from 'react';
import NoteButtons from './NoteButtons';
import NoteStyles from './styles';

interface AppNoteProps {
  note: AppNote;
  actions: AppNoteActions & AppModalActions;
  fullView?: boolean;
  activeCategory?: string;
}

class Note extends React.Component<AppNoteProps, {}> {

  private getNoteExpandedClass(): string {
    const {note, fullView} = this.props;
    return (note.expanded || fullView) ? 'expanded' : '';
  }

  private addDots(): string {
    const {note} = this.props;
    return (note.text.length > 300 ? '...' : '');
  }

  private getTags(): ReactNode[] {
    const {note} = this.props;
    return note.tags.map((tag: string, index: number) =>
      <Chip className={`note-tag`} label={tag} key={index}/>);
  }

  private getCategories(): ReactNode[] {
    const {note} = this.props;
    return note.categories.map((category: string, index: number) => {
      return (
        <Chip
          style={{borderColor: note.color}}
          className={`note-category`}
          label={category.toUpperCase()}
          key={index}
          variant="outlined"
        />);
    });
  }

  private getNoteHeader(): ReactNode {
    const {note, fullView, actions} = this.props;
    return (
      <CardHeader
        onClick={() => fullView ? null : actions.toggleNote(note.id)}
        className={`note-header`}
        title={note.title}
      />);
  }

  render() {
    const {fullView, note, actions, activeCategory} = this.props;
    return (
      <NoteStyles className={`${(fullView ? 'full' : '')}`}>
        <Card className="note-card">
          {fullView
            ? this.getNoteHeader() :
            <CardActionArea className={`card-action`}>
              {this.getNoteHeader()}
            </CardActionArea>}
          <div className="buttons-container">
            <NoteButtons actions={actions} note={note} fullView={fullView} activeCategory={activeCategory}/>
          </div>
          <Divider style={{backgroundColor: note.color, height: 2}} />
          <CardContent className={`note-content ${this.getNoteExpandedClass()}`}>
            <Typography component="div">
              <div className={`${note.tags.length > 0 ? '' : 'hidden'} app-note-tags`}>
                {fullView ? `Tags: ` : ''}
                {this.getTags()}
                <Divider className={`note-divider`}/>
                <div className={`${note.categories.length > 0 && fullView ? '' : 'hidden'} app-note-tags`}>
                  Categories: {this.getCategories()}
                  <Divider className={`note-divider`}/>
                </div>
                <div>{(fullView) ? note.text : note.text.slice(0, 300) + this.addDots()}</div>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </NoteStyles>
    );
  }
}

export default Note;
