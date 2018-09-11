import * as React                                       from 'react';
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import { Helmet }                                       from 'react-helmet';
import { Note }                              from '../components/';
import { AppAllActions, AppCategories, AppNote }           from '../interfaces/';

interface HomeRoutesProps {
    categories: AppCategories;
    notes: AppNote[];
    actions: AppAllActions;
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
