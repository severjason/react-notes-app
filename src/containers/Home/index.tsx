import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../actions';
import { AppAction, AppActions, AppState } from '../../interfaces';
import { NotesList, CategoriesList } from '../../components';
import './index.css';
import { NoteModal } from '../../containers';

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
                    <Grid.Column width={16}>
                        <CategoriesList/>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <NotesList {...this.props}/>
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
    }),
    (dispatch: Dispatch<AppAction>) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Home);