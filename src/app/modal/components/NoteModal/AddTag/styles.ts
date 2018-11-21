import styled from 'styled-components';

const AddTagStyles = styled.div`
  .tag-input-container {
    display: flex;
    align-items: flex-end;
  }
   
  @media all and (max-width: 350px) {
    .label {
      display: none;
    }
  }
`;

export default AddTagStyles;
