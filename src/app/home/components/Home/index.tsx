import * as React from 'react';
import { Helmet } from 'react-helmet';
import { AppAllActions, HomeProps } from '../../../interfaces';
import NotesList from '../../components/NotesList';
import HomeStyles from './styles';
import { Redirect } from 'react-router';
import { HELMET_TITLE } from '../../../../constants';

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
            <Helmet title={`${category[0].toUpperCase() + category.substring(1)} | ${HELMET_TITLE}`} />
            <div className={`home-container ${categories.expanded ? 'opened' : ''}`}>
              <NotesList categories={categories} notes={notes} actions={actions} routeCategory={category}/>
            </div>
          </HomeStyles>
        )
        : <Redirect to={'/notfound'}/>
    );
  }
}

export default Home;
