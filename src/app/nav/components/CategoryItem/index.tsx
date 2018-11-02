import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppCategoriesActions } from '../../interfaces';
import { MenuItem, ListItemIcon, ListItemText, Tooltip, IconButton } from '@material-ui/core';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Inbox from '@material-ui/icons/Inbox';
import ShortText from '@material-ui/icons/ShortText';
import WorkOutline from '@material-ui/icons/WorkOutline';
import LocalHospitalOutlined from '@material-ui/icons/LockOutlined';
import Close from '@material-ui/icons/Close';
import CategoryItemStyles from './styles';
import { ReactElement } from 'react';

interface CategoryItemProps {
  category: string;
  expanded: boolean;
  activated: string;
  actions: AppCategoriesActions;
}

const getIcon = (category: string): ReactElement<any> => {
  switch (category) {
    case 'all':
      return <Inbox className="category-icon"/>;
    case 'work':
      return <WorkOutline className="category-icon"/>;
    case 'health':
      return <LocalHospitalOutlined className="category-icon"/>;
    case 'private':
      return <LockOutlined className="category-icon"/>;
    default:
      return <ShortText className="category-icon"/>;
  }
};

const CategoryItem: React.StatelessComponent<CategoryItemProps> = ({category, activated, expanded, actions}) => {
  return (
    <CategoryItemStyles>
      <Link to={`/notes/${category}`} onClick={() => actions.activateCategory(category)}>
        <MenuItem className={`category-menu-item ${category === activated ? 'active' : ''}`}>
          <ListItemIcon>
            {getIcon(category)}
          </ListItemIcon>
          <ListItemText className="category-title">
            {category}
          </ListItemText>
        </MenuItem>
      </Link>
      <ListItemIcon>
        <React.Fragment>
          <Tooltip title={`Delete ${category.toUpperCase()} category`}>
            <IconButton
              className={`category-delete-icon ${(activated === category || category === 'all') ? 'hidden' : ''}`}
              onClick={() => actions.deleteCategory(category)}
            >
              <Close/>
            </IconButton>

          </Tooltip>
        </React.Fragment>
      </ListItemIcon>
    </CategoryItemStyles>
  );
};

export default CategoryItem;
