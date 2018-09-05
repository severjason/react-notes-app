import * as React          from 'react';
import { Container, Icon } from 'semantic-ui-react';
import HeaderStyles        from './styles';

const Header: React.StatelessComponent<{}> = () => (
      <HeaderStyles>
        <Container className="app-header">
            <h3 className="ui center aligned icon header">
                <Icon name="sticky note outline"/>
                Notes app
            </h3>
        </Container>
      </HeaderStyles>
);

export default Header;
