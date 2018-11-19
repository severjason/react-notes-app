import * as React from 'react';
import NavBarStyles from './styles';
import { AppModalActions, AppWithFirebaseAuthProps, AppCategory } from '../../../interfaces';
import { AppCategoriesActions } from '../../interfaces';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { mainTheme } from '../../../../styles/themes';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/icons/Menu';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Forward from '@material-ui/icons/Forward';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import { AppDrawer } from '../../components';
import { Link } from 'react-router-dom';
import { AppLoginActions } from '../../../auth/interfaces';
import { withFirebaseAuth } from '../../../hocs';

interface NavBarProps {
  actions: AppCategoriesActions & AppModalActions & AppLoginActions;
  categories: AppCategory[];
  expanded: boolean;
  activated: AppCategory | null;
}

const NavBar: React.FunctionComponent<NavBarProps & AppWithFirebaseAuthProps> =
  ({categories, expanded, activated, actions, firebaseUser: {isAuthEmpty}}) => (
    <NavBarStyles>
      <AppBar
        className={`app-bar ${expanded ? 'opened' : ''}`}
        style={{backgroundColor: mainTheme.colors.mainColor}}
      >
        <Toolbar className="toolbar">
          <div className="notes-actions">
            {!isAuthEmpty &&
            <IconButton
              className={`menu-button ${expanded ? 'hidden' : ''}`}
              color="inherit"
              onClick={actions.toggleCategories}
            >
              <Menu/>
            </IconButton>}
            <Typography variant="h6" color="inherit" className="header-title">
              Notes app
            </Typography>
            {!isAuthEmpty &&
            <Tooltip title="Create note">
              <IconButton color="inherit" aria-label="Menu" onClick={actions.openModal}>
                <Add/>
              </IconButton>
            </Tooltip>}
          </div>
          <div className="auth-container">
            {isAuthEmpty
              ? <div>
                <Link to={'/login'}>
                  <Tooltip title="Login">
                    <IconButton color="inherit" aria-label="Menu">
                      <LockOpenOutlined/>
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link to={'/signup'}>
                  <Tooltip title="Sign Up">
                    <IconButton color="inherit" aria-label="Menu">
                      <AccountCircleOutlined/>
                    </IconButton>
                  </Tooltip>
                </Link>
              </div>
              : <Tooltip title="Logout">
                <IconButton color="inherit" aria-label="Menu" onClick={actions.logoutRequest}>
                  <Forward/>
                </IconButton>
              </Tooltip>
            }
          </div>
        </Toolbar>
      </AppBar>
      {!!categories.length &&
      <AppDrawer
        actions={actions}
        categories={categories}
        expanded={expanded}
        activated={activated}
        toggleDrawer={actions.toggleCategories}
      />}

    </NavBarStyles>
  );

export default withFirebaseAuth(NavBar);
