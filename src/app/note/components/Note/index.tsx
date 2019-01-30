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
import { AppTag } from '../../../nav/interfaces';
// @ts-ignore
import _isEqual from 'lodash/isEqual';

interface AppNoteProps {
  actions: AppNoteActions & AppModalActions;
  fullView?: boolean;
  activeCategory?: string | null;
}

class Note extends React.Component<AppNoteProps & AppNote, {}> {

  shouldComponentUpdate(nextProps: AppNoteProps & AppNote, nextState: any) {
    const {activeCategory, title, expanded, color, text, tags} = this.props;
    return activeCategory !== nextProps.activeCategory
      || title !== nextProps.title
      || expanded !== nextProps.expanded
      || color !== nextProps.color
      || text !== nextProps.text
      || !_isEqual(tags, nextProps.tags);
  }

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
    return tags.map((tag: AppTag, index: number) =>
      <Chip className={`note-tag`} label={tag.name} key={index}/>);
  }

  private toggleNote = () => {
    const {id, fullView, actions, expanded} = this.props;
    if (!fullView) {
      actions.toggleNote(id, !expanded);
    }
  }

  private getNoteHeader(): ReactNode {
    const {title} = this.props;
    return (
      <CardHeader
        onClick={this.toggleNote}
        className={`note-header`}
        title={title}
      />);
  }

  render() {
    const {fullView, color, tags, text, id, category, actions, activeCategory} = this.props;
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
              </div>
              {category &&
              <div className={`${fullView ? '' : 'hidden'} app-note-tags`}>
                Category:
                <Chip
                  style={{color: color, fontWeight: 700}}
                  className={`note-category`}
                  label={category.name}
                  variant="outlined"
                />
                <Divider className={`note-divider`}/>
              </div>}
              <div>{(fullView) ? text : text.slice(0, 300) + this.addDots()}</div>
            </Typography>
          </CardContent>
        </Card>
      </NoteStyles>
    );
  }
}

export default Note;
