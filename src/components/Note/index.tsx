import * as React from 'react';
import { AppNoteActions, AppNote } from '../../interfaces/notes';
import { AppModalActions } from '../../interfaces/modal';
import { Card, CardHeader, CardContent, Typography, Divider, Chip } from '@material-ui/core';
import {
  Label,
} from 'semantic-ui-react/';
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

/*  private getNoteExpandedClass(): string {
    const {note, fullView} = this.props;
    return (note.expanded || fullView) ? 'expanded' : '';
  }*/

  private addDots(): string {
    const {note} = this.props;
    return (note.text.length > 300 ? '...' : '');
  }

  private getTags(): ReactNode[] {
    const {note} = this.props;
    return note.tags.map((tag: string, index: number) => <Chip label={tag} key={index}/>);
  }

  private getCategories(): ReactNode[] {
    const {note} = this.props;
    return note.categories.map((category: string, index: number) => {
      return <Label title={category} as="div" key={index} basic={true}>{category}</Label>;
    });
  }

  render() {
    const {fullView, note, actions, activeCategory} = this.props;
    return (
      <NoteStyles>
        <Card className={`app-note-container ${(fullView ? 'full app-border-' + note.color : '')}`}>
          <CardHeader
            action={
              <NoteButtons actions={actions} note={note} fullView={fullView} activeCategory={activeCategory}/>}
            title={note.title}
          />
          <Divider/>
          <CardContent>
            <Typography component="div">
              <div className={`${note.tags.length > 0 ? '' : 'hidden'} app-note-tags`}>
                {fullView ? `Tags: ` : ''}
                {this.getTags()}
                <Divider/>
                <div className={`${note.categories.length > 0 && fullView ? '' : 'hidden'} app-note-tags`}>
                  Categories: {this.getCategories()}
                </div>
                <Divider/>
                <div>{(fullView) ? note.text : note.text.slice(0, 300) + this.addDots()}</div>
              </div>
            </Typography>
          </CardContent>
        </Card>
       {/* <SegmentGroup className={`app-note-container ${(fullView ? 'full app-border-' + note.color : '')}`}>
          <NoteButtons actions={actions} note={note} fullView={fullView} activeCategory={activeCategory}/>
          <Segment
            onClick={() => fullView ? null : actions.toggleNote(note.id)}
            className={`${fullView ? '' : note.color} app-note-title-container`}
          >
            <div className="app-note-title-text">
              <strong>{note.title}</strong>
            </div>
          </Segment>
          <Segment className={`app-note-info ${this.getNoteExpandedClass()}`}>
            <div className={`${note.tags.length > 0 ? '' : 'hidden'} app-note-tags`}>
              {fullView ? `Tags: ` : ''}
              {this.getTags()}
              <Divider/>
            </div>
            <div className={`${note.categories.length > 0 && fullView ? '' : 'hidden'} app-note-tags`}>
              Categories: {this.getCategories()}
              <Divider/>
            </div>
            <div className={`app-note-text `}>
              <p>{(fullView) ? note.text : note.text.slice(0, 300) + this.addDots()}</p>
            </div>
          </Segment>
        </SegmentGroup>*/}
      </NoteStyles>
    );
  }
}

export default Note;
