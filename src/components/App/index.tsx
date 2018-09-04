import * as React from 'react';
import './index.css';
import { Routes } from '../../containers';
import { Header } from '../../components';

const App: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <Header/>
            <Routes/>
        </div>
    );
};

export default App;

/*
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

<Router>
    <Switch>
      <PropsRoute path='/login' component={Login} auth={auth} authenticatedRedirect="/" />
      <PropsRoute path='/allbooks' component={Books} booksGetter={getAllBooks} />
      <PropsRoute path='/mybooks' component={Books} booksGetter={getMyBooks} />
      <PropsRoute path='/trades' component={Trades} user={user} />
    </Switch>
</Router>
 */