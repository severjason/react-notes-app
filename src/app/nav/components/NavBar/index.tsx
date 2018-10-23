import * as React from 'react';
import NavBarStyles from './styles';
import { AppModalActions, AppCategories } from '../../../interfaces';
import { AppCategoriesActions } from '../../interfaces';
import { AppBar, IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { mainTheme } from '../../../../styles/themes';
import { Add, Menu, AccountCircleOutlined } from '@material-ui/icons';
import { AppDrawer } from '../../components';
import { Link } from 'react-router-dom';

interface NavBarProps {
  opened: boolean;
  actions: AppCategoriesActions & AppModalActions;
  categories: AppCategories;
}

const NavBar: React.StatelessComponent<NavBarProps> = ({opened, categories, actions}) => (
  <NavBarStyles>
    <AppBar className={`app-bar ${opened ? 'opened' : ''}`} style={{backgroundColor: mainTheme.colors.mainColor}}>
      <Toolbar className="toolbar">
        <div className="notes-actions">
          <IconButton
            className={`menu-button ${opened ? 'hidden' : ''}`}
            color="inherit"
            onClick={actions.toggleCategories}
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6" color="inherit" className="header-title">
            Notes app
          </Typography>
          <Tooltip title="Create note">
            <IconButton color="inherit" aria-label="Menu" onClick={actions.openModal}>
              <Add/>
            </IconButton>
          </Tooltip>
        </div>
        <div className="auth-container">
          <Link to={'/login'}>
            <IconButton color="inherit" aria-label="Menu">
              <AccountCircleOutlined/>
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
    <AppDrawer opened={opened} actions={actions} categories={categories} toggleDrawer={actions.toggleCategories}/>
  </NavBarStyles>
);

export default NavBar;
