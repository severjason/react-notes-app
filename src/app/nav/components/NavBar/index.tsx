import React from 'react';
import NavBarStyles from './styles';
import { AppWithFirebaseAuthProps } from '../../../interfaces';
import { AppCategory, AppNavActions, AppTag } from '../../interfaces';
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
import { AppModalActions } from '../../../modal/interfaces';

interface NavBarProps {
  actions: AppNavActions & AppModalActions & AppLoginActions;
  categories: AppCategory[];
  tags: AppTag[];
  filteredTags: AppTag[];
  expanded: boolean;
  activated: AppCategory | null;
}

const NavBar: React.FunctionComponent<NavBarProps & AppWithFirebaseAuthProps> =
  ({categories, tags, filteredTags, expanded, activated, actions, firebaseUser: {isAuthEmpty, auth}}) => (
    <NavBarStyles>
      <AppBar
        className={`app-bar ${expanded ? 'opened' : ''}`}
        style={{backgroundColor: mainTheme.colors.mainColor}}
      >
        <Toolbar className="toolbar">
          <div className="notes-actions">
            {!isAuthEmpty && !!categories.length && !!tags.length &&
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
            {!isAuthEmpty && !!categories.length && !!tags.length &&
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
        tags={tags}
        filteredTags={filteredTags}
        userId={auth.uid}
        toggleDrawer={actions.toggleCategories}
      />}

    </NavBarStyles>
  );

export default withFirebaseAuth(NavBar);
