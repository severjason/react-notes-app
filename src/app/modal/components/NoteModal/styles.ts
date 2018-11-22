import styled from 'styled-components';

const NoteModalStyles = styled.div`
  padding: 1rem;
  .form-control {
    display: flex;
    padding: .5rem;
  }
  .form-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: .5rem;
  }
  .modal-header {
    font-weight: 700;
    text-align: center;
  }
  
  .category-chip {
    border-radius: 4px;
    margin: .2rem;
    height: 2rem;
    line-height: 1;
    font-size: 12px;
    
    &.active {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  
  .form-label {
    padding: .2rem 0;
  }
  
   .checkboxes-container {
    justify-content: center;
  }

@media all and (max-width: 767px) {
  padding: .5rem;
}
@media all and (max-width: 767px) {
  .color-checkbox {
    padding: 1px;
  }
}
`;

export default NoteModalStyles;
