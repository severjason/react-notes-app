import * as React from 'react';
import { Icon, Menu, Button, Input, InputProps } from 'semantic-ui-react';
import { AppActions, AppCategories } from '../../interfaces';
import { ChangeEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface AppCategoriesDispatch {
    actions: AppActions;
}

class CategoriesList extends React.Component<AppCategories & AppCategoriesDispatch, {}> {

    public state = {
        showInput: false,
        inputValue: '',
    };

    private handleShowInputClick = (): void => this.setState({showInput: true});

    private handleHideInputClick = (): void => this.setState({showInput: false, inputValue: ''});

    private handleInputChange = (e: ChangeEvent<HTMLInputElement>, {value}: InputProps): void => {
        this.setState({inputValue: value});
    }

    private handleAddCategoryClick = (category: string): void => {
        this.props.actions.addCategory(category);
        this.setState({showInput: false, inputValue: ''});
    }

    private isInputDisabled = (): boolean => {
        return !this.state.inputValue || this.props.categoriesList.includes(this.state.inputValue.toLowerCase());
    }

    render() {
        const categories: ReactNode = this.props.categoriesList.map((category: string, index: number) => {
            return (
                <Menu.Item
                    key={index}
                    className={`app-categories-menu-item ${(this.props.expanded ? 'expanded' : '')}`}
                    active={(this.props.activated === category)}
                >
                    <Link
                        to={`/notes/${category}`}
                        className={`${(category === 'all')
                            ? 'app-categories-menu-link app-all'
                            : 'app-categories-menu-link'}`}
                        onClick={() => this.props.actions.activateCategory(category)}
                    >
                        {category}
                    </Link>
                    <Icon
                        name="delete"
                        className={`app-category-delete-icon
                        ${(this.props.activated === category || category === 'all') ? 'hidden' : ''}`}
                        onClick={() => this.props.actions.deleteCategory(category)}
                    />
                </Menu.Item>
            );
        });

        return (
            <div>
                <Menu
                    stackable={true}
                    className="app-categories-menu"
                >
                    <Menu.Item
                        className="app-categories-menu-logo"
                        onClick={this.props.actions.toggleCategories}
                    >
                        <Icon
                            name={this.props.expanded ? 'minus' : 'plus'}
                        />
                    </Menu.Item>
                    {categories}
                    <Menu.Item
                        className={`app-add-category-menu
                        ${this.state.showInput ? 'hidden' : ''}
                        ${(this.props.expanded ? 'expanded' : '')}`}
                        onClick={this.handleShowInputClick}
                    >
                        <Icon
                            name="plus"
                        />
                    </Menu.Item>
                    <div
                        className={`ui action input app-category-input-container app-categories-menu-item
                        ${this.state.showInput ? '' : 'hidden'}
                        ${(this.props.expanded ? 'expanded' : '')}`}
                    >
                        <Input
                            value={this.state.inputValue}
                            type="text"
                            placeholder="New category.."
                            onChange={this.handleInputChange}
                        />
                        <Button
                            onClick={() => this.handleAddCategoryClick(this.state.inputValue)}
                            disabled={this.isInputDisabled()}
                            className="app-add-category-button"
                        >
                            Add
                        </Button>
                        <Icon
                            name="delete"
                            className={`app-hide-input-icon`}
                            onClick={this.handleHideInputClick}
                        />
                    </div>
                </Menu>
            </div>

        );
    }
}

export default CategoriesList;
