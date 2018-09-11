import * as React from 'react';
import { Header } from '../../components';
import BaseLayoutStyles from './styles';

const BaseLayout: React.StatelessComponent<{}> = ({children}) => (
  <BaseLayoutStyles>
    <Header/>
    {children}
  </BaseLayoutStyles>
);

export default BaseLayout;
