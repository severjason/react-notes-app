import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../actions';
import { AppAction, AppActions, AppState } from '../../interfaces';
import { NotesList } from '../../components';
import './index.css';
import { NoteModal, CategoriesList } from '../../containers';

interface AppHomeDispatch {
    actions: AppActions;
}

class Home extends React.Component<AppState & AppHomeDispatch, {}> {

    render() {
        return (
            <Container>
                <Helmet>
                    <title>Notes app</title>
                </Helmet>
                <Grid>
                    <Grid.Column width={16}>
                        <Icon
                            className="app-note-add-icon"
                            name="plus"
                            onClick={() => this.props.actions.openModal()}
                            title="Create note"
                        />
                    </Grid.Column>
                    <Grid className="app-categories-container">
                        <CategoriesList {...this.props.categories} actions={this.props.actions}/>
                    </Grid>
                    <Grid.Column width={16}>
                        <Switch>
                            <Route path="/notes/:category" render={() => <NotesList {...this.props}/>}/>
                            <Route exact={true} path="/notes" render={() => <Redirect to="/notes/all"/>}/>
                        </Switch>
                    </Grid.Column>
                </Grid>
                <NoteModal {...this.props}/>
            </Container>
        );
    }
}

export default connect<AppState, AppHomeDispatch>(
    (state: AppState) => ({
        notes: state.notes,
        modal: state.modal,
        categories: state.categories,
        tags: state.tags,
    }),
    (dispatch: Dispatch<AppAction>) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Home);