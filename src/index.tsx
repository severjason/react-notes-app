import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { FirebaseAuthProvider } from './app/hocs';
import Routes from './routes';
import store from './store';
import { mainTheme } from './styles/themes';
import GlobalStyles from './styles/global';
import { injectGlobal } from 'styled-components';
import 'normalize.css';

injectGlobal`
html {
  font-size: 14px;
}

body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  min-width: 300px;
}

* {
  box-sizing: border-box;
}
`;

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={mainTheme}>
          <FirebaseAuthProvider>
            <BrowserRouter>
                <GlobalStyles>
                    <Routes/>
                </GlobalStyles>
            </BrowserRouter>
          </FirebaseAuthProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();
