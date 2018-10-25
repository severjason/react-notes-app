import styled from 'styled-components';

const LoginStyles = styled.div`
  .grid-container {
    padding-top: 1rem;
  }
  .form-group {
    width: 100%;
    max-width: 300px;
  }
  .api-error {
    color: ${props => props.theme.colors.errorColor};
    font-size: .75rem;
  }
`;

export default LoginStyles;
