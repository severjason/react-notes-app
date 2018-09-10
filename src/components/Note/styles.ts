import styled from 'styled-components';

const NoteStyles = styled.div`
.ui.app-note-container {
  margin: ${props => props.theme.note.marginRem}rem;
  width: ${props => props.theme.note.containerWidthRem}rem;

  &:first-child,
  &:last-child {
    margin: ${props => props.theme.note.marginRem}rem;
  }

  
  .app-note-info {
    display: none;

    .app-note-tags {
      .label {
        font-size: .7rem;
        margin-right: .5rem;
        margin-top: .2rem;
      }
    }

    .hidden {
      display: none;
    }

    &.expanded {
      display: block;
    }
  }

}

@media all and (max-width: 500px) {
  .ui.app-note-container {
    &.full {
      .app-note-edit-icon {
        margin-left: 78%;
      }
      .app-note-trash-icon {
        margin-left: 85%;
      }
      .app-note-close-icon {
        margin-left: 92%;
      }
      .app-note-tags {
        .label {
          font-size: .7rem;
        }
      }
    }
  }
}

@media all and (max-width: 767px) {
  .ui.app-note-container {
    max-width: ${props => props.theme.note.containerWidthRem * 1.1}rem;
    width: 100%;
  }
}

`;

export default NoteStyles;
