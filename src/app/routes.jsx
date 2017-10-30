/* eslint react/no-multi-comp: 0 */

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from 'containers/Layout';
import MainPage from 'containers/MainPage';

const routes = [
    {
        path: '/',
        exact: true,
        component: MainPage
    },
    {
        path: '/MainPage',
        exact: false,
        component: MainPage
    }
];

const router = () => (
    <Switch>
        {
            routes.map(({path, exact, component: Component}) =>
                (<Route
                    key={path}
                    path={path}
                    exact={exact}
                    render={props => (
                        <Layout {...props}>
                            <Component {...props} />
                        </Layout>
                    )
                    }
                />)
            )
        }
    </Switch>
);
export default router();