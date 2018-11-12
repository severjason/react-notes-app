import * as React from 'react';
import { Helmet } from 'react-helmet';
import { AppAllActions, AppCategory, HomePropsWithFirebase } from '../../../interfaces';
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

class Home extends React.Component<HomePropsWithFirebase & AppRoute & AppHomeDispatch, {}> {

  render() {
    const {actions, categories, notes, match} = this.props;
    const {category} = match.params;
    const routeCategory: AppCategory | undefined =
      categories.categoriesList.filter(c => c.name === category)[0];
    return (
      (routeCategory)
        ? (
          <HomeStyles>
            <Helmet title={`${category[0].toUpperCase() + category.substring(1)} | ${HELMET_TITLE}`} />
            <div className={`home-container ${categories.expanded ? 'opened' : ''}`}>
              <NotesList
                activatedCategory={categories.activated && categories.activated.name}
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
