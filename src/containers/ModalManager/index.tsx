import * as React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { AppAction, AppActions, AppState } from '../../interfaces';
import { bindActionCreators, Dispatch } from 'redux';
import * as actions from '../../actions';

interface AppModalManagerProps {
    modalConfiguration: any;
}

interface AppModalManagerDispatch {
    actions: AppActions;
}

export class ModalManager extends React.Component<AppModalManagerProps & AppModalManagerDispatch, {}> {
    render() {
        const {modalConfiguration} = this.props;

        const defaultProps = {
            defaultOpen: true,
            closeIcon: true,
            onClose: this.props.actions.closeModal
        };

        let renderedComponent;

        if (modalConfiguration) {
            const {modalProps = {}} = modalConfiguration;
            renderedComponent = <Modal {...Object.assign({}, modalProps, defaultProps)} />;
        }

        return (
            <div>
                {renderedComponent}
            </div>
        );
    }
}

export default connect<AppModalManagerProps, AppModalManagerDispatch>(
    (state: AppState) => ({
        modalConfiguration: state.modals,
    }),
    (dispatch: Dispatch<AppAction>) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(ModalManager);