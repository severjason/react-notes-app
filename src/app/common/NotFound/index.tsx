import * as React from 'react';
import { BaseLayout } from '../../layouts';
import NotFoundStyles from './styles';

const NotFound = () => (
  <BaseLayout>
    <NotFoundStyles>
      <h2>
        Page not found...
      </h2>
    </NotFoundStyles>
  </BaseLayout>
);

export default NotFound;
