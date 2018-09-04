import * as React from 'react';
import './index.css';
import Routes from '../../routes';
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
