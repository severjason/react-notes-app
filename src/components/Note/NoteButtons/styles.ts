import styled from 'styled-components';

const NoteButtonStyles = styled.div`
  .note-button {
    width: 2.5rem;
    height: 2.5rem;
    
    .note-icon {
      font-size: 1.5rem;
    }
    
    &:hover {
      .app-note-edit-icon {
        color: ${props => props.theme.colors.blueColor};
      }
      .app-note-delete-icon {
        color: ${props => props.theme.colors.redColor};
      }
      .app-note-close-icon {
        color: ${props => props.theme.colors.blackColor};
      }
      .app-note-expand-icon {
        color: ${props => props.theme.colors.blackColor};
      }
    }
  }
`;

export default NoteButtonStyles;
