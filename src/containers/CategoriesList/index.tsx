import * as React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { AppActions, AppCategories } from '../../interfaces';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

interface AppCategoriesDispatch {
    actions: AppActions;
}

class CategoriesList extends React.Component<AppCategories & AppCategoriesDispatch, {}> {

    public state = {};

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
                        className="app-categories-menu-logo"
                    >
                        <Icon
                            name="plus"
                        />
                    </Menu.Item>
                </Menu>
        );
    }
}

export default CategoriesList;
