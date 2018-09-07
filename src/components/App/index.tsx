import * as React from 'react';
import { MainRoutes }     from '../../routes/';
/*
import { Header } from '../../components';
*/

const App: React.StatelessComponent<{}> = () => {
    return (
        <React.Fragment>
            {/*<Header/>*/}
            <MainRoutes/>
        </React.Fragment>
    );
};

export default App;
