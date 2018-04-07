import * as React from 'react';
import { ChangeEvent, ReactNode } from 'react';
import { Modal, Button, CheckboxProps, InputProps, TextAreaProps, Label, Icon } from 'semantic-ui-react';
import { AppActions, AppCategories, AppNote, AppNoteModal, AppTags } from '../../interfaces';
import { Form, Input, TextArea, Checkbox, Divider } from 'semantic-ui-react';
import './index.css';
import * as uuid from 'uuid';
import * as helpers from '../../helpers';

interface AppNoteModalProps {
    modal: AppNoteModal;
    categories: AppCategories;
    tags: AppTags;
}

interface AppNoteModalDispatch {
    actions: AppActions;
}

interface AppNoteModalState extends AppNote {
    newTag: string;
}

export class NoteModal extends React.Component<AppNoteModalProps & AppNoteModalDispatch, {}> {

    private INITIAL_STATE: AppNoteModalState = {
        id: '',
        title: '',
        color: 'black',
        text: '',
        categories: [],
        tags: [],
        expanded: false,
        newTag: ''
    };

    public state: AppNoteModalState = Object.assign({}, this.INITIAL_STATE);

    private colors: string[] = ['black', 'red', 'green', 'orange', 'blue', 'purple', 'brown', 'violet', 'teal', 'pink'];

    private maxTitleLength: number = 20;

    private maxNewTagLength: number = 15;

    private maxTextAreaLength: number = 2000;

    componentDidUpdate() {
        if (this.props.modal.openedForUpdate && this.props.modal.modalProps.id !== this.state.id) {
            this.setState(this.props.modal.modalProps);
        }
    }

    private handleColorChange = (e: ChangeEvent<HTMLInputElement>, {value}: CheckboxProps): void => {
        this.setState({color: value});
    }

    private handleTitleChange = (e: ChangeEvent<HTMLInputElement>, {value}: InputProps): void => {
        this.setState({title: value});
    }

    private handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>, {value}: TextAreaProps): void => {
        this.setState({text: value});
    }

    private handleCategoryChange = (e: ChangeEvent<HTMLInputElement>, {value}: any): void => {
        this.setState({categories: helpers.toggleStringInArray(this.state.categories, value)});
    }

    private handleTagClick = (clickedTag: string): void => {
        this.setState({tags: helpers.toggleStringInArray(this.state.tags, clickedTag)});
    }

    private handleNewTagChange = (e: ChangeEvent<HTMLInputElement>, {value}: InputProps): void => {
        this.setState({newTag: value});
    }

    private handleDeleteTag = (tag: string): void => {
        this.props.actions.deleteCustomTag(tag);
    }

    private resetState = (): void => this.setState(this.INITIAL_STATE);

    private resetNewTag = (): void => this.setState({newTag: ''});

    private addNoteIsDisabled = (): boolean => !(this.state.title);

    private addTagIsDisabled = (tags: string[]): boolean => tags.includes(this.state.newTag.toLowerCase());

    private removeNewTagFromState = (state: AppNoteModalState): AppNote => ({
        id: state.id,
        title: state.title,
        color: state.color,
        text: state.text,
        categories: state.categories,
        tags: state.tags,
        expanded: state.expanded,
    })

    private addNote = (): void => {
        const state: AppNoteModalState = this.state;
        this.props.actions.addNote(this.removeNewTagFromState({
            ...state,
            id: uuid.v4(),
        }));
    }

    public render() {

        const categoriesList: string[] = this.props.categories.categoriesList
            .filter((category: string) => category !== 'all');

        const noteForUpdate: boolean = this.props.modal.openedForUpdate;

        const colorCheckboxes = this.colors.map((color: string, index: number) => {
            return (
                <Form.Field key={index}>
                    <label
                        className={`ui ${color}
                        ${(this.state.color === color) ? '' : 'basic'} label app-checkbox-label`}
                    >
                        <Checkbox
                            radio={true}
                            name="colorCheckbox"
                            value={color}
                            checked={this.state.color === color}
                            onChange={this.handleColorChange}
                        />
                    </label>
                </Form.Field>
            );
        });

        const categoriesCheckboxes = categoriesList.map((category: string, index: number) => {
            return (
                <Form.Field key={index}>
                    <label
                        className={`ui basic label app-modal-category-title ${(this.state.categories.includes(category))
                            ? this.state.color
                            : ''}`}
                    >
                        <Checkbox
                            name="categoryCheckbox"
                            value={category}
                            checked={this.state.categories.includes(category)}
                            onChange={this.handleCategoryChange}
                        />
                        {category}
                    </label>
                </Form.Field>
            );
        });

        // generate tags and add delete icons only to custom tags
        const getTags = (tagsList: string[], deleteIcon: boolean): ReactNode => {
            const getIcon = (tag: string): ReactNode => (
                <Icon
                    name="delete"
                    className="app-tag-delete-icon"
                    onClick={() => deleteIcon ? this.handleDeleteTag(tag) : false}
                />
            );
            return tagsList.map((tag: string, index: number) => {
                return (
                    <Label
                        title={tag}
                        as="a"
                        key={index}
                        tag={true}
                        className={`${this.state.tags.includes(tag) ? 'active' : ''}`}
                        onClick={() => this.handleTagClick(tag)}
                    >
                        {tag}
                        {(deleteIcon ? getIcon(tag) : '')}
                    </Label>
                );
            });
        };

        const basicTags = getTags(this.props.tags.basicTags, false);

        const customTags = getTags(this.props.tags.customTags, true);

        const allTags = this.props.tags.basicTags.concat(this.props.tags.customTags);

        return (
            <div>
                <Modal
                    className={`app-note-modal-container scrolling app-border-${this.state.color}`}
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
                        {(noteForUpdate) ? 'Update note' : 'Create new note'}
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
                                    value={this.state.title}
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
                            <Form.Group inline={true} className="limited-height">
                                <Label
                                    className={`right pointing basic grey app-modal-label app-categories`}
                                >
                                    Category:
                                </Label>
                                {categoriesCheckboxes}
                            </Form.Group>
                            <Divider hidden={true}/>
                            <Form.Group >
                                <Label.Group className="limited-height">
                                    <Label
                                        className={`right pointing basic grey app-modal-label app-tags-category`}
                                    >
                                        Tags:
                                    </Label>
                                    {basicTags}
                                    {customTags}
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
                                        this.setState({tags: this.state.tags.concat(this.state.newTag)});
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
                                    value={this.state.text}
                                    placeholder="Add some interesting text..."
                                    onChange={this.handleTextChange}
                                    maxLength={this.maxTextAreaLength}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={() => {
                                (noteForUpdate)
                                    ? this.props.actions.updateNote(this.removeNewTagFromState(this.state))
                                    : this.addNote();
                                this.resetState();
                                this.props.actions.closeModal();
                            }}
                            disabled={this.addNoteIsDisabled()}
                            className={`ui ${this.state.color}`}
                        >
                            {(noteForUpdate) ? 'Update' : 'Add'}
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default NoteModal;
