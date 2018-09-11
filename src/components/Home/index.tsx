import * as React from 'react';
import { Helmet } from 'react-helmet';
import { AppAllActions, HomeProps } from '../../interfaces';
import {/*NoteModal*/ NotesList } from '../../components';
import HomeStyles from './styles';
import { Redirect } from 'react-router';

interface AppHomeDispatch {
  actions: AppAllActions;
}

interface AppRoute {
  match: any;
}

class Home extends React.Component<HomeProps & AppRoute & AppHomeDispatch, {}> {

  render() {
    const {actions, categories, notes, match} = this.props;
    const {category} = match.params;
    return (
      (categories.categoriesList.includes(category))
        ? (
          <HomeStyles>
            <Helmet title={`${category[0].toUpperCase() + category.substring(1)} | Notes`} />
            <div className={`home-container ${categories.expanded ? 'opened' : ''}`}>
              <NotesList categories={categories} notes={notes} actions={actions} routeCategory={category}/>
            </div>
            {/*<NoteModal {...this.props}/>*/}
          </HomeStyles>
        )
        : <Redirect to={'/notfound'}/>
    );
  }
}

export default Home;