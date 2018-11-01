import styled from 'styled-components';

const NavBarStyles = styled.div`
.app-bar {

  & > div {
    padding: 0 .5rem;
  }
  .header-title {
    padding: .5rem;
  }
    &.opened {
      margin-left: ${props => props.theme.drawer.widthRem}rem;
      width: calc(100% - ${props => props.theme.drawer.widthRem}rem);
    }
    transition: margin-left ease-out 220ms;
  }
 
  .hidden {
    display: none;
  }
  
  .toolbar {
    justify-content: space-between;
  }
  
  .notes-actions {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  
  .auth-container {
    a {
      color: ${props => props.theme.colors.secondaryTextColor};
    }
  }
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
    .app-bar {
      &.opened {
        margin-left: 0;
        width: 100%;
      }
    }
  }
`;

export default NavBarStyles;
