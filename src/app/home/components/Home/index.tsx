import React from 'react';
import { Helmet } from 'react-helmet';
import { AppAllActions, HomePropsWithFirebase } from '../../../interfaces';
import NotesList from '../../components/NotesList';
import HomeStyles from './styles';
import { Redirect } from 'react-router';
import { HELMET_TITLE } from '../../../../constants';
import { AppCategory } from '../../../nav/interfaces';

interface AppHomeDispatch {
  actions: AppAllActions;
}

interface AppRoute {
  match: any;
}

class Home extends React.Component<HomePropsWithFirebase & AppRoute & AppHomeDispatch, {}> {

  render() {
    const {actions, categories, notes, match} = this.props;
    const {category} = match.params;
    const routeCategory: AppCategory | undefined =
      categories.categoriesList.filter((c: AppCategory) => c.id === category)[0];
    return (
      (routeCategory)
        ? (
          <HomeStyles>
            <Helmet
              title={`${routeCategory.name[0].toUpperCase() + routeCategory.name.substring(1)} | ${HELMET_TITLE}`}
            />
            <div className={`home-container ${categories.expanded ? 'opened' : ''}`}>
              <NotesList
                activatedCategory={categories.activated && categories.activated.id}
                notes={notes}
                actions={actions}
                routeCategory={routeCategory.name}
                routeCategoryId={routeCategory.id}
              />
            </div>
          </HomeStyles>
        )
        : <Redirect to={'/notfound'}/>
    );
  }
}

export default Home;
