import React from 'react';
import { Route } from 'react-router-dom';

const LoginPage  = '<div> login</div>';
const NotFoundPage  = '<div> login</div>';

export const pages = {};

const buildRoutingComponents = routes => routes.map(({ component, ...rest }) => ({
    component: pages[component],
    ...rest,
}));

const privateComponentOrRedirect = ({ authenticated, component: Component, props }) => (
    authenticated ? <Component {...props} /> : <LoginPage />
);

export const PrivateRoute = ({ authenticated, component, ...rest }) => (
    <Route {...rest} render={props => privateComponentOrRedirect({ authenticated, component, props })} />
);

export const createRoutes = (navigation: any) => {
    const { header, other } = navigation;

    const routes = buildRoutingComponents([...other, ...header]);
    if (routes.length) {
        routes.push({ component: NotFoundPage, authentication: true });
    }
    return routes;
};
