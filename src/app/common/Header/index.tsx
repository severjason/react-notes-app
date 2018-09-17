import * as React          from 'react';
import NavContainer from '../../Nav/containers/NavContainer';
import HeaderStyles        from './styles';

const Header: React.StatelessComponent<{}> = () => (
      <HeaderStyles>
        <NavContainer/>
      </HeaderStyles>
);

export default Header;
