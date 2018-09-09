import * as React from 'react';
import { Helmet } from 'react-helmet';
import { AppAllActions, AppState } from '../../interfaces';
import { NoteModal, AppDrawer } from '../../components';
import { HomeRoutes } from '../../routes';
import HomeStyles from './styles';
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@material-ui/core';
import { Add, Menu } from '@material-ui/icons';
import { mainTheme } from '../../styles/themes';

interface AppHomeDispatch {
  actions: AppAllActions;
}

interface AppRoute {
  match: any;
  activeCategory: string;
}

interface HomeState {
  opened: boolean;
}

class Home extends React.Component<AppState & AppRoute & AppHomeDispatch, HomeState> {

  state = {
    opened: false,
  };

  toggleDrawer = () => this.setState((state) => ({opened: !state.opened}));

  render() {
    const {actions, categories, notes} = this.props;
    const {opened} = this.state;

    return (
      <HomeStyles>
        <Helmet title="Notes app"/>
        <AppBar className={`app-bar ${opened ? 'opened' : ''}`} style={{backgroundColor: mainTheme.colors.mainColor}}>
          <Toolbar>
            <IconButton className={`menu-button ${opened ? 'hidden' : ''}`} color="inherit" onClick={this.toggleDrawer}>
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" className="header-title">
              Notes app
            </Typography>
            <Tooltip title="Create note">
              <IconButton color="inherit" aria-label="Menu" onClick={actions.openModal}>
                <Add/>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <AppDrawer opened={opened} actions={actions} categories={categories} toggleDrawer={this.toggleDrawer}/>
        <div className={`home-container ${opened ? 'opened' : ''}`}>
          <HomeRoutes categories={categories} notes={notes} actions={actions}/>
        </div>
        <NoteModal {...this.props}/>
      </HomeStyles>
    );
  }
}

export default Home;