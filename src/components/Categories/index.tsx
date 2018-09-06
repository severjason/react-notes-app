import * as React                                from 'react';
import { Icon, Menu, Button, Input, InputProps } from 'semantic-ui-react';
import { AppActions, AppCategories }             from '../../interfaces/index';
import { ChangeEvent, ReactNode }                from 'react';
import CategoryItem                              from './CategoryItem';
import CategoriesStyles                          from './styles';

interface AppCategoriesDispatch {
    actions: AppActions;
}

interface CategoriesListState {
    showInput: boolean;
    inputValue: string;
}

class Categories extends React.Component<AppCategories & AppCategoriesDispatch, CategoriesListState> {

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
        const {inputValue} = this.state;
        return !inputValue || this.props.categoriesList.includes(inputValue.toLowerCase());
    }

    private getCategories(): ReactNode {
        const {actions, categoriesList, expanded, activated} = this.props;
        return categoriesList.map((category: string) => (
            <CategoryItem
                key={category}
                category={category}
                activated={activated}
                actions={actions}
                expanded={expanded}
            />)
        );
    }

    render() {
        const {actions, expanded} = this.props;
        const {inputValue, showInput} = this.state;
        return (
            <CategoriesStyles className="sixteen wide column">
                <Menu stackable={true} className="app-categories-menu">
                    <Menu.Item
                        className={`app-categories-menu app-categories-menu-logo ${(expanded ? 'expanded' : '')}`}
                        onClick={actions.toggleCategories}
                    >
                        <Icon
                            title={expanded ? 'hide categories' : 'show categories'}
                            name={expanded ? 'toggle on' : 'toggle off'}
                        />
                    </Menu.Item>
                    {this.getCategories()}
                    <Menu.Item
                        className={` app-categories-menu app-add-category-menu
                        ${showInput ? 'hidden' : ''}
                        ${(expanded ? 'expanded' : '')}`}
                        onClick={this.handleShowInputClick}
                    >
                        <strong>Add category</strong>
                    </Menu.Item>
                    <div
                        className={`ui action input app-category-input-container app-categories-menu-item
                        ${showInput ? '' : 'hidden'}
                        ${(expanded ? 'expanded' : '')}`}
                    >
                        <Input
                            value={inputValue}
                            type="text"
                            placeholder="New category.."
                            onChange={this.handleInputChange}
                        />
                        <Button
                            onClick={() => this.handleAddCategoryClick(inputValue)}
                            disabled={this.isInputDisabled()}
                            className="app-add-category-button"
                        >
                            Add
                        </Button>
                        <Icon
                            name="delete"
                            className={`app-delete-icon app-hide-input-icon`}
                            onClick={this.handleHideInputClick}
                        />
                    </div>
                </Menu>
            </CategoriesStyles>
        );
    }
}

export default Categories;
