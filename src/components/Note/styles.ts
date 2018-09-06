import styled from 'styled-components';

const NoteStyles = styled.div`
.ui.app-note-container {
  margin: ${props => props.theme.note.marginRem}rem;
  width: ${props => props.theme.note.containerWidthRem}rem;

  &:first-child,
  &:last-child {
    margin: ${props => props.theme.note.marginRem}rem;
  }

  .app-note-icon {
    // height: $app-title-height;
    line-height: ${props => props.theme.note.titleHeightRem}rem;
    height: ${props => props.theme.note.titleHeightRem * 2}rem;
    margin-left: 90%;
    margin-top: 0;
    opacity: .5;
    position: absolute;
    width: ${props => props.theme.note.titleHeightRem}rem;
    z-index: 100;

    .icon {
      display: block;
      margin: 1.1rem auto 0;
      width: 1rem;
    }

    &:hover {
      cursor: pointer;
      opacity: 1;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }
  }

  .app-note-trash-icon {

    &:hover {
      color:${props => props.theme.colors.redColor};
    }
  }

  .app-note-edit-icon {
    margin-left: 80%;

    &:hover {
      color: ${props => props.theme.colors.blueColor};
    }
  }

  .app-note-expand-icon {
    margin-left: 70%;

    &:hover {
      color: ${props => props.theme.colors.blackColor};
    }
  }

  .app-note-title-container {
    padding: 1rem;

    &:hover {
      background-color: ${props => props.theme.colors.noteTitleHoverColor};
      cursor: pointer;
    }

    .app-note-title-text {
      height: ${props => props.theme.note.titleHeightRem}rem;
      line-height: ${props => props.theme.note.titleHeightRem}rem;
      word-wrap: break-word;
    }
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

  &.full {
    margin: 0 auto;
    max-width: ${props => props.theme.note.containerFullWidthRem}rem;
    width: 100%;

    .app-note-title-container {
      border-radius: ${props => props.theme.note.borderRadiusPx}px;

      &:hover {
        background-color: unset;
        cursor: auto;
      }
    }

    .app-note-edit-icon {
      margin-left: 85%;
    }

    .app-note-trash-icon {
      margin-left: 90%;
    }

    .app-note-close-icon {
      margin-left: 95%;

      &:hover {
        color: ${props => props.theme.colors.blackColor};
      }
    }

    .app-note-tags {
      .label {
        cursor: default;
        font-size: .85rem;
      }
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
