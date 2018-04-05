import * as React from 'react';
import { ChangeEvent } from 'react';
import { Modal, Button, CheckboxProps, InputProps, TextAreaProps } from 'semantic-ui-react';
import { AppActions, AppNote, AppNoteModal } from '../../interfaces';
import { Form, Input, TextArea, Checkbox, Divider } from 'semantic-ui-react';
import './index.css';
import * as uuid from 'uuid';

interface AppNoteModalProps {
    modal: AppNoteModal;
}

interface AppNoteModalDispatch {
    actions: AppActions;
}

export class NoteModal extends React.Component<AppNoteModalProps & AppNoteModalDispatch, {}> {

    private INITIAL_STATE: AppNote = {
        id: '',
        title: '',
        color: 'black',
        text: '',
        categories: [''],
        tags: [''],
        expanded: false,
    };

    private colors: string[] = ['Black', 'Red', 'Green', 'Yellow'];

    private maxTitleLength: number = 20;

    public state: AppNote = Object.assign({}, this.INITIAL_STATE);

    componentDidUpdate() {
        if (this.props.modal.openedForUpdate && this.props.modal.modalProps.id !== this.state.id) {
            this.setState(this.props.modal.modalProps);
        }
    }

    private handleColorChange = (e: ChangeEvent<HTMLInputElement>, {value}: CheckboxProps): void => {
        this.setState({color: value});
    }

    private handleTitleChange = (e: ChangeEvent<HTMLInputElement>, {value}: InputProps) => {
        this.setState({title: value});
    }

    private handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>, {value}: TextAreaProps) => {
        this.setState({text: value});
    }

    private resetState = (): void => {
        this.setState(this.INITIAL_STATE);
    }

    private isDisabled = (): boolean => !(this.state.title);

    private addNote = (): void => {
        const state: AppNote = this.state;
        this.props.actions.addNote({
            ...state,
            id: uuid.v4(),
        });
    }

    public render() {

        const noteForUpdate: boolean = this.props.modal.openedForUpdate;

        const colorCheckboxes = this.colors.map((color: string, index: number) => {
            return (
                <Form.Field key={index}>
                    <label className={`ui ${color.toLowerCase()} basic label app-checkbox-label`} >
                        <Checkbox
                            radio={true}
                            name="colorCheckbox"
                            value={color.toLowerCase()}
                            checked={this.state.color === color.toLowerCase()}
                            onChange={this.handleColorChange}
                            className="ui red"
                        />
                    </label>
                </Form.Field>
            );
        });

        return (
            <div>
                <Modal
                    className="app-note-modal-container"
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
                            <Form.Group widths="equal">
                                <Form.Field required={true} inline={true}>
                                    <label className={`ui right pointing label`}>Title:&nbsp;
                                        <span className="app-note-form--info">
                                            (max length - {this.maxTitleLength})
                                        </span>
                                    </label>
                                    <Input
                                        value={this.state.title}
                                        placeholder="Note title"
                                        maxLength={this.maxTitleLength}
                                        onChange={this.handleTitleChange}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Divider/>
                            <Form.Group inline={true}>
                                <label className={`ui right pointing label`}>Color:</label>
                                {colorCheckboxes}
                            </Form.Group>
                            <Divider/>
                            <Form.Field inline={true}>
                                <label className={`ui pointing below label`}>Text:</label>
                                <TextArea
                                    value={this.state.text}
                                    placeholder="Add some interesting note..."
                                    onChange={this.handleTextChange}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={() => {
                                (noteForUpdate) ? this.props.actions.updateNote(this.state) : this.addNote();
                                this.resetState();
                                this.props.actions.closeModal();
                            }}
                            disabled={this.isDisabled()}
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
