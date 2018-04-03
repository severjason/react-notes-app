import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../actions';
import { AppAction, AppActions, AppNote, AppState } from '../../interfaces';
import { NotesList } from '../../components';
import './index.css';
import { ModalManager } from '../../containers';

interface AppHomeProps {
    notes: AppNote[];
}

interface AppHomeDispatch {
    actions: AppActions;
}

class Home extends React.Component<AppHomeProps & AppHomeDispatch, {}> {
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
                            onClick={() => this.props.actions.openModal({
                                header: 'Test content',
                                content: 'Test content 2',
                            })}
                        />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        NavList
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <NotesList {...this.props}/>
                    </Grid.Column>
                </Grid>
                <ModalManager/>
            </Container>
        );
    }
}

export default connect<AppHomeProps, AppHomeDispatch>(
    (state: AppState) => ({
        notes: state.notes,
    }),
    (dispatch: Dispatch<AppAction>) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Home);