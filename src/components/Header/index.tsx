import * as React from 'react';
import './index.css';
import { Container, Icon } from 'semantic-ui-react';

const Header: React.StatelessComponent<{}> = () => {
    return (
        <Container className="app-header">
            <h3 className="ui center aligned icon header">
                <Icon name="sticky note outline"/>
                Notes app
            </h3>
        </Container>
    );
};

export default Header;
