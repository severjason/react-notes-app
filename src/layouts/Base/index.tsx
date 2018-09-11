import * as React from 'react';
import { Header } from '../../components';

const BaseLayout: React.StatelessComponent<{}> = ({children}) => (
  <React.Fragment>
    <Header/>
    {children}
  </React.Fragment>
);

export default BaseLayout;
