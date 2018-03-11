
import React, { Component } from 'react';
import { Router , Stack , Scene } from 'react-native-router-flux';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CashPage from './pages/CashPage';
import PayPage from './pages/PayPage';

class Routes extends Component {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar={ true }>
                    <Scene key="login" component={ LoginPage } title="Login" initial={ true }/>
                    <Scene key="main" component={ HomePage } title="My Locker" />
                    <Scene key="register" component={ RegisterPage } title="Register"/>
                    <Scene key="profile" component={ ProfilePage } title="Profile"/>
                    <Scene key="cash" component={ CashPage } title="Cash"/>
                    <Scene key="pay" component={ PayPage } title="Pay"/>
                </Stack>
            </Router>
        );
    }
}
export default Routes;
