import * as React                from 'react';
import { Helmet }                from 'react-helmet';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { AppActions, AppState }  from '../../interfaces';
import { Categories, NoteModal } from '../../components';
import { HomeRoutes }            from '../../routes';
import HomeStyles                from './styles';

interface AppHomeDispatch {
    actions: AppActions;
}

interface AppRoute {
    match: any;
    activeCategory: string;
}

const Home: React.StatelessComponent<AppState & AppRoute & AppHomeDispatch> = (props) => {
    const {actions, categories, notes} = props;
    return (
        <Container>
            <Helmet>
                <title>Notes app</title>
            </Helmet>
            <HomeStyles>
                <Grid>
                    <Grid.Column width={16}>
                        <Icon
                            className="app-note-add-icon"
                            name="plus"
                            onClick={actions.openModal}
                            title="Create note"
                        />
                    </Grid.Column>
                    <Grid className="app-categories-container">
                        <Categories {...categories} actions={actions}/>
                    </Grid>
                    <Grid.Column width={16}>
                        <HomeRoutes categories={categories} notes={notes} actions={actions}/>
                    </Grid.Column>
                </Grid>
            </HomeStyles>
            <NoteModal {...props}/>
        </Container>
    );
};

export default Home;