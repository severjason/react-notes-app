import styled from 'styled-components';

const HomeStyles = styled.div`

  .header-title {
    padding: 0 1rem;
  }
  .app-bar {
    &.opened {
      margin-left: ${props => props.theme.drawer.widthRem}rem;
      width: calc(100% - ${props => props.theme.drawer.widthRem}rem);
    }
    transition: margin-left ease-out 220ms;
  }

  .home-container {
    &.opened {
      margin-left: ${props => props.theme.drawer.widthRem}rem;
      width: calc(100% - ${props => props.theme.drawer.widthRem}rem);
    }
    display: flex;
    flex-direction: row;
    padding: 0 1rem;
    transition: margin-left ease-out 220ms;
  }
  
  .hidden {
    display: none;
  }
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
  .app-bar {
    &.opened {
      margin-left: 0;
      width: 100%;
    }
  }
    .home-container {
      flex-direction: column;
      padding: 5rem .5rem;
      &.opened {
        margin-left: 0;
        width: 100%;
      }
    }
  }
`;

export default HomeStyles;
