import * as React from 'react';
import { Header } from '../../common';
import ModalContainer from '../../modal/containers/ModalContainer';
import BaseLayoutStyles from './styles';

const BaseLayout: React.StatelessComponent<{}> = ({children}) => (
  <BaseLayoutStyles>
    <Header/>
    {children}
    <ModalContainer/>
  </BaseLayoutStyles>
);

export default BaseLayout;
