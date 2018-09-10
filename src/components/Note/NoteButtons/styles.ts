import styled from 'styled-components';

const NoteButtonStyles = styled.div`
  .note-button {
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
