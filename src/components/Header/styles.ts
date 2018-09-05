import styled from 'styled-components';

const HeaderStyles = styled.div`
.ui.container.app-header {
  padding: ${props => props.theme.base.marginRem}rem;

  h3 {
    color: ${props => props.theme.colors.mainColor};
  }
}
`;

export default HeaderStyles;