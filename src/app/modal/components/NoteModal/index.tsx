import * as React from 'react';
import { ChangeEvent } from 'react';
import * as uuid from 'uuid';
import * as helpers from '../../../../helpers';
import NoteModalStyles from './styles';
import { Tags, ModalButtons, ColorCheckboxes, CategoriesCheckboxes, AddTag, ModalTitle } from '../../components';
import { AppTagsActions, AppModalActions, AppTags, AppModal } from '../../interfaces';
import { AppNoteActions, AppNote } from '../../../note/interfaces';
import { AppCategories } from '../../../interfaces';
import { Dialog, TextField, FormGroup, FormLabel, FormControl } from '@material-ui/core';
import { NOTES_COLORS } from '../../../../constants';

interface AppNoteModalProps {
  modal: AppModal & AppTags;
  noteForUpdate: AppNote | null;
  categories: AppCategories;
}

interface AppNoteModalDispatch {
  actions: AppTagsActions & AppModalActions & AppNoteActions;
}

interface AppNoteModalState {
  note: AppNote;
  newTag: string;
}

export class NoteModal extends React.Component<AppNoteModalProps & AppNoteModalDispatch, {}> {

  private INITIAL_STATE: AppNoteModalState = {
    note: {
      id: '',
      title: '',
      color: '#000',
      text: '',
      categories: [],
      tags: [],
      expanded: false,
    },
    newTag: ''
  };

  public state: AppNoteModalState = this.INITIAL_STATE;

  private maxTitleLength: number = 20;

  private maxNewTagLength: number = 20;

  componentDidUpdate() {
    const {noteForUpdate} = this.props;
    const {note} = this.state;
    if (noteForUpdate && noteForUpdate.id !== note.id) {
      this.setState({note: noteForUpdate});
    }
  }

  private handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    const {note} = this.state;
    this.setState({
      note: {
        ...note,
        color: value,
      },
    });
  }

  private handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    this.setState((state: AppNoteModalState) => ({
      note: {
        ...state.note,
        title: value,
      }
    }));
  }

  private handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    this.setState((state: AppNoteModalState) => ({
      note: {
        ...state.note,
        text: value,
      }
    }));
  }

  private handleCategoryChange = (category: string): void => {
    const {note} = this.state;
    this.setState({
      note: {
        ...note,
        categories: helpers.toggleStringInArray(note.categories, category),
      }
    });
  }

  private handleTagClick = (clickedTag: string): void => {
    const {note} = this.state;
    this.setState({
      note: {
        ...note,
        tags: helpers.toggleStringInArray(note.tags, clickedTag),
      }
    });
  }

  private handleNewTagChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    this.setState({newTag: value});
  }

  private resetState = (): void => this.setState(this.INITIAL_STATE);

  private resetNewTag = (): void => this.setState({newTag: ''});

  private addNewTag = (): void => {
    const {note, newTag} = this.state;
    this.setState({tags: note.tags.concat(newTag)});
  }

  private addNoteIsDisabled = (): boolean => !(this.state.note.title);

  private addTagIsDisabled = (tags: string[]): boolean => tags.includes(this.state.newTag.toLowerCase());

  private addNote = (): void => {
    const { addNote } = this.props.actions;
    addNote({...this.state.note, id: uuid.v4()});
  }

  getCategoriesList() {
    const {categories} = this.props;
    return categories.categoriesList.filter((category: string) => category !== 'all');
  }

  public render() {
    const {openedForUpdate, basicTags, customTags} = this.props.modal;
    const allTags = basicTags.concat(customTags);
    const {actions, modal} = this.props;
    const {note, newTag} = this.state;
    return (
      <Dialog
        className={`${note.color}`}
        open={modal.opened}
        onClose={() => {
          actions.closeModal();
          this.resetState();
        }}
      >
        <NoteModalStyles>
          <p className="modal-header">
            {(openedForUpdate) ? 'Update note' : 'Create new note'}
          </p>
          <FormControl className="form-padding">
            <ModalTitle title={note.title} maxLength={this.maxTitleLength} onTitleChange={this.handleTitleChange}/>
          </FormControl>
          <FormControl className="form-control">
            <FormLabel className="form-label" component="legend">Color:</FormLabel>
            <FormGroup row={true}>
              <ColorCheckboxes note={note} colors={NOTES_COLORS} onColorChange={this.handleColorChange}/>
            </FormGroup>
          </FormControl>
          <FormControl className="form-control">
            <FormLabel className="form-label" component="legend">Categories:</FormLabel>
            <FormGroup row={true}>
              <CategoriesCheckboxes
                note={note}
                categories={this.getCategoriesList()}
                onCategoryChange={this.handleCategoryChange}
              />
            </FormGroup>
          </FormControl>
          <FormControl className="form-control">
            <FormLabel className="form-label" component="legend">Tags:</FormLabel>
            <FormGroup row={true}>
              <Tags
                tagsList={basicTags}
                deleteIcon={false}
                note={note}
                deleteTag={actions.deleteCustomTag}
                handleTagClick={this.handleTagClick}
              />
              <Tags
                tagsList={customTags}
                deleteIcon={true}
                note={note}
                deleteTag={actions.deleteCustomTag}
                handleTagClick={this.handleTagClick}
              />
            </FormGroup>
          </FormControl>
          <FormControl className="form-control">
            <AddTag
              newTag={newTag}
              maxLength={this.maxNewTagLength}
              tagButtonDisabled={this.addTagIsDisabled(allTags) || !newTag}
              onTagChange={this.handleNewTagChange}
              addCustomTag={actions.addCustomTag}
              addNewTag={this.addNewTag}
              resetNewTag={this.resetNewTag}
            />
          </FormControl>
          <FormControl className="form-control">
            <FormLabel className="form-label">Text:</FormLabel>
            <TextField
              value={note.text}
              multiline={true}
              placeholder="Add some interesting text..."
              onChange={this.handleTextChange}
            />
          </FormControl>
          <FormControl className="form-buttons">
            <ModalButtons
              onClose={actions.closeModal}
              addNote={this.addNote}
              updateNote={actions.updateNote}
              resetForm={this.resetState}
              isDisabled={this.addNoteIsDisabled()}
              openedForUpdate={openedForUpdate}
              note={note}
            />
          </FormControl>
        </NoteModalStyles>
      </Dialog>
    );
  }
}

export default NoteModal;
