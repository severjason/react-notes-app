import * as React from 'react';
import { MainRoutes }     from '../../routes/';
import { Header } from '../../components';

const App: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <Header/>
            <MainRoutes/>
        </div>
    );
};

export default App;
