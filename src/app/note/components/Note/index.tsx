import * as React from 'react';
import { AppNoteActions, AppNote } from '../../interfaces';
import { AppModalActions } from '../../../interfaces';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import { ReactNode } from 'react';
import NoteButtons from './NoteButtons';
import NoteStyles from './styles';

interface AppNoteProps {
  actions: AppNoteActions & AppModalActions;
  fullView?: boolean;
  activeCategory?: string;
}

class Note extends React.PureComponent<AppNoteProps & AppNote, {}> {

  private getNoteExpandedClass(): string {
    const {expanded, fullView} = this.props;
    return (expanded || fullView) ? 'expanded' : '';
  }

  private addDots(): string {
    const {text} = this.props;
    return (text.length > 300 ? '...' : '');
  }

  private getTags(): ReactNode[] {
    const {tags} = this.props;
    return tags.map((tag: string, index: number) =>
      <Chip className={`note-tag`} label={tag} key={index}/>);
  }

  private getCategories(): ReactNode[] {
    const {categories, color} = this.props;
    return categories.map((category: string, index: number) => {
      return (
        <Chip
          style={{borderColor: color}}
          className={`note-category`}
          label={category.toUpperCase()}
          key={index}
          variant="outlined"
        />);
    });
  }

  private getNoteHeader(): ReactNode {
    const {id, title, fullView, actions} = this.props;
    return (
      <CardHeader
        onClick={() => fullView ? null : actions.toggleNote(id)}
        className={`note-header`}
        title={title}
      />);
  }

  render() {
    const {fullView, color, tags, text, id, categories, actions, activeCategory} = this.props;
    return (
      <NoteStyles className={`${(fullView ? 'full' : '')}`}>
        <Card className="note-card">
          {fullView
            ? this.getNoteHeader() :
            <CardActionArea className={`card-action`}>
              {this.getNoteHeader()}
            </CardActionArea>}
          <div className="buttons-container">
            <NoteButtons actions={actions} noteId={id} fullView={fullView} activeCategory={activeCategory}/>
          </div>
          <Divider style={{backgroundColor: color, height: 2}} />
          <CardContent className={`note-content ${this.getNoteExpandedClass()}`}>
            <Typography component="div">
              <div className={`${tags.length > 0 ? '' : 'hidden'} app-note-tags`}>
                {fullView ? `Tags: ` : ''}
                {this.getTags()}
                <Divider className={`note-divider`}/>
                <div className={`${categories.length > 0 && fullView ? '' : 'hidden'} app-note-tags`}>
                  Categories: {this.getCategories()}
                  <Divider className={`note-divider`}/>
                </div>
              </div>
              <div>{(fullView) ? text : text.slice(0, 300) + this.addDots()}</div>
            </Typography>
          </CardContent>
        </Card>
      </NoteStyles>
    );
  }
}

export default Note;
