import * as React from 'react';
import { ChangeEvent } from 'react';
import { Modal, Button, CheckboxProps, InputProps, TextAreaProps, Label } from 'semantic-ui-react';
import { Form, Input, TextArea, Checkbox, Divider } from 'semantic-ui-react';
import * as uuid from 'uuid';
import * as helpers from '../../../../helpers';
import NoteModalStyles from './styles';
import Tags from './Tags';
import { AppTagsActions } from '../../../interfaces/tags';
import { AppModalActions } from '../../../interfaces/modal';
import { AppNoteActions } from '../../../interfaces/notes';
import { AppModal, AppCategories, AppTags, AppNote } from '../../../interfaces';

interface AppNoteModalProps {
  modal: AppModal;
  noteForUpdate: AppNote | null;
  categories: AppCategories;
  tags: AppTags;
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
      color: 'black',
      text: '',
      categories: [],
      tags: [],
      expanded: false,
    },
    newTag: ''
  };

  public state: AppNoteModalState = this.INITIAL_STATE;

  private colors: string[] = ['black', 'red', 'green', 'orange', 'blue', 'purple', 'brown', 'violet', 'teal', 'pink'];

  private maxTitleLength: number = 20;

  private maxNewTagLength: number = 20;

  componentDidUpdate() {
    const {noteForUpdate} = this.props;
    if (noteForUpdate && noteForUpdate.id !== this.state.note.id) {
      this.setState({note: noteForUpdate});
    }
  }

  private handleColorChange = (e: ChangeEvent<HTMLInputElement>, {value}: CheckboxProps): void => {
    this.setState({color: value});
  }

  private handleTitleChange = (e: ChangeEvent<HTMLInputElement>, {value}: InputProps): void => {
    this.setState((state: AppNoteModalState) => ({
      note: {
        ...state.note,
        title: value,
      }
    }));
  }

  private handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>, {value}: TextAreaProps): void => {
    this.setState((state: AppNoteModalState) => ({
      note: {
        ...state.note,
        text: value,
      }
    }));
  }

  private handleCategoryChange = (e: ChangeEvent<HTMLInputElement>, {value}: any): void => {
    this.setState({categories: helpers.toggleStringInArray(this.state.note.categories, value)});
  }

  private handleTagClick = (clickedTag: string): void => {
    this.setState({tags: helpers.toggleStringInArray(this.state.note.tags, clickedTag)});
  }

  private handleNewTagChange = (e: ChangeEvent<HTMLInputElement>, {value}: InputProps): void => {
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
    return this.props.categories.categoriesList.filter((category: string) => category !== 'all');
  }

  public render() {

    const {openedForUpdate} = this.props.modal;

    const colorCheckboxes = this.colors.map((color: string, index: number) => {
      return (
        <Form.Field key={index}>
          <label
            className={`ui ${color}
                        ${(this.state.note.color === color) ? '' : 'basic'} label app-checkbox-label`}
          >
            <Checkbox
              radio={true}
              name="colorCheckbox"
              value={color}
              checked={this.state.note.color === color}
              onChange={this.handleColorChange}
            />
          </label>
        </Form.Field>
      );
    });

    const categoriesCheckboxes = this.getCategoriesList().map((category: string, index: number) => {
      return (
        <Form.Field key={index}>
          <label
            className={`ui basic label app-modal-category-title
                        ${(this.state.note.categories.includes(category))
              ? this.state.note.color
              : ''}`}
          >
            <Checkbox
              name="categoryCheckbox"
              value={category}
              checked={this.state.note.categories.includes(category)}
              onChange={this.handleCategoryChange}
            />
            {category}
          </label>
        </Form.Field>
      );
    });

    const allTags = this.props.tags.basicTags.concat(this.props.tags.customTags);
    return (
      <NoteModalStyles>
        <Modal
          className={`app-note-modal-container scrolling app-border-${this.state.note.color}`}
          size="small"
          open={this.props.modal.opened}
          onClose={() => {
            this.props.actions.closeModal();
            this.resetState();
          }}
          closeIcon={true}
          dimmer="blurring"
        >
          <Modal.Header className={`ui `}>
            {(openedForUpdate) ? 'Update note' : 'Create new note'}
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group>
                <Label className={`right pointing basic grey app-modal-label required`}>Title:
                  <span className="app-note-form--info">
                                            (max length - {this.maxTitleLength})
                                        </span>
                </Label>
                <Input
                  value={this.state.note.title}
                  placeholder="Note title"
                  maxLength={this.maxTitleLength}
                  onChange={this.handleTitleChange}
                  className="app-modal-input"
                />
              </Form.Group>
              <div className="app-required-text">
                <strong>Title</strong> is required
              </div>
              <Divider hidden={true}/>
              <Form.Group inline={true}>
                <Label className={`right pointing basic grey app-modal-label`}>Color:</Label>
                {colorCheckboxes}
              </Form.Group>
              <Divider hidden={true}/>
              <Form.Group inline={true}>
                <Label
                  className={`right pointing basic grey app-modal-label app-categories`}
                >
                  Category:
                </Label>
                {categoriesCheckboxes}
              </Form.Group>
              <Divider hidden={true}/>
              <Form.Group>
                <Label.Group>
                  <Label
                    className={`right pointing basic grey app-modal-label app-tags-category`}
                  >
                    Tags:
                  </Label>
                  <Tags
                    tagsList={this.props.tags.basicTags}
                    deleteIcon={false}
                    note={this.state.note}
                    deleteTag={this.props.actions.deleteCustomTag}
                    handleTagClick={this.handleTagClick}
                  />
                  <Tags
                    tagsList={this.props.tags.customTags}
                    deleteIcon={true}
                    note={this.state.note}
                    deleteTag={this.props.actions.deleteCustomTag}
                    handleTagClick={this.handleTagClick}
                  />
                </Label.Group>
              </Form.Group>
              <Divider hidden={true}/>
              <Form.Group>
                <Input
                  icon="tags"
                  iconPosition="left"
                  placeholder="Add your tag here..."
                  value={this.state.newTag}
                  maxLength={this.maxNewTagLength}
                  className="app-modal-input app-tag-input"
                  onChange={this.handleNewTagChange}
                />
                <Button
                  className="app-modal-button ui label tag "
                  disabled={this.addTagIsDisabled(allTags) || !this.state.newTag}
                  onClick={() => {
                    this.props.actions.addCustomTag(this.state.newTag);
                    this.setState({tags: this.state.note.tags.concat(this.state.newTag)});
                    this.resetNewTag();
                  }}
                >
                  Add tag
                </Button>
              </Form.Group>
              <Divider hidden={true}/>
              <Form.Field inline={true}>
                <Label className={`pointing below basic grey app-modal-label`}>Text:</Label>
                <TextArea
                  value={this.state.note.text}
                  placeholder="Add some interesting text..."
                  onChange={this.handleTextChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => {
                (openedForUpdate)
                  ? this.props.actions.updateNote(this.state.note)
                  : this.addNote();
                this.resetState();
                this.props.actions.closeModal();
              }}
              disabled={this.addNoteIsDisabled()}
              className={`ui ${this.state.note.color}`}
            >
              {(openedForUpdate) ? 'Update' : 'Add'}
            </Button>
          </Modal.Actions>
        </Modal>
      </NoteModalStyles>
    );
  }
}

export default NoteModal;
