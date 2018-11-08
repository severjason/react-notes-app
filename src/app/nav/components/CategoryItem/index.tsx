import * as React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Inbox from '@material-ui/icons/Inbox';
import ShortText from '@material-ui/icons/ShortText';
import WorkOutline from '@material-ui/icons/WorkOutline';
import LocalHospitalOutlined from '@material-ui/icons/LocalHospitalOutlined';
import Close from '@material-ui/icons/Close';
import CategoryItemStyles from './styles';
import { ReactElement } from 'react';
import { AppActionCategory } from '../../interfaces';

interface CategoryItemProps {
  category: string;
  isActivated: boolean;
  categoryId: string;
  activateCategory(category: string): AppActionCategory;
  deleteCategory(category: string): AppActionCategory;
}

const getIcon = (category: string): ReactElement<any> => {
  switch (category.toLowerCase()) {
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

class CategoryItem extends React.Component<CategoryItemProps> {

  shouldComponentUpdate(nextProps: CategoryItemProps, nextState: any) {
    const {isActivated, categoryId} = this.props;
    return isActivated !== nextProps.isActivated || categoryId !== nextProps.categoryId;
  }

  deleteCategory = () => {
    const {categoryId, deleteCategory} = this.props;
    deleteCategory(categoryId);
  }

  activateCategory = () => {
    const {categoryId, activateCategory} = this.props;
    activateCategory(categoryId);
  }

  render() {
    const {category, isActivated} = this.props;
    return (
      <CategoryItemStyles>
        <Link to={`/notes/${category}`} onClick={this.activateCategory}>
          <MenuItem className={`category-menu-item ${isActivated ? 'active' : ''}`}>
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
                className={`category-delete-icon ${(isActivated || category === 'all') ? 'hidden' : ''}`}
                onClick={this.deleteCategory}
              >
                <Close/>
              </IconButton>

            </Tooltip>
          </React.Fragment>
        </ListItemIcon>
      </CategoryItemStyles>
    );
  }
}

export default CategoryItem;
