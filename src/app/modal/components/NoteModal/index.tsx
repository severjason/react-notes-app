import * as React from 'react';
import { ChangeEvent } from 'react';
import * as helpers from '../../../../helpers';
import NoteModalStyles from './styles';
import { ModalButtons, ColorCheckboxes, CategoriesCheckboxes, ModalTitle } from '../../components';
import { Tags } from '../../../nav/components';
import { AppModalActions, AppModal } from '../../interfaces';
import { AppNoteActions, AppNote } from '../../../note/interfaces';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { NOTES_COLORS } from '../../../../constants';
import { AppCategories, AppCategory, AppNavActions, AppTag, AppTagsState } from '../../../nav/interfaces';
import { ExpandableContainer } from '../../../common';

interface AppNoteModalProps {
  userId: string;
  modal: AppModal;
  categories: AppCategories;
  tags: AppTagsState;
}

interface AppNoteModalDispatch {
  actions: AppModalActions & AppNoteActions & AppNavActions;
}

interface AppNoteModalState {
  note: AppNote;
}

export class NoteModal extends React.Component<AppNoteModalProps & AppNoteModalDispatch, {}> {

  private INITIAL_STATE: AppNoteModalState = {
    note: {
      uid: '',
      title: '',
      color: '#000',
      text: '',
      category: null,
      tags: [],
      expanded: false,
    },
  };

  public state: AppNoteModalState = this.INITIAL_STATE;

  private maxTitleLength: number = 20;

  componentDidUpdate() {
    const {modal} = this.props;
    const {note} = this.state;
    if (modal.note && modal.note.id !== note.id) {
      this.setState({note: modal.note});
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

  private handleCategoryChange = (category: AppCategory): void => {
    const {note} = this.state;
    const newCategory = note.category && (category.id === note.category.id) ? null : category;
    this.setState({
      note: {
        ...note,
        category: newCategory,
      }
    });
  }

  private handleTagClick = (clickedTag: AppTag): void => {
    const {note} = this.state;
    this.setState({
      note: {
        ...note,
        tags: helpers.toggleTagInArray(note.tags, clickedTag),
      }
    });
  }

  private resetState = (): void => this.setState(this.INITIAL_STATE);

  private addNoteIsDisabled = (): boolean => {
    const {note} = this.state;
    const {modal} = this.props;
    return !(note.title) || (modal.openedForUpdate && !modal.noteLoaded);
  }

  private addNote = (): void => {
    const { actions, userId } = this.props;
    actions.addNote({...this.state.note, uid: userId});
  }

  private closeDialog = () => {
    const {actions} = this.props;
    actions.closeModal();
    this.resetState();
  }

  private updateNote = () => {
    const {modal, actions} = this.props;
    const {note} = this.state;
    modal.openedForUpdate ? actions.updateNote(note) : this.addNote();
    this.resetState();
    actions.closeModal();
  }

  getCategoriesList() {
    const {categories} = this.props;
    return categories.categoriesList.filter((category: AppCategory) => category.name !== 'all');
  }

  public render() {
    const {openedForUpdate} = this.props.modal;
    const {actions, modal, tags, userId} = this.props;
    const allTags = [...tags.basicTags, ...tags.customTags];
    const {note} = this.state;
    return (
      <Dialog
        open={modal.opened}
        onClose={this.closeDialog}
        disableBackdropClick={true}
        classes={{paper: 'modal-paper'}}
      >
        <NoteModalStyles>
          <p className="modal-header">
            {(openedForUpdate) ? 'Update note' : 'Create new note'}
          </p>
          <FormControl className="form-padding">
            <ModalTitle title={note.title} maxLength={this.maxTitleLength} onTitleChange={this.handleTitleChange}/>
          </FormControl>

          <FormControl className="form-control">
            <FormLabel className="form-label" >Color:</FormLabel>
            <FormGroup row={true} className="checkboxes-container">
              <ColorCheckboxes note={note} colors={NOTES_COLORS} onColorChange={this.handleColorChange}/>
            </FormGroup>
          </FormControl>

          {!!this.getCategoriesList().length && <FormControl className="form-control">
            <FormLabel className="form-label" >Categories:</FormLabel>
            <FormGroup row={true}>
              <ExpandableContainer heightLimit={70}>
                <CategoriesCheckboxes
                  note={note}
                  categories={this.getCategoriesList()}
                  onCategoryChange={this.handleCategoryChange}
                />
              </ExpandableContainer>
            </FormGroup>
          </FormControl>}

          <FormControl className="form-control">
            <FormLabel className="form-label" >Tags:</FormLabel>
            <FormGroup row={true}>
              <Tags
                allTags={allTags}
                noteTags={note.tags}
                addTag={actions.addTag}
                deleteTag={actions.deleteCustomTag}
                onTagClick={this.handleTagClick}
                userId={userId}
                heightLimit={65}
              />
            </FormGroup>
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
              updateNote={this.updateNote}
              isDisabled={this.addNoteIsDisabled()}
              openedForUpdate={openedForUpdate}
              noteColor={note.color}
            />
          </FormControl>
        </NoteModalStyles>
      </Dialog>
    );
  }
}

export default NoteModal;
