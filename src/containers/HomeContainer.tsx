import * as React                          from 'react';
import { connect }                         from 'react-redux';
import { bindActionCreators, Dispatch }    from 'redux';
import * as actions                        from '../actions';
import { AppAction, AppActions, AppState } from '../interfaces/index';
import { Home }                            from '../components';

interface AppHomeDispatch {
    actions: AppActions;
}

interface AppRoute {
    match: any;
    activeCategory: string;
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