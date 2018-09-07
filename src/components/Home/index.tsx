import * as React from 'react';
import { Helmet } from 'react-helmet';
import { AppAllActions, AppState } from '../../interfaces';
import { Categories, NoteModal } from '../../components';
import { HomeRoutes } from '../../routes';
import HomeStyles from './styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

interface AppHomeDispatch {
  actions: AppAllActions;
}

interface AppRoute {
  match: any;
  activeCategory: string;
}

const Home: React.StatelessComponent<AppState & AppRoute & AppHomeDispatch> = (props) => {
  const {actions, categories, notes} = props;
  return (
    <HomeStyles>
      <Helmet title="Notes app"/>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={actions.openModal}>
            <Add/>
          </IconButton>
          <Typography variant="title" color="inherit">
            Notes app
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="home-container">
        <Categories {...categories} actions={actions}/>
        <HomeRoutes categories={categories} notes={notes} actions={actions}/>
      </div>
      <NoteModal {...props}/>
    </HomeStyles>
  );
};

export default Home;