import * as React                                       from 'react';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { Helmet }                                       from 'react-helmet';
import { NotesList, Note }                              from '../components/';
import { AppActions, AppCategories, AppNote }           from '../interfaces/index';

interface HomeRoutesProps {
    categories: AppCategories;
    notes: AppNote[];
    actions: AppActions;
}

interface RouteParams {
    category: string;
    noteId: string;
}

const HomeRoutes: React.StatelessComponent<HomeRoutesProps> = (props) => {
    const {categories, notes, actions} = props;
    return (
        <Switch>
            <Route
                path="/notes/:category"
                render={
                    (route: RouteComponentProps<RouteParams>) => {
                        const {category} = route.match.params;
                        return (categories.categoriesList.includes(category))
                            ? <React.Fragment>
                                    <Helmet title={category[0].toUpperCase() + category.substring(1)} />
                                    <NotesList {...props} routeCategory={category}/>
                                </React.Fragment>
                            : <Redirect to="/notes/all"/>;
                    }}
            />
            <Route
                path="/note/:noteId"
                render={
                    (route: RouteComponentProps<RouteParams>) => {
                        const noteIndex = (): number => {
                            return notes.findIndex((note: AppNote) => {
                                return route.match.params.noteId === note.id;
                            });
                        };
                        const requestedNote = notes[noteIndex()];
                        return (noteIndex() !== -1)
                            ? <React.Fragment>
                                    <Helmet title={`Full note - ${requestedNote.title}`}/>
                                    <Note
                                        note={requestedNote}
                                        actions={actions}
                                        fullView={true}
                                        activeCategory={categories.activated}
                                    />
                                </React.Fragment>
                            : <Redirect to="/notes/all"/>;
                    }}
            />
            <Route path="*" render={() => <Redirect to="/notes/all"/>}/>
        </Switch>
    );
};

export default HomeRoutes;
