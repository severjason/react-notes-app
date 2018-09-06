import * as React     from 'react';
import { Menu }       from 'semantic-ui-react';
import { Link }       from 'react-router-dom';
import { Icon }       from 'semantic-ui-react';
import { AppActions } from '../../../interfaces/index';

interface CategoryItemProps {
    category: string;
    expanded: boolean;
    activated: string;
    actions: AppActions;
}

const CategoryItem: React.StatelessComponent<CategoryItemProps> = ({category, activated, expanded, actions}) => {
    return (
        <Menu.Item
            className={`app-categories-menu-item ${(expanded ? 'expanded' : '')}`}
            active={(activated === category)}
        >
            <Link
                to={`/notes/${category}`}
                className={`${(category === 'all') ? 'app-categories-menu-link app-all' : 'app-categories-menu-link'}`}
                onClick={() => actions.activateCategory(category)}
            >
                {category}
            </Link>
            <Icon
                name="delete"
                className={`app-delete-icon app-category-delete-icon
                        ${(activated === category || category === 'all') ? 'hidden' : ''}`}
                onClick={() => actions.deleteCategory(category)}
            />
        </Menu.Item>
    );
};

export default CategoryItem;
