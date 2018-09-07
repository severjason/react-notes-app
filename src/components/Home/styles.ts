import styled from 'styled-components';

const HomeStyles = styled.div`
  .home-container {
    display: flex;
    flex-direction: row;
    padding: 7rem 1rem;
  }
  .home-routes-container {
    padding-top: 41px;
  }
  
  @media all and (max-width: ${props => props.theme.media.mobileMaxWidthPx}px) {
    .home-container {
      flex-direction: column;
      padding: 5rem .5rem;
    }
    .home-routes-container {
      padding-top: .5rem;
    }
  }
`;

export default HomeStyles;
