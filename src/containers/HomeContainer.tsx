import * as React                          from 'react';
import { connect }                         from 'react-redux';
import { bindActionCreators, Dispatch }    from 'redux';
import * as actions                        from '../actions';
import { AppAction, AppAllActions, AppState } from '../interfaces/';
import { Home }                            from '../components';

interface AppHomeDispatch {
    actions: AppAllActions;
}

interface AppRoute {
    match: any;
}

class HomeContainer extends React.Component<AppState & AppRoute & AppHomeDispatch, {}> {

    render() {
        return (
            <Home {...this.props}/>
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
)(HomeContainer);