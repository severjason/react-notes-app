import * as React        from 'react';
import * as ReactDOM     from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider }      from 'react-redux';
import { ThemeProvider } from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { App }           from './components';
import { store }         from './store';
import { mainTheme }     from './styles/themes';
import GlobalStyles      from './styles/global';
import { injectGlobal }  from 'styled-components';

injectGlobal`
html {
  font-size: 14px;
}

body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
`;

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
            <BrowserRouter>
                <GlobalStyles>
                    <App/>
                </GlobalStyles>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
