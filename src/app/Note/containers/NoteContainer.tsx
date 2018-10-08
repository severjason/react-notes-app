import * as React                          from 'react';
import { connect }                         from 'react-redux';
import { bindActionCreators, Dispatch }    from 'redux';
import * as actions                        from '../../../actions';
import * as modalActions from '../../Modal/redux/actions';
import { AppAction, AppAllActions, AppState, NoteProps } from '../../interfaces';
import { FullNote }                            from '../components';

interface AppHomeDispatch {
    actions: AppAllActions;
}

interface AppRoute {
    match: any;
}

class NoteContainer extends React.Component<NoteProps & AppRoute & AppHomeDispatch, {}> {

    render() {
        return (
            <FullNote {...this.props}/>
        );
    }
}

export default connect<NoteProps, AppHomeDispatch>(
    (state: AppState) => ({
        notes: state.notes.byId,
        activeCategory: state.categories.activated,
    }),
    (dispatch: Dispatch<AppAction>) => ({
        actions: bindActionCreators({...actions, ...modalActions}, dispatch)
    })
)(NoteContainer);
