import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../actions';
import { AppAction, AppActions, AppNote, AppState } from '../../interfaces';
import { NotesList, Note, CategoriesList, NoteModal } from '../../components';
import './index.css';

interface AppHomeDispatch {
    actions: AppActions;
}

interface AppRoute {
    match: any;
    activeCategory: string;
}

class Home extends React.Component<AppState & AppRoute & AppHomeDispatch, {} > {

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
                            <Route
                                path="/notes/:category"
                                render={
                                    (route: any) => {
                                        const category = route.match.params.category;
                                        return (this.props.categories.categoriesList.includes(category))
                                            ? (
                                                <div>
                                                    <Helmet>
                                                        <title>
                                                            {category[0].toUpperCase() + category.substring(1)}
                                                        </title>
                                                    </Helmet>
                                                    <NotesList {...{...this.props, routeCategory: category}}/>
                                                </div>

                                            )
                                            : (<Redirect to="/notes/all"/>);
                                    }}
                            />
                            <Route
                                path="/note/:noteId"
                                render={
                                    (route: any) => {
                                        const noteIndex = (): number => {
                                            return this.props.notes.findIndex((note: AppNote) => {
                                                return route.match.params.noteId === note.id;
                                            });
                                        };
                                        const requestedNote = this.props.notes[noteIndex()];
                                        return (noteIndex() !== -1)
                                            ? (
                                                <div>
                                                    <Helmet>
                                                        <title>View full note - {requestedNote.title}</title>
                                                    </Helmet>
                                                    <Note
                                                        note={requestedNote}
                                                        actions={this.props.actions}
                                                        fullView={true}
                                                        activeCategory={this.props.categories.activated}
                                                    />
                                                </div>

                                            )
                                            : (<Redirect to="/notes/all"/>);
                                    }}
                            />
                            <Route exact={true} path="/note" render={() => <Redirect to="/notes/all"/>}/>
                            <Route exact={true} path="/notes" render={() => <Redirect to="/notes/all"/>}/>
                            <Route path="*" render={() => <Redirect to="/notes/all"/>}/>
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