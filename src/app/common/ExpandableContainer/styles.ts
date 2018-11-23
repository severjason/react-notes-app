import styled from 'styled-components';

const ExpandableContainerStyles = styled<{heightLimit: number}, 'div'>('div')`
  overflow: hidden;
  
  .container {
    position: relative;
    z-index: 10;
    max-height: none;
    
    &.collapsed {
      max-height: ${props => props.heightLimit}px;
    }
    
  }
  
  .button {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 15;
    background-color: rgba(255, 255, 255, .8);
    
    button.small {
      padding: 2px;
    }
  }
`;

export default ExpandableContainerStyles;
