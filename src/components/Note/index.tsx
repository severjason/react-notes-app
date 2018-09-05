import * as React              from 'react';
import './index.css';
import { AppActions, AppNote } from '../../interfaces';
import {
    SegmentGroup,
    Segment,
    Label,
    Divider
}                              from 'semantic-ui-react/';
import { ReactNode }           from 'react';
import NoteButtons             from './NoteButtons';

interface AppNoteProps {
    note: AppNote;
    actions: AppActions;
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
        return note.tags.map((tag: string, index: number) => {
            return <Label title={tag} as="a" key={index} tag={true}>{tag}</Label>;
        });
    }

    private getCategories(): ReactNode[] {
        const {note} = this.props;
        return note.categories.map((category: string, index: number) => {
            return <Label title={category} as="a" key={index} basic={true} className={note.color}>{category}</Label>;
        });
    }

    render() {
        const {fullView, note, actions, activeCategory} = this.props;
        return (
            <SegmentGroup className={`app-note-container ${(fullView ? 'full app-border-' + note.color : '')}`}>
                <NoteButtons
                    actions={actions}
                    note={note}
                    fullView={fullView}
                    activeCategory={activeCategory}
                />
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
            </SegmentGroup>
        );
    }
}

export default Note;
