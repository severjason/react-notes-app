import styled from 'styled-components';

const NotesListStyles = styled.div`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

@media all and (max-width: 767px) {
  justify-content: center;
}
`;

export default NotesListStyles;