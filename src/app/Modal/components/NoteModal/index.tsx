import * as React from 'react';
import { ChangeEvent } from 'react';
import * as uuid from 'uuid';
import * as helpers from '../../../../helpers';
import NoteModalStyles from './styles';
import Tags from './Tags';
import { AppTagsActions, AppModalActions, AppTags, AppModal } from '../../interfaces';
import { AppNoteActions, AppNote } from '../../../Note/interfaces';
import { AppCategories } from '../../../interfaces';
import { Dialog, Grid, TextField, Radio, FormGroup,
  FormLabel, FormControl, Chip, Button } from '@material-ui/core';
import { TitleOutlined, Label } from '@material-ui/icons';
import { notesColors } from '../../../../constants';

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

  private addNoteIsDisabled = (): boolean => !(this.state.note.title);

  private addTagIsDisabled = (tags: string[]): boolean => tags.includes(this.state.newTag.toLowerCase());

  private addNote = (): void => {
    this.props.actions.addNote({
      ...this.state.note,
      id: uuid.v4(),
    });
  }

  getCategoriesList() {
    const {categories} = this.props;
    return categories.categoriesList.filter((category: string) => category !== 'all');
  }

  private colorCheckboxes = () => notesColors.map((color: string, index: number) => {
    const {note} = this.state;
    return (
      <Radio
        key={index}
        name="color-checkbox"
        value={color}
        style={{color: color}}
        checked={note.color === color}
        onChange={this.handleColorChange}
      />
    );
  })

  private categoriesCheckboxes = (color: string) =>
    this.getCategoriesList().map((category: string, index: number) => {
      const {note} = this.state;
      return (
        <Chip
          style={{borderColor: color}}
          label={category.toUpperCase()}
          className={`category-chip ${note.categories.includes(category) ? 'active' : ''}`}
          key={index}
          variant="outlined"
          clickable={true}
          onClick={() => this.handleCategoryChange(category)}
        />

      );
    })

  public render() {
    const {openedForUpdate, basicTags, customTags} = this.props.modal;
    const allTags = basicTags.concat(customTags);
    const {actions, modal} = this.props;
    const {note, newTag} = this.state;
    return (
      <Dialog
        className={`app-note-modal-container scrolling app-border-${note.color}`}
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
            <Grid container={true} spacing={8} alignItems="flex-end">
              <Grid item={true}>
                <TitleOutlined/>
              </Grid>
              <Grid item={true}>
                <TextField
                  id="input-title"
                  label="Note title"
                  value={note.title}
                  required={true}
                  onChange={this.handleTitleChange}
                  inputProps={{
                    maxLength: this.maxTitleLength,
                  }}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl className="form-control">
            <FormLabel className="form-label" component="legend">Color:</FormLabel>
            <FormGroup row={true}>
              {this.colorCheckboxes()}
            </FormGroup>
          </FormControl>
          <FormControl className="form-control">
            <FormLabel className="form-label" component="legend">Categories:</FormLabel>
            <FormGroup row={true}>
              {this.categoriesCheckboxes(note.color)}
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
            <Grid container={true} spacing={8} alignItems="flex-end">
              <Grid item={true}>
                <Label/>
              </Grid>
              <Grid item={true}>
                <TextField
                  id="input-tag"
                  label="Add your tag here..."
                  value={newTag}
                  onChange={this.handleNewTagChange}
                  inputProps={{
                    maxLength: this.maxNewTagLength,
                  }}
                />
                <Button
                  disabled={this.addTagIsDisabled(allTags) || !newTag}
                  onClick={() => {
                    actions.addCustomTag(newTag);
                    this.setState({tags: note.tags.concat(newTag)});
                    this.resetNewTag();
                  }}
                >
                  Add tag
                </Button>
              </Grid>
            </Grid>
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
            <Button onClick={actions.closeModal}>
             Close
            </Button>
            <Button
              style={{color: note.color}}
              onClick={() => {
                (openedForUpdate)
                  ? actions.updateNote(note)
                  : this.addNote();
                this.resetState();
                actions.closeModal();
              }}
              disabled={this.addNoteIsDisabled()}
            >
              {(openedForUpdate) ? 'Update' : 'Add'}
            </Button>
          </FormControl>
        </NoteModalStyles>
      </Dialog>
    );
  }
}

export default NoteModal;
