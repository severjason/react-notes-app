import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../actions';
import { AppAction, AppState } from '../../interfaces';
import { NotesList } from '../../components';

class Home extends React.Component<AppState, Dispatch<AppAction>> {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Notes app</title>
                </Helmet>
                <div className="ui container">
                    <NotesList {...this.props}/>
                </div>
            </div>
        );
    }
}

export default connect<AppState, Dispatch<AppAction>>(
    (state: AppState) => ({
        notes: state.notes,
    }),
    (dispatch: Dispatch<AppAction>) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Home);