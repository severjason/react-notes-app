import styled from 'styled-components';

const DrawerStyles = styled.div`
  // width: ${props => props.theme.drawer.widthRem}rem;
  .app-drawer {
    & > div {
      width: ${props => props.theme.drawer.widthRem}rem;
    }
  }
  .list-container {
    padding: 0;
  }
  .button-container {
    height: 64px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 1rem;
    button {
      color: ${props => props.theme.colors.mainColor};
    }
  }
  
  @media all and (max-width: 600px) {
    .button-container {
      height: 56px;
    }
  }
`;

export default DrawerStyles;
