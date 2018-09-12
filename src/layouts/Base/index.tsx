import * as React from 'react';
import { Header } from '../../components';
import { ModalContainer } from '../../containers';
import BaseLayoutStyles from './styles';

const BaseLayout: React.StatelessComponent<{}> = ({children}) => (
  <BaseLayoutStyles>
    <Header/>
    {children}
    <ModalContainer/>
  </BaseLayoutStyles>
);

export default BaseLayout;
